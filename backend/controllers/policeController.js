import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Update police location
// @route   PUT /api/police/location
// @access  Private/Police
export const updateLocation = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    res.status(400);
    throw new Error('Please provide latitude and longitude');
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    location: user.location
  });
});

// @desc    Get all police (admin only)
// @route   GET /api/police
// @access  Private/Admin
export const getPolice = asyncHandler(async (req, res) => {
  const police = await User.find({ role: 'police' })
    .select('-password');
  
  res.status(200).json(police);
});