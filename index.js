const express = require('express')
const app = express();
const http = require('http')
const server = http.createServer(app)
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./connectDB')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/AuthRoute');
const messageRoute = require('./routes/MessageRoute')
const profileRoute = require("./routes/ProfileRoute")
const { initializeSocket } = require('./socket/socket')


dotenv.config();
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST','PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

connectDB();


app.use('/api/auth', authRoute)
app.use('/api/message', messageRoute)
app.use("/api/profile", profileRoute)

initializeSocket(server);


const port = process.env.PORT || 4000
server.listen(port,()=>{
    console.log("Server is listening on port : ",port)
})