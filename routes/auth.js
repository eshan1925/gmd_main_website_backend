const router = require("express").Router();
const { User } = require("../models/user");
const { newProject } = require("../models/newProject");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const sendEmailFromSendGrid = require("../utils/sendEmailSendgrid");
const bcrypt = require("bcrypt");
const Joi = require("joi");


//login
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
        // await sendEmail(user.email, "Verify Email for GET ME DESIGN", url);
        await sendEmailFromSendGrid(user.email,"Account Verification Email from GET ME DESIGN", url);
      }
      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }

    const token = user.generateAuthToken();
    var listOfProjects;
    newProject.find(
      { creatorOfProject: JSON.stringify(user._id) },
      function (err, foundItems) {
        if (!err) {
          listOfProjects = foundItems;
        }
      }
    );
    res
      .status(200)
      .send({
        listOfProjects: listOfProjects,
        userData: user,
        data: token,
        message: "logged in successfully",
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;

// doeexubevjhkeywf
