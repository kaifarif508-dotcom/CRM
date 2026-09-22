const LeadModel = require("../model/lead.model");
const mongoose = require('mongoose')

async function createLead(req, res) {
  try {
    const { name, email, phone, company, source, status, priority,customer, notes } =
      req.body;

    const lead = await LeadModel.create({
      name,
      email,
      phone,
      company,
      source,
      status,
      priority,
      customer,
      notes,
    });
  
    res.status(201).json({
      success :true,
      message: "Lead create successfully",
      lead,
    });
  } catch (error) {
    if(error.code === 1100){
      return res(400).json({
        success : false,
        message : "Email already exists",

      })
    }
    if(error.name === "ValidationError"){
      return res.status(400).json({
        success : false,
        message : "Invalid lead data",
        
      })
    }
    res.status(500).json({
      success : false,
      message : "Failed to create lead",
      error: error.message,
    });
  }
}

async function getLead(req, res) {
  try {
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 5;

const search = req.query.search || "";
const status = req.query.status || "";
const priority = req.query.priority || "";

const filter ={};

if(search){
  filter.$or =[
    {name :{$regex : search , $options : "i"}},
    {email :{$regex : search, $options : "i"}},
    {company : {$regex : search, $options : "i"}}
  ]
}
if(status){
  filter.status = status
}

if(priority){
  filter.priority = priority;
}


const skip = (page -1) * limit;

    const leads = await LeadModel
    .find(filter)
    .populate("customer")
    .skip(skip)
    .limit(limit);


    const totalLead = await LeadModel.countDocuments(filter);



    res.status(200).json({
      message: "Get Lead Successfully",
      leads,
      pagination :{
       currentPage : page,
      totalPages : Math.ceil(totalLead/limit),
      totalLead,
      limit
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success : false,
      message : "Failed to get lead",
      error: error.message,
    });
  }
}

async function getByIdLead(req, res) {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success : false,
        message : "lead Invalid id ",
        
      })
    }
    const lead = await LeadModel.findById(id).populate("customer");
    if (!lead) {
      return res.status(404).json({
        success : false,
        message: " lead not found",
      });
    }
    res.status(200).json({
      success : true,
      message: "get Lead Successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success : false,
      message : "Failed to get Lead",
      error: error.message,
    });
  }
}

async function updateLead(req, res) {
  try {



    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success : false,
        message : "Invalid Lead Id",
        error : error.message,
      })
    }
    const update = await LeadModel.findByIdAndUpdate(
      id, 
      req.body,
      {
        returnDocument: "after",
        runValidators : true
      },
    ).populate
    ("customer");
    if (!update) {
      return res.status(404).json({
        success : false,
        message: "lead not found",
      });
    }
    res.status(200).json({
      success : true,
      message: "Lead update successfully",
      update,
    });
  } catch (error) {
    if(error.code === 1100){
      return res.status(400).json({
        success : false,
        message : "Email already exists"
      })
    }
    if(error.name === "ValidationError"){
      return res.status(400).json({
        success : false,
        message : "Invalid Lead data",
        error : error.message
      })
    }
    res.status(500).json({
      success : false,
      message : "Failed to updated Lead",
      error: error.message,
    });
  }
}

async function deleteLead(req, res) {
  try {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success : false,
        message : "Inavlid Lead Id",
        
      })
    }

    const leadDel = await LeadModel.findByIdAndDelete(id);
    if (!leadDel) {
      return res.status(404).json({
        success : false,
        message: "lead not found",
      });
    }
    res.status(200).json({
      success :true,
      message: "lead delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      success : false,
      message : "Failed to Delete Lead",
      error: error.message,
    });
  }
}

module.exports = { createLead,
   getLead, 
   getByIdLead,
    updateLead, 
    deleteLead };
