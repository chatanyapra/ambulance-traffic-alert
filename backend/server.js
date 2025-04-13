import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes imports
import authRoutes from './routes/authRoutes.js';
import ambulanceRoutes from './routes/ambulanceRoutes.js';
import policeRoutes from './routes/policeRoutes.js';
import alertRoutes from './routes/alertRoutes.js';

// Config
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
import connectDB from './config/db.js';
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/ambulance', ambulanceRoutes);
app.use('/api/police', policeRoutes);
app.use('/api/alerts', alertRoutes);

// Serve frontend in production
// Remove this block completely:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Socket.io connection
import setupSocket from './socket/socket.js';
setupSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});