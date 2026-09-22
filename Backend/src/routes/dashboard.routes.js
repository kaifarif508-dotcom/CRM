const  {getDashboard}  = require( "../controller/Dashboard.controller")

const  express  =  require("express")

const router = express.Router()


router.get("/dashboard",getDashboard)





module.exports = router



