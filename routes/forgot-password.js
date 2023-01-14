const router = require("express").Router();
const { User, validate } = require("../models/user");
const sendEmailFromSendGrid = require("../utils/sendEmailFP");
const Token = require("../models/token");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

router.post("/forgot-password/generate-token/:emailId", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.emailId });
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}getmedesign/${token.token}/reset-new-password/${user._id}`;
    // await sendEmail(user.email, "Verify Email", url);
    await sendEmailFromSendGrid(
      user.email,
      "Reset Password using this LINK by GET ME DESIGN",
      url
    );
    res.status(201).send({
      message: "An Email sent to your account for changing the password",
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:emailId/forgot-password/:token/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.emailId });

    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ message: "Invalid link" });

    if (req.body.newPassword == req.body.retypedNewPassword) {
      const unchangable = await bcrypt.compare(
        req.body.newPassword,
        user.password
      );

      if (unchangable) {
        return res
          .status(401)
          .send({ message: "Password can not be same as old password" });
      }

      try {
        const salt = await bcrypt.genSalt(10);
        const bcryptedPassword = await bcrypt.hash(req.body.newPassword, salt);
        const changes = {
          password: bcryptedPassword,
        };
        const updation = await User.findByIdAndUpdate(user._id, {
          $set: changes,
        });
        await token.remove();
        res.status(200).json("Password Changed!!!");
      } catch (error) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(400).send({ message: "Passwords do not match!!!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
