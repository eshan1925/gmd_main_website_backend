const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema(
    {
        name:{
            type:String,
        },
        companyName:{
            type:String,
        },
        projectRequirement:{
            type:String,
        },
        projectBudget:{
            type:String,
        },
        number:{
            type:String,
        },
        email:{
            type:String,
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("ContactUsRequest",ContactUsSchema);