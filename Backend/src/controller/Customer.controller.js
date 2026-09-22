const customerModel = require("../model/customer.model");
const mongoose = require('mongoose');

async function createCustomer(req, res) {
  try {
    const { name, email, phone, company } = req.body;

    const customer = await customerModel.create({
      name,
      email,
      phone,
      company,
    });
    res.status(201).json({
      success: true,
      message: "Customer create Successfully",
      customer,
    });
  } catch (error) {
    if(error.code === 11000){
      res.status(400).json({
        success: false,
        message : "Email already exists"
      })
    }
    res.status(500).json({
      success: false,
      error: error.message,
      message: "failed to create customer",
    });
  }
}

async function getCustomer(req, res) {
  try {


const  page = Number(req.query.page) || 1;
const  limit = Number(req.query.limit) || 5;
const search = req.query.search || "";

const filter = search
 ? {
$or:[
  {name :{$regex:search,$options:"i"}},
  {email :{$regex:search,$options:"i"}},
  {company :{$regex:search,$options:"i"}}
]
}:{};
const skip = (page -1) * limit;


    const getCustomer = await customerModel.find(filter)
    .skip(skip)
    .limit(limit)
    const  totalCustomer = await customerModel.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "Get Customer Successfully",
      getCustomer,
      pagination :{
currentPage : page,
totalPages : Math.ceil(totalCustomer/limit),
totalCustomer,
limit
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to  get customer",
      error: error.message,
    });
  }
}
async function getCustomerById(req, res) {
  try {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return  res.status(400).json({
        success : false,
        message : "Invalid Customer Id"
      })
    }
    const customer = await customerModel.findById(id);

    if (!customer) {
      return res.status(404).json({
        message: " Customer not found",
      });
    }
    res.status(200).json({
      success : true,
      message: "Customer get successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success : false,
      message : "Failed to get Customer",
      error: error.message,

    });
  }
}

async function updateCustomer(req, res) {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success : false,
        message : "Invalid Customer id"
      })
    }
    const update = await customerModel.findByIdAndUpdate(
      id,
       req.body,
       {new : true}
      );

    if (!update) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer  updated successfully",
      customer: update,
    });
  } catch (error) {
    if(error.code === 11000){
      return res.status(400).json({
        success : false,
        message : "Email already exists"

      })
    }
    res.status(500).json({
      success : false,
      message : "Failed to update customer",
      error: error.message,
    });
  }
}

async function deleteCustomer(req, res) {
  try {
    const id = req.params.id;
    const customerDel = await customerModel.findByIdAndDelete(id);

    if (!customerDel) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }
    res.status(200).json({
      message: "Customer delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      success : false,
      message : "failed to delete customer  ",
      error : error.message,
    })
  }
}

module.exports = {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
