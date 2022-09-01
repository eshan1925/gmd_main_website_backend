const router = require("express").Router();
const { User } = require("../models/user");

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


module.exports = router;