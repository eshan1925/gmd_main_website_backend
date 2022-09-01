const router = require("express").Router();
const { User } = require("../models/user");

router.post("/:id", async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
