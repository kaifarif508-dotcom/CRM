const express = require("express");

const router = express.Router();
const {
  createLead,
  getLead,
  getByIdLead,
  updateLead,
  deleteLead,
} = require("../controller/Leads.controller.js");
const authMiddleware = require("../middleware/Auth.middleware.js")
const roleMiddleware = require("../middleware/Role.middleware.js")

router.post("/leads",
  authMiddleware,
  createLead);
router.get("/leads",
  authMiddleware,
  getLead);
router.get("/leads/:id",
  authMiddleware,
  getByIdLead);
router.put("/leads/:id",
  authMiddleware,
  updateLead);
router.delete("/leads/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteLead);

module.exports = router;
