// socket.js
const { Server } = require('socket.io');

const userSocketMap = {}

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: [process.env.ORIGIN],
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap[userId] = socket.id;
        }

        io.emit('getOnlineUsers', Object.keys(userSocketMap));

        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id);
            delete userSocketMap[userId];
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        });
    });
}

function getIO() {
  if (!io) {
      throw new Error('Socket.io not initialized!');
  }
  return io;
}

function getReceiverSocketId(receiverId) {
    return userSocketMap[receiverId];
}

module.exports = { initializeSocket, getReceiverSocketId, getIO };
