const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newBlogSchema = new Schema({
    creatorName:{type:String,required:true},
    creatorid:{type:String,required:true},
    blogTitle:{type:String,required:true},
    timeOfCreation:{type:Date},
    blogContent:{type:String},
    image:{type:String},
});

const newBlog = mongoose.model("newBlog",newBlogSchema);

module.exports = {newBlog};