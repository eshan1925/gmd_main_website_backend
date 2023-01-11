const router = require("express").Router();
const ContactUsRequest = require("../models/contactUs");

router.post("/new-contact-request", async (req, res) => {
  try {
    let newReq = await new ContactUsRequest({ ...req.body }).save();
    res.status(200).json(newReq);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
