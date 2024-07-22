// Import necessary modules
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server, io } from './socket/socket.js'; // Adjust the import path as needed

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Connect to MongoDB and start the server
server.listen(PORT, async () => {
  try {
    await connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
});

// Message delete route with Socket.io
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the message
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Remove message from the conversation
    await Conversation.findOneAndUpdate(
      { participants: { $all: [message.senderId, message.receiverId] } },
      { $pull: { messages: id } }
    );

    // Notify clients
    io.emit('messageDeleted', { messageId: id });

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
