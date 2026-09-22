const express = require ("express")
const {Register,Login,Logout,Me} = require ('../controller/Auth.controller')
const authMiddleware = require ("../middleware/Auth.middleware")
const roleMiddleware = require("../middleware/Role.middleware")



const router = express.Router()


router.post("/register",Register)
router.post("/login",Login)
router.post("/logout",Logout)
router.get("/me",authMiddleware,Me)
router.get(
    "/admin-test",
    authMiddleware,
    roleMiddleware(["admin"]),
    (req,res) =>{
res.status(200).json({
    message : "Welcome Admin"
})
    }

)




module.exports = router