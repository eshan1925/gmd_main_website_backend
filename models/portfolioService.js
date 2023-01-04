const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newPortfolioServiceSchema = new Schema({
  creatorOfService: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  cost: { type: String, required: true },
  image:{type:String,required:true}
});

const newPortfolioService = mongoose.model(
  "newPortfolioService",
  newPortfolioServiceSchema
);

module.exports = { newPortfolioService };
