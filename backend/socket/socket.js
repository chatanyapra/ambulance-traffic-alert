export default function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Handle location updates
        socket.on('updateLocation', async (data) => {
            try {
                // Update user location in database
                await User.findByIdAndUpdate(data.userId, {
                    location: {
                        type: 'Point',
                        coordinates: [data.location.lng, data.location.lat]
                    }
                });
            } catch (error) {
                console.error('Error updating location:', error);
            }
        });

        // Handle ambulance alerts
        socket.on('sendAlert', async (data) => {
            try {
                // Find nearby police (within 3km)
                const police = await User.find({
                    role: 'police',
                    location: {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: [data.location.lng, data.location.lat]
                            },
                            $maxDistance: 3000 // 3km
                        }
                    }
                });

                // Create alert in database
                const alert = new Alert({
                    ambulance: data.userId,
                    location: data.location,
                    destination: data.destination,
                    status: 'active',
                    assignedTo: police.map(p => p._id)
                });
                await alert.save();

                // Notify police
                police.forEach(p => {
                    io.to(p._id.toString()).emit('newAlert', alert);
                });
            } catch (error) {
                console.error('Error handling alert:', error);
            }
        });

        // Handle alert resolution
        socket.on('resolveAlert', async (data) => {
            try {
                const alert = await Alert.findByIdAndUpdate(data.alertId, {
                    status: 'resolved',
                    resolvedBy: data.userId
                }, { new: true });

                // Notify ambulance
                io.to(alert.ambulance.toString()).emit('alertResolved', alert);
            } catch (error) {
                console.error('Error resolving alert:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}