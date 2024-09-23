
const User = require('../models/UserModel');
const {sign} = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const maxAge = 3*24*60*60*1000;
const createToken = (email, userId)=>{
    return sign({email, userId}, process.env.JWT_KEY, {expiresIn : maxAge})
}

const signup = async (req, res)=>{
        // console.log("req_body : ",req.body)
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : "Email or Password is Required", success:false})
        }
        const isAlreadyExist = await User.findOne({email})
        // console.log("isAlreadyExist : ", isAlreadyExist)
        if(isAlreadyExist) res.status(400).json({message : "User Already Registered", success:false})

        const user = await User.create({email, password});

        return res.status(201).json({message : "Registered Successfully", success:true});

    }catch(err){
        console.log("ERROR in Signup Controller:", err);
        return res.status(500).json({message : "Internal Server Error", success:false})
    }
}

const login = async (req, res)=>{
    // console.log("req_body : ",req.body)
try{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message :"Email or Password is Required", success:false})

    const user = await User.findOne({email});

    if(!user) return res.status(404).json({message:"User not found", success:false})

    const isCorrect = await bcrypt.compare(password, user.password);

    if(!isCorrect) return res.status(400).json({message : "Password is Incorrect", success:false})

    res.cookie("jwt", createToken(email, user._id),{
        maxAge,
        secure : true,
        sameSite : "None",
    });
    return res.status(200).json({user, message : "Login Successfully", success:true});
}catch(err){
    console.log("ERROR in login controller:", err);
    return res.status(500).json({message:"Internal Server Error", success:false})
}
}

const logout = async (req, res)=>{
    // console.log("Logout ")
    try{
        res.cookie("jwt", {maxAge: 0});
        res.status(200).json({message: "Logout Successfully", success: true})
    }catch(err){
        console.log("ERROR in logout controller:", err);
        return res.status(500).json({message:"Internal Server Error", success:false})
    }
}

const getUserInfo = async (req, res)=>{
    try{
        const allUsers = await User.find({_id : {$ne : req.userId}}).select("-password")
        res.status(200).json(allUsers)
    }catch(err){
        console.log("ERROR in get User Info controller:", err);
        return res.status(500).json({message:"Internal Server Error", success:false})
    }
}

module.exports = {signup, login, logout, getUserInfo}