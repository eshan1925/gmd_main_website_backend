const router = require("express").Router();
const CommunityForum = require("../models/community-forum");

router.post("/new-activity", async (req, res) => {
  const newRequest = CommunityForum(req.body);
  console.log(req.body);
  try {
    const savedRequest = await newRequest.save();
    res.status(200).json(savedRequest);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-all-activities",async(req,res)=>{
  try {
    const questions = await CommunityForum.find({});
    res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/get-user-activities/:id",async(req,res)=>{
  try {
    const questions = await CommunityForum.find({userId:req.params.id});
    res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})


module.exports = router;