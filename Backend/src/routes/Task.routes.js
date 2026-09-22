const express = require("express");
const {
  createTask,
  getTask,
  getByIdTask,
  updateTask,
  deleteTask,
} = require("../controller/Task.controller");
const authMiddleware = require("../middleware/Auth.middleware.js")
const roleMiddleware = require("../middleware/Role.middleware.js")

const router = express.Router();

router.post("/tasks",
  authMiddleware,
   createTask);
router.get("/tasks",
  authMiddleware,
   getTask);
router.get("/tasks/:id",
  authMiddleware,
   getByIdTask);
router.put("/tasks/:id",
  authMiddleware,
   updateTask);
router.delete("/tasks/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteTask);

module.exports = router;
