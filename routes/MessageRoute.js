const express = require('express')
const {sendMessage, getMessage, deleteMessage} = require('./../controllers/MessageController')
const { verifyToken } = require("./../middlewares/AuthMiddleware")

const messageRoute = express.Router();

messageRoute.post("/send/:id", verifyToken, sendMessage)
messageRoute.get("/get-message/:id",verifyToken, getMessage)
messageRoute.delete("/delete-message/:id",verifyToken, deleteMessage)

module.exports = messageRoute