const router = require("express").Router();
const { newBlog } = require("../models/blog");

router.post("/", async (req, res) => {
  try {
    var blogDetails = req.body;
    let newBlogPostAdd = await new newBlog({ ...req.body }).save();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
