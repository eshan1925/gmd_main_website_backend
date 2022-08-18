const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newProjectSchema = new Schema({
    creatorOfProject:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    dueDate:{type:Date},
    tasks:{type:[Object]},
    tags:{type:[String]},
    location:{type:String},
    language:{type:String},
    attachments:{type:String},
})

const newProject=mongoose.model("newProject",newProjectSchema);

module.exports = {newProject};