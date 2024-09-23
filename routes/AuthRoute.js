const { Router } = require('express')
const { signup, login, logout, getUserInfo } = require('../controllers/AuthController');
const { verifyToken } = require('../middlewares/AuthMiddleware')

const authRoute = Router();

authRoute.post('/signup', signup)
authRoute.post('/login', login)
authRoute.get("/logout", verifyToken, logout)
authRoute.get("/user-info", verifyToken, getUserInfo)

module.exports = authRoute