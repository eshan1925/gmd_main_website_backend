const router = require("express").Router();
const Post = require("../models/Post");
const { User } = require("../models/user");
const Comment = require("../models/comment");
const GridFSBucket = require("mongodb").GridFSBucket;
//create a post

router.post("/", async (req, res) => {
  const newPost = Post(req.body);
  try {
    const savedpost = await newPost.save();
    res.status(200).json(savedpost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//create a post without react-file-base64
router.post("/filer", async (req, res) => {
  const file = req.body.img;
  const text = req.body.desc;
  const bucket = new GridFSBucket();
  const uploadStream = bucket.openUploadStream(file.name);
  const writeStream = bucket.openUploadStream(file.name);
  // Write the file to the GridFS bucket
  writeStream.write(Buffer.from(file.data, "base64"));
  writeStream.end((err, file) => {
    Post.insertOne(
      {
        userId: req.body.userId,
        desc: text,
        img: file._id,
      },
      (err, result) => {
        if (err) {
          res.status(500);
        } else {
          res.status(200);
        }
      }
    );
  });
  // Pipe the file contents into the upload stream
  fs.createReadStream(file.path).pipe(uploadStream);
});

//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated!");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted!");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//like /dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("the post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("the post has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//comment on a post

router.put("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = Comment(req.body);
    if (!post.comments.includes(req.body.commenterId)) {
      await post.updateOne({ $push: { comments: req.body.commenterId } });
      await comment.save();
      res.status(200).json("Comment Successfull");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get comments for a post

router.get("/:id/get-comment", async (req, res) => {
  try {
    const comment = await Comment.find({ commenterId: req.params.id });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get timeline posts

router.get("/timeline/:userid", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userid);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followers.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//get users all posts

router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
