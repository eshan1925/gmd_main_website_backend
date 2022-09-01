const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  profilePic: {type:String,default:"https://res.cloudinary.com/open-box-it-services/image/upload/v1661932391/GMD/beardBoy_k3moc7.png"},
  numberOfFriends: { type: Number, default: 0 },
  numberOfGroups: { type: Number, default: 0 },
  dateOfBirth: { type: Date, default: null },
  gender: { type: String, default: null },
  city: { type: String, default: null },
  country: { type: String, default: null },
  Bio: { type: String, default: null },
  friendsList: { type: Array, default: [] },
  groupsList: { type: Array, default: [] },
  badgesList: { type: Array, default: [] },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });

  return schema.validate(data);
};

module.exports = { User, validate };
