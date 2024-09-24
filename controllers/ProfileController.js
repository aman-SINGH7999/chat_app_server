const User = require('../models/UserModel')
const cloudinary = require('../cloudinary/cloudinarySetup')

const updateProfile = async (req, res)=>{
    const { firstName, lastName, bio } = req.body;
    try{
        const imgData = await cloudinary(req.file.path);

        const response = await User.findByIdAndUpdate({_id:req.userId},{firstName,lastName,bio,image:imgData.url}, {new:true})

        return res.status(200).json({response, message:"Profile Updated Successfully", success:true})
    // console.log("ImageData : ", imgData.url)
    }catch(err){
        return res.status(500).json({message:"Internal Server Error", success:false})
    }
    
}


module.exports = { updateProfile }