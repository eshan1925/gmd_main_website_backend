const router = require("express").Router();
const { User } = require("../models/user");
var ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");

//Get a user
router.get("/:id", async (req, res) => {
  try {
    User.find({ _id: req.params.id },{password:0,verified:0},function (err, foundItems) {
      if (!err) {
        res.status(200).send(foundItems);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//Get a user for editing profile
router.get("/:id/edit-profile", async (req, res) => {
  try {
    User.find({ _id: req.params.id }, function (err, foundItems) {
      if (!err) {
        res.status(200).send(foundItems);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//update user
router.put("/:id/edit-profile", async (req, res) => {
  console.log(req.body._id);
  if (req.body._id == req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(err);
      }
    }

    
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update your account only!!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted successfully!");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete your account only!!");
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];
    friends.map((friend) => {
      const { _id, userName, profilePicture } = friend;
      friendList.push({ _id, userName, profilePicture });
    });

    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed!!!");
      } else {
        res.status(403).json("You already followed!!!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cant follow yourself!!");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed!!!");
      } else {
        res.status(403).json("You already unfollowed!!!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cant unfollow yourself!!");
  }
});

module.exports = router;
