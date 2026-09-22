const AuthModel = require ("../model/auth.model.js")
const Jwt = require ("jsonwebtoken")
const bcrypt = require("bcrypt")




async function Register(req,res){
    try{

        const {name ,username, email, password, role = "user"} = req.body
        
const isExists = await AuthModel.findOne({
    $or:[
        {email},
        {username}
    ]
}
)

if(isExists){
    return res.status(409).json({
        message : "User already exists"
    })
}

const hashPassword = await bcrypt.hash(password, 10)

const user = await AuthModel.create({
    name,
    username,
    email,
    password : hashPassword,
    role
})


const token = Jwt.sign({
    id : user._id,
    role : user.role
},process.env.JWT_SECRET,{
    expiresIn : "1d"

})


const userResponse = {
id : user._id,
name : user.name,
username : user.username,
email : user.email,
role : user.role
}
res.cookie("token", token,{
    httpOnly: true,
    maxAge: 20 * 60 * 60 * 1000
})
res.status(201).json({
    message : "User register successfully",
    userResponse
})
}
catch(error){
    console.log(error)
    if(error.code === 11000){
       return res.status(409).json({
           message : "Email or user is already exists" 
        })
    }

    return res.status(500).json({
message : "Registeraton failed"
    })
}

}


async function Login(req,res){
const {identifier,password} = req.body

const isExisting = await AuthModel.findOne({
    $or :[
       { email : identifier},
        {username : identifier}
    ]
})
if(!isExisting){
    return res.status(401).json({
        message : "User not found"
    })
}

const isExistingPassword = await bcrypt.compare(password,isExisting.password)

if(!isExistingPassword){
    return res.status(401).json({
        message : "Invalid email or password"
    })
}
const token = Jwt.sign({
    id : isExisting._id,
    role : isExisting.role
},process.env.JWT_SECRET,{
    expiresIn : "1d"
})

res.cookie("token",token)

res.status(200).json({
    message : "User login successfully",

})
}


async function Logout(req,res){
res.clearCookie("token")
res.status(200).json({
    message : "User Logout Successfully"
})
}


async function Me(req,res){
    const user = await AuthModel.findById(req.user.id)
    .select("-password")

if(!user){
    return res.status(404).json({
        message : "User not found"
    })
}

res.status(200).json({
    message : "User profile" ,
    user
})

}




module.exports = {Register,Login,Logout,Me}


