import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get port from environment variables or default to 8000
const PORT = process.env.PORT || 8000;

const io = new Server(PORT, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000', // Use environment variable or fallback to localhost
    }
});

let users = [];

// Function to add a user
const addUser = (userData, socketId) => {
    if (!users.some(user => user.sub === userData.sub)) {
        users.push({ ...userData, socketId });
    }
};

// Function to remove a user
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

// Function to get a user by ID
const getUser = (userId) => {
    return users.find(user => user.sub === userId);
};

io.on('connection', (socket) => {
    console.log('User connected');

    // Connect
    socket.on("addUser", (userData) => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    });

    // Send message
    socket.on('sendMessage', (data) => {
        const user = getUser(data.receiverId);
        if (user) {
            io.to(user.socketId).emit('getMessage', data);
        } else {
            console.error(`User with ID ${data.receiverId} not found.`);
        }
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});

console.log(`Socket.IO server running on port ${PORT}`);
