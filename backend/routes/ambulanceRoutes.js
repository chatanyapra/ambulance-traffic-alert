import express from 'express';
import { protect, role } from '../middleware/auth.js';
import { getAmbulances, updateLocation } from '../controllers/ambulanceController.js';

const router = express.Router();

router.put('/location', protect, role('ambulance'), updateLocation);
router.get('/', protect, role('admin'), getAmbulances);

export default router;