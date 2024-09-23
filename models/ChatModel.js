const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }],
    chatMessage : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "message"
    }]
},{timestamps:true})

const Chat = mongoose.model("chat", chatSchema)

module.exports = Chat