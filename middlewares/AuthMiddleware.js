const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next)=>{
    const token = req.cookies.jwt
    // console.log("token : ", token)
    if(!token) return res.status(401).send("You are not Authenticated")
    jwt.verify(token, process.env.JWT_KEY, async (err, payload)=>{
        if(err) return res.status(403).send("Token is Invalid");
        req.userId = payload.userId
        next();
    })
}

module.exports = { verifyToken };