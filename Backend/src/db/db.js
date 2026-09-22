const mongoose =require('mongoose')


async function connectDb() {
    console.log("mongo Uri :", process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI)
    console.log("database connect")
}





module.exports =connectDb