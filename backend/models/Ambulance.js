import mongoose from 'mongoose';

const AmbulanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  status: {
    type: String,
    enum: ['available', 'on-duty', 'emergency'],
    default: 'available'
  },
  hospital: {
    type: String
  },
  lastAlert: {
    type: Date
  }
}, {
  timestamps: true
});

AmbulanceSchema.index({ location: '2dsphere' });

export default mongoose.model('Ambulance', AmbulanceSchema);