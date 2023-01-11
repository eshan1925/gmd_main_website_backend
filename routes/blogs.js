const router = require("express").Router();
const { newBlog } = require("../models/blog");


router.get("/:id/all-blogs", async (req, res) => {
  try {
    newBlog.find({}, function (err, foundItems) {
      if (!err) {
        res.status(200).send(foundItems);
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id/my-blogs", async (req, res) => {
  try {
    newBlog.find({ creatorid: req.params.id }, function (err, foundItems) {
      if (!err) {
        res.status(200).send(foundItems);
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id/:blogid",async (req,res)=>{
  try {
      newBlog.find({_id:req.params.blogid},function (err,foundItems) {
          if(!err){
              res.status(200).send(foundItems);
          }
      });
  } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
  }
});


module.exports = router;
