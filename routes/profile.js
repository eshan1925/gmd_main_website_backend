const router = require("express").Router();
const { User } = require("../models/user");
var ObjectID = require('mongodb').ObjectID;

router.get("/:id",async(req,res)=>{
    try {
        User.find({_id:req.params.id},function (err,foundItems) {
            if(!err){
                res.status(200).send(foundItems);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/:id/edit-profile",async(req,res)=>{
    try {
        User.find({_id:req.params.id},function (err,foundItems) {
            if(!err){
                res.status(200).send(foundItems);
            }
        })
    } catch (error) {
        console.log(error);
    }
});

router.post("/:id/edit-profile",async(req,res)=>{
    try {
        console.log(req.params.id);
        const user = await User.findOne({_id:req.params.id});

        if (!user) return res.status(400).send({ message: "Cant update as No user found!" });
        var userId = req.params.id;
        var f = req.body;
        await User.updateOne({_id: user._id},f,{ new: true }, (err,res)=> {
            if(!err){
                console.log("Updation Successful!");
            }
        }).clone()
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;