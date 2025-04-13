import express from 'express';
import {
  updateLocation,
  getPolice
} from '../controllers/policeController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();

router.put('/location', protect, role('police'), updateLocation);
router.get('/', protect, role('admin'), getPolice);

export default router;