import Ambulance from '../models/Ambulance.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Update ambulance location
// @route   PUT /api/ambulance/location
// @access  Private/Ambulance
export const updateLocation = asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        res.status(400);
        throw new Error('Please provide latitude and longitude');
    }

    // Update user location
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

    // Update or create ambulance record
    let ambulance = await Ambulance.findOne({ user: req.user.id });

    if (!ambulance) {
        ambulance = await Ambulance.create({
            user: req.user.id,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        });
    } else {
        ambulance.location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
        await ambulance.save();
    }

    res.status(200).json({
        success: true,
        location: ambulance.location
    });
});

// @desc    Get all ambulances (admin only)
// @route   GET /api/ambulance
// @access  Private/Admin
export const getAmbulances = asyncHandler(async (req, res) => {
    const ambulances = await Ambulance.find()
        .populate('user', 'name email phone');

    res.status(200).json(ambulances);
});