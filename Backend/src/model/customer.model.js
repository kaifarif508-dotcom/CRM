const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim : true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim :true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim : true,
  },
  company: {
    type: String,
    required: true,
    trim : true,
  },
});

const customerModel = mongoose.model("Customer", customerSchema);

module.exports = customerModel;
