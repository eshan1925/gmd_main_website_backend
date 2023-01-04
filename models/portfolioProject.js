const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newPortfolioProjectSchema = new Schema({
  creatorOfProject: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  image:{type:String,required:true}
});

const newPortfolioProject = mongoose.model(
  "newPortfolioProject",
  newPortfolioProjectSchema
);

module.exports = { newPortfolioProject };
