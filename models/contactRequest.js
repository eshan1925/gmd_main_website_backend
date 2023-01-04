const mongoose = require("mongoose");

const contactReqSchema = new mongoose.Schema({
  nameOfRequester: {
    type: String,
    required: true,
  },
  numberOfRequester: {
    type: String,
    required: true,
  },
  emailOfRequester: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  idOfRequestedPerson: {
    type: String,
    required: true,
  },
});


module.exports= mongoose.model("ContactRequest",contactReqSchema);