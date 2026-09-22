


const {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controller/Customer.controller");
const roleMiddleware = require("../middleware/Role.middleware")
const authMiddleware = require("../middleware/Auth.middleware")
const express = require("express");

const router = express.Router();

router.post("/customers", 
  authMiddleware,
  createCustomer);
router.get("/customers",
  authMiddleware,
  getCustomer);
router.get("/customers/:id",
  authMiddleware,
  getCustomerById);
router.put("/customers/:id",
  authMiddleware,
  updateCustomer);
router.delete("/customers/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteCustomer,

);

module.exports = router;
