const express = require("express");
const {
  createDeal,
  getDeal,
  getByIdDeal,
  updateDeal,
  deleteDeal,
} = require("../controller/Deal.controller");
const authMiddleware = require("../middleware/Auth.middleware")
const roleMiddleware = require("../middleware/Role.middleware")


const router = express.Router();

router.post("/deals",
  authMiddleware,
  createDeal);
router.get("/deals",
  authMiddleware,
  getDeal);
router.get("/deals/:id",
  authMiddleware,
  getByIdDeal);
router.put("/deals/:id",
  authMiddleware,
  updateDeal);
router.delete("/deals/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
   deleteDeal);

module.exports = router;
