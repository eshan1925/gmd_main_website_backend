const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usernameSchema = new Schema(
  {
    listOFUN: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = usernameSchema;
