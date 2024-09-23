const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const databaseURL = process.env.DATABASE_URL

 const connectDB = async ()=> {
    // console.log(databaseURL)
    try{
        await mongoose.connect(databaseURL);
        console.log("database connected successfully!")
    }catch(err){
        console.log("ERROR in Database Connection:",err)
    }
}

module.exports = connectDB