const express = require("express")
const customerRoutes = require('./routes/Customer.routes')
const leadRoutes = require('./routes/Lead.routes')
const dealRoutes = require('./routes/Deal.routes')
const taskRoutes = require('./routes/Task.routes')
const authRoutes = require('./routes/Auth.routes')
const dashboardRoutes = require('./routes/dashboard.routes')
const cors = require('cors')
const cookieParser = require ('cookie-parser')
 
const app = express()
app.use(cors(
{

   origin: [
    "https://crm-wheat-seven-71.vercel.app", // Deployed frontend (No trailing slash)
    "http://localhost:5173"                  // Local frontend (No trailing slash)
  ],
  credentials: true
}
)

)
 app.use(express.json())
 app.use(cookieParser())

  app.use("/api",customerRoutes)
  app.use("/api",leadRoutes)
  app.use("/api",dealRoutes)
  app.use("/api",taskRoutes)
  app.use("/api/auth",authRoutes)
  app.use("/api",dashboardRoutes)





module.exports = app