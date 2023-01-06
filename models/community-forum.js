const mongoose = require("mongoose");

const CommunityForumSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title:{
        type:String,
        required:true,
    },
    question: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Object,
      default: {"":""},
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("CommunityForum",CommunityForumSchema);