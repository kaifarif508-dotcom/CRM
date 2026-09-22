
const    CustomerModel = require( "../model/customer.model.js")
 const   DealModel    = require(  "../model/deal.model.js")
 const   LeadModel    = require(  "../model/lead.model.js")
 const   TaskModel    = require(  "../model/task.model.js")











async function getDashboard(req,res){
try{
const totalCustomer = await CustomerModel.countDocuments();
const totalDeal = await DealModel.countDocuments();
const totalLead = await LeadModel.countDocuments();
const pendingTask  = await TaskModel.countDocuments({
    status : "Pending",

})
const pendingTasks = await TaskModel.find({
    status : "Pending"
})
.sort({createdAt : -1})
.limit(3)
.populate("customer","name")




const revenueResult = await DealModel.aggregate([
    {
    $match:{
        status : "Won"
    },
    },

    {
$group:{
    _id : null,
    totalRevenue:{
        $sum : "$value",
    },
}
    }
    

    
])

const monthlyRevenue = await DealModel.aggregate(
    [
        {

            $match:{
                status :"Won"
            }
        },

        {

            $group :{
                _id:{
                    month :{$month :"$createdAt"},
                    year : {$year : "$createdAt"}

                },
                revenue:{
                   $sum : "$value"
                }
            }
        },

        {
            $sort :{
                "_id.year" : 1,
                "_id.month" : 1
            }
        }
    ]
)

const monthNames =[
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",

]

const formattedMonthlyRevenue = monthlyRevenue.map((item)=>{

    return{

        month :monthNames[item._id.month -1],
        revenue: item.revenue,
    }
})


const revenue =  revenueResult[0]?.totalRevenue || 0;
  const recentDeal  = await  DealModel.find()
  .sort({ createdAt : -1})
  .limit(3)
  .populate("customer","name")

  res.status(200).json({
    totalCustomer,
    totalDeal,
    
    totalLead,
    revenue,
    monthlyRevenue : formattedMonthlyRevenue,
    pendingTask,
    pendingTasks,
    recentDeal
  })
}
catch(error){
    console.log(error)
res.status(500).json({
    error : error.message,

})
}
}





module.exports = {getDashboard}