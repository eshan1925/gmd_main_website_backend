const router = require("express").Router();
const Story = require("../models/story");
const { User } = require("../models/user");
//create a Story

router.post("/", async (req, res) => {
  const newStory = Story(req.body);
  try {
    const savedStory = await newStory.save();
    res.status(200).json(savedStory);
  } catch (error) {
    res.status(500).json(error);
  }
});


//delete a Story

router.delete("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (story.userId === req.body.userId) {
      await Story.deleteOne();
      res.status(200).json("The Story has been deleted!");
    } else {
      res.status(403).json("You can delete only your Story");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get a Story

router.get("/:id", async (req, res) => {
  try {
    const Story = await Story.findById(req.params.id);
    res.status(200).json(Story);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get timeline Storys

router.get("/timeline/:userid", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userid);
    const userStorys = await Story.find({ userId: currentUser._id });
    const friendStorys = await Promise.all(
      currentUser.followers.map((friendId) => {
        return Story.find({ userId: friendId });
      })
    );

    res.status(200).json(userStorys.concat(...friendStorys));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//get users all Storys

router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const Storys = await Story.find({ userId: user._id });
    res.status(200).json(Storys);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
