const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    number: { type: String },

    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/open-box-it-services/image/upload/v1661932391/GMD/beardBoy_k3moc7.png",
    },
    coverImg: {
      type: String,
      default:
        "https://res.cloudinary.com/open-box-it-services/image/upload/v1672339224/GMD/noCover_nqkacb.png",
    },
    tools: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    charge: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, default: null },
    city: { type: String, default: null },
    country: { type: String, default: null },
    Bio: { type: String, default: null },
    groupsList: { type: Array, default: [] },
    badgesList: { type: Array, default: [] },
    username: { type: String, default: null },
    skills: { type: Array },
    oneLiner: { type: String },
    instagramLink: { type: String },
    linkedInLink: { type: String },
    otherLinks: { type: Array },
  },
  { timestamps: true }
);

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
