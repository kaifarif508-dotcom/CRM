const taskModel = require("../model/task.model");
const mongoose = require('mongoose');

async function createTask(req, res) {
  try {
    const { title, team, customer, date, priority, status, notes } = req.body;

    const task = await taskModel.create({
      title,
      team,
      customer,
      date,
      priority,
      status,
      notes,
    });

    res.status(201).json({
      success : true,
      message: "Task create successfully",
      task,
    });
  } catch (error) {
  if(error.name === "ValidationError"){
  return res.status(400).json({
  success : false,
  message : "Invalid task data",
  error : error.message  
  })
  }
    res.status(500).json({
      success : false,
      message : "Failed to create Task",
      error: error.message,
    });
  }
}

async function getTask(req, res) {
  try {

    const page = Number(req.query.page) || 1;
    const limit =Number(req.query.limit) || 5;
    
const search  = req.query.search || "";
const priority = req.query.priority || "";
const status = req.query.status || "";

const filter = {};

if(search){
  filter.title ={$regex : search, $options : "i"}
    
  
}

if(priority){
  filter.priority = priority;
}
if(status){
  filter.status = status;
}

const skip = (page -1) * limit ;


    const tasks = await taskModel
    .find(filter)
    .populate("customer")
    .skip(skip)
    .limit(limit)

    const totalTask = await taskModel.countDocuments(filter);
   
    res.status(200).json({
      message: "tasks get Succcessfully",
      tasks,
      pagination:{
        currentPage : page,
        totalPages : Math.ceil(totalTask/limit),
        totalTask,
        limit


      }
    });
  } catch (error) {
    res.status(500).json({
      success : false,
      message : "Failed to get task",
      error: error.message,
    });
  }
}

async function getByIdTask(req, res) {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
    success :false,
    message : "Invalid Task id",
    }
    
    )
    }
        const task = await taskModel
    .findById(id)
    .populate("customer");
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      message: "task get successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
    success : false,
    message : "Failed to get task",
      error: error.message,
    });
  }
}

async function updateTask(req, res) {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({
    success : false,
    message : "Invalid Task Id",
  
    })

    }
    const update = await taskModel
    .findByIdAndUpdate(
      id,
       req.body,
       {new : true,
       runValidators : true
       },
      ).populate("customer")
    if (!update) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      message: "Task update successfully",
      update,
    });
  } catch (error) {
  if(error.name === "ValidationError"){
  return res.status(400).json({
  success : false,
  message : "Invalid task data",
  error: error.message,
  })

  }
    res.status(500).json({
    success : false,
    message : "Failed to Update Task",
      error: error.message,
    });
  }
}

async function deleteTask(req, res) {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
return res.status(400).json({
success : false,
message : "Invalid Task Id",
})
    }
    const delTask = await taskModel.findByIdAndDelete(id);
    if (!delTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      message: "Task delete successfully",
    });
  } catch (error) {
    res.status(500).json({
    success : false,
    message : "Failed to Delete Task",
      error: error.message,
    });
  }
}

module.exports = { createTask, getTask, getByIdTask, updateTask, deleteTask };
