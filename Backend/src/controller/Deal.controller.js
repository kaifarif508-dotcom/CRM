const dealModel = require("../model/deal.model");
const mongoose = require('mongoose');

async function createDeal(req, res) {
  try {
    const { title, customer, value, stage, status, date, notes } = req.body;

    const deal = await dealModel.create({
      title,
      customer,
      value,
      stage,
      status,
      date,
      notes,
    });

    res.status(201).json({
      message: "deal create Successfully",
      deal,
    });
  } catch (error) {
    if(error.name === "ValidationError"){
      return res.status(400).json({
        success : false,
        message : "Invalid deal data",
        error : error.message
      })
    }
    res.status(500).json({
      success : false,
      message : "Failed to create deal",
      error: error.message,
    });
  }
}
async function getDeal(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const search = req.query.search || "";
    const stage = req.query.stage || "";
    const status = req.query.status || "";

    const filter = {};

    // Search by title
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Stage filter
    if (stage) {
      filter.stage = stage;
    }

    // Status filter
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const deals = await dealModel
      .find(filter)
      .populate("customer")
      .skip(skip)
      .limit(limit);

    const totalDeal = await dealModel.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "deals get Successfully",
      deals,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalDeal / limit),
        totalDeal,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message : "Failed to get deal",
      error: error.message,
    });
  }
}

async function getByIdDeal(req, res) {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success :false,
        message : "Invalid Deal Id"
      
      })
    }
    const deal = await dealModel
    .findById(id)
    .populate("customer");
    if (!deal) {
      return res.status(404).json({
        message: " deal not found",
      });
    }
    res.status(200).json({
      message: "get deal Successfully",
      deal,
    });
  } catch (error) {
    res.status(500).json({
      success : false,
      message : "Failed to get deal",
      error: error.message,
    });
  }
}

async function updateDeal(req, res) {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success : false,
        message : "Invalid Deal Id",
      })
    }

    const update = await dealModel.findByIdAndUpdate(
      id,
       req.body,
       {new: true,
        runValidators : true
       },
      ).populate("customer")
    if (!update) {
      return res.status(404).json({
        success : false,
        message: "deals not found",
      });
    }
    res.status(200).json({
      message: "deal update successfully",
      update,
    });
  } catch (error) {
    if(error.name === "ValidationError"){
      return res.status(400).json({
        success : false,
        message : "Invalid deal data",
      })
    }
    res.status(500).json({
      success : false,
      message : " Failed to update deal",
      error: error.message,
    });
  }
}

async function deleteDeal(req, res) {
  try {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success : false,
        message : "Invalid deal Id",
  
      })
    }

    const del = await dealModel.findByIdAndDelete(id);
    if (!del) {
      return res.status(404).json({
        success : false,
        message: "deal not found",
      });
    }
    res.status(200).json({
      success : true,
      message: "deal delete Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success : false,
      message  : "Failed  delete deal",
      error: error.message,
    });
  }
}

module.exports = { createDeal, getDeal, getByIdDeal, updateDeal, deleteDeal };
