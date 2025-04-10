const mongoose = require("mongoose");

const ChildrenSchema = new mongoose.Schema({ 
    firstname: {
    type: String,
    trim: true,
  },
  firstname: {
    type: String,
    trim: true,
  },
  parentname: {
    type: String,
    trim: true,
  },
  age: {
    type: String,
    trim: true,
  },
  class: {
    type: String,
    trim: true,
  },
  residence: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  }
});

module.exports = mongoose.model("Children", ChildrenSchema);
