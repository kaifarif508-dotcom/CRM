const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "Customer",
      required: true,
      
    },
    value: {
      type: Number,
      required: true,
      
    },

    stage: {
      type: String,
      required: true,
      enum: ["New", "Proposal", "Negotiation", "Closed"],
      default: "New",
      trim : true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Open", "Won", "Lost"],
      default: "Open",
      trim : true,
    },
    date: {
      type: String,
      required: true,
      trim : true,
    },
    notes: {
      type: String,
      default: "",
      trim : true,
    },
  },
  {
    timestamps: true,
  },
);

const dealModel = mongoose.model("Deal", dealSchema);

module.exports = dealModel;
