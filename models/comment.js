const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    commenterId: { type: String, required: true },
    commentContent: { type: String },
    commenterName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment",CommentSchema);