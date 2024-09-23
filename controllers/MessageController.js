const Message = require('./../models/MessageModel')
const Chat = require("./../models/ChatModel")
const { getReceiverSocketId, getIO } = require('../socket/socket');

const sendMessage = async (req, res)=>{
    try{
        const sender = req.userId;
        const receiver = req.params.id;
        const message = req.body.message;
        // res.json({sender, receiver, message});
        const newMessage = await Message.create({sender, receiver, message})
        // console.log("newmssage : ", newMessage)

        let findChat = await Chat.findOne({participants: {$all : [sender, receiver]}})

        if(!findChat){
            findChat = await Chat.create({participants : [sender, receiver], chatMessage: [newMessage._id]})
        }else{
            findChat = await Chat.findByIdAndUpdate({_id:findChat._id}, {chatMessage : [...findChat.chatMessage, newMessage._id]})
        }

        // socket.io
        const receiverSocketId = getReceiverSocketId(receiver);
        // console.log("receiverSocketId : ", receiverSocketId)
        const io = getIO();
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json({ newMessage , message : "Message sent successfully"});

    }catch(err){
        console.log("Error in send message controller: ", err);
        res.status(500).json({message:"Internal Server Error", success:false})
    }
}


const getMessage = async (req, res)=>{
    try{
        const sender = req.params.id;
        const receiver = req.userId;
        
        let findChat = await Chat.findOne({participants: {$all : [sender, receiver]}}).populate("chatMessage")

        if(!findChat) return res.status(400).json({message : "No Chats Available", success:false, receiver,sender});
        // console.log("find chat : ", findChat.chatMessage)
        return res.status(200).json({ messages : findChat.chatMessage});

    }catch(err){
        console.log("Error in getMessage controller: s", err);
        return res.status(500).json({message:"Internal Server Error", success:false})
    }
}


module.exports = {sendMessage, getMessage }