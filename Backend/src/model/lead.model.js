const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim : true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      enum: [
        "Website",
        "Facebook",
        "Instagram",
        "LinkedIn",
        "Referral",
        "Other",
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ["New", "Contacted", "Qualified", "Converted", "Lost"],
      default: "New",
    },

    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    customer:{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Customer",
      default : null,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const LeadModel = mongoose.model("Lead", leadSchema);

module.exports = LeadModel;
