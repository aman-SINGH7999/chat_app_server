const express = require('express')
const { updateProfile } = require('../controllers/ProfileController')
const { upload } = require('../middlewares/multer')
const { verifyToken } = require('../middlewares/AuthMiddleware')

const profileRoute = express.Router();

profileRoute.post("/update-profile", verifyToken, upload.single('image'), updateProfile)

module.exports = profileRoute