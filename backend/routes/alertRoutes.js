import express from 'express';
import {
  createAlert,
  getPoliceAlerts,
  resolveAlert,
  getAlerts
} from '../controllers/alertController.js';
import { protect, role } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, role('ambulance'), createAlert);
router.get('/police', protect, role('police'), getPoliceAlerts);
router.put('/:id/resolve', protect, role('police'), resolveAlert);
router.get('/', protect, role('admin'), getAlerts);

export default router;