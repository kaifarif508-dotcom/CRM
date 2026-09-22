const mongoose = require ("mongoose")




const AuthSchema = new mongoose.Schema({
name :{
    type :String,
    required : true
},
username:{
type : String,
required:true,
unique : true
},
email:{
type : String,
required:true,
unique : true
},

password:{
    type :String ,
    required :true
},
role:{
    type :String,
    required: true,
    enum :["user","admin"],
    default : "user"
}
})



const AuthModel = mongoose.model("CrmAuth", AuthSchema)



module.exports = AuthModel