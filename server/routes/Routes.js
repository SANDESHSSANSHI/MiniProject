import express from 'express';
import { newConversation, getConversation } from '../controller/conversation-controller.js';
import { addUser, getUser } from '../controller/user-controller.js';
import { newMessage, getMessage } from '../controller/message-controller.js';
import { handleUpload, getFiles } from '../controller/image-controller.js';

const route = express.Router();

// User routes
route.post('/add', addUser); // Add a new user
route.get('/users', getUser); // Get all users

// Conversation routes
route.post('/conversation/add', newConversation); // Add a new conversation
route.post('/conversation/get', getConversation); // Get conversations

// Message routes
route.post('/message/add', newMessage); // Add a new message
route.get('/message/get/:id', getMessage); // Get message by ID

// File upload and retrieval routes
route.post('/upload', handleUpload); // Handle file uploads
route.get('/files/:userSub', getFiles); // Retrieve list of uploaded files for a specific user
route.get('/file/:filename', (req, res) => {
    gridfsBucket.openDownloadStreamByName(req.params.filename)
        .pipe(res)
        .on('error', () => res.status(404).json({ msg: 'File not found' }));
});

export default route;
