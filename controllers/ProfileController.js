const User = require('../models/UserModel')
const cloudinary = require('../cloudinary/cloudinarySetup')

const updateProfile = async (req, res)=>{
    const { firstName, lastName, bio } = req.body;
    console.log("Request Body : ", req.body)
    console.log("Request File : ", req.file)
    try{
        const imgData = await cloudinary(req.file.path);
        // console.log("ImageData : ", imgData.url)
        const response = await User.findByIdAndUpdate({_id:req.userId},{firstName,lastName,bio,image:imgData.url}, {new:true})
        return res.status(200).json({response, message:"Profile Updated Successfully", success:true})
    }catch(err){
        // console.log(" failed")
        return res.status(500).json({message:"Error in updating profile", success:false})
    }
    
}


module.exports = { updateProfile }