const router = require("express").Router();
const { newBlog } = require("../models/blog");

router.post("/", async (req, res) => {
  try {
    var blogDetails = req.body;
    console.log(blogDetails);
    let newBlogPostAdd = await new newBlog({ ...req.body }).save();
    res.status(200).json(blogDetails);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
