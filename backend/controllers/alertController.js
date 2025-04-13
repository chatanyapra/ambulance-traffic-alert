import Alert from '../models/Alert.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Create new alert
// @route   POST /api/alerts
// @access  Private/Ambulance
export const createAlert = asyncHandler(async (req, res) => {
  const { location, destination } = req.body;

  if (!location || !destination) {
    res.status(400);
    throw new Error('Please provide location and destination');
  }

  // Find nearby police (within 3km)
  const police = await User.find({
    role: 'police',
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [location.lng, location.lat]
        },
        $maxDistance: 3000 // 3km
      }
    }
  });

  if (police.length === 0) {
    res.status(404);
    throw new Error('No police officers found nearby');
  }

  const alert = await Alert.create({
    ambulance: req.user.id,
    location: {
      type: 'Point',
      coordinates: [location.lng, location.lat]
    },
    destination: {
      type: 'Point',
      coordinates: [destination.lng, destination.lat]
    },
    status: 'active',
    assignedTo: police.map(p => p._id)
  });

  res.status(201).json(alert);
});

// @desc    Get alerts for police
// @route   GET /api/alerts/police
// @access  Private/Police
export const getPoliceAlerts = asyncHandler(async (req, res) => {
  const alerts = await Alert.find({
    assignedTo: req.user.id,
    status: 'active'
  }).populate('ambulance', 'name phone');

  res.status(200).json(alerts);
});

// @desc    Resolve alert
// @route   PUT /api/alerts/:id/resolve
// @access  Private/Police
export const resolveAlert = asyncHandler(async (req, res) => {
  const alert = await Alert.findById(req.params.id);

  if (!alert) {
    res.status(404);
    throw new Error('Alert not found');
  }

  if (!alert.assignedTo.includes(req.user.id)) {
    res.status(401);
    throw new Error('Not authorized to resolve this alert');
  }

  alert.status = 'resolved';
  alert.resolvedBy = req.user.id;
  await alert.save();

  res.status(200).json(alert);
});

// @desc    Get all alerts (admin only)
// @route   GET /api/alerts
// @access  Private/Admin
export const getAlerts = asyncHandler(async (req, res) => {
  const alerts = await Alert.find()
    .populate('ambulance', 'name phone')
    .populate('assignedTo', 'name phone')
    .populate('resolvedBy', 'name phone');

  res.status(200).json(alerts);
});