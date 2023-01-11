const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newBlogSchema = new Schema({
  creatorName: { type: String, required: true },
  creatorid: { type: String, required: true },
  blogTitle: { type: String, required: true },
  timeOfCreation: { type: Date },
  blogContent: { type: String },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/open-box-it-services/image/upload/v1672339224/GMD/noCover_nqkacb.png",
  },
});

const newBlog = mongoose.model("newBlog", newBlogSchema);

module.exports = { newBlog };
