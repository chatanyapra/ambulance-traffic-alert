import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/authRoutes.js';
import ambulanceRoutes from './routes/ambulanceRoutes.js';
import policeRoutes from './routes/policeRoutes.js';
import alertRoutes from './routes/alertRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
import connectDB from './config/db.js';
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ambulance', ambulanceRoutes);
app.use('/api/police', policeRoutes);
app.use('/api/alerts', alertRoutes);

// Socket.io connection
import setupSocket from './socket.js';
setupSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));