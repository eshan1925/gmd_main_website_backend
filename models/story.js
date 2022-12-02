const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
    },
    userName: {
      type: String,
    },
  },
  { timestamps: true },
  {
    expireAfterSeconds: 10
  }
);

module.exports = mongoose.model("Story", StorySchema);
