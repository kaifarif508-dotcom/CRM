const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    team: {
      type: String,
      required: true,
      trim: true,
    },
    customer: {
      type:   mongoose.Schema.Types.ObjectId,
      ref : "Customer",
      required: true,
      
    },
    date: {
      type: String,
      required: true,
      trim : true,
      
    },
    priority: {
      type: String,
      required : true,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Pending", "InProgress", "Complete"],
      default: "Pending",
      required : true,
    },
    notes: {
      type: String,
      trim : true,

      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
