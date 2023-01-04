const router = require("express").Router();
const ContactRequest = require("../models/contactRequest");

router.post("/deal",async(req,res)=>{
    const newRequest = ContactRequest(req.body);
    console.log(newRequest);
    try {
        const savedRequest = await newRequest.save();
        res.status(200).json(savedRequest);
    } catch (error) {
        res.status(500).json(error);
    }
});




module.exports = router;
