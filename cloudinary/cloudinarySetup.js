// const { v2 as cloudinary } = require('cloudinary');
const cloudinary = require('cloudinary').v2
const fs = require('fs');


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

 // Upload an image
 const uploadOnCloudinary = async (localPath)=>{
    try{
        if(!localPath){
            console.log("Local file path not found")
            return null
        }
        console.log("Local file path : ", localPath)
        const uploadResult = await cloudinary.uploader.upload( localPath, {
            public_id: 'shoes',
            resource_type : "auto"
        })
        console.log("uploadResult : ", uploadResult)
        fs.unlinkSync(localPath)
        return uploadResult;
    }catch(err){
        console.log("Cloudainery error")
        fs.unlinkSync(localPath) //remove the locally saved temporary file
        return null
    }
 }

 module.exports = uploadOnCloudinary;