import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  deleteUser
} from '../controllers/authController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/users', protect, role('admin'), getUsers);
router.delete('/users/:id', protect, role('admin'), deleteUser); // Fixed parameter syntax

export default router;