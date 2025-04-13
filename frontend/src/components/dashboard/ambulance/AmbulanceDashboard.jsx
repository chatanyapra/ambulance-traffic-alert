import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { SocketContext } from '../../../context/SocketContext';
import Map from '../../common/Map';
import AlertButton from './AlertButton';

const AmbulanceDashboard = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [isStuck, setIsStuck] = useState(false);

  const handleDestinationSelect = (location) => {
    setDestination(location);
    
    // Calculate route if we have current location (handled by Map component)
    if (window.google && location) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: location, // Map component will update this
          destination: location,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Ambulance Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Map 
            showCurrentLocation={true}
            onMapClick={handleDestinationSelect}
            directions={directions}
            style={{ height: '500px' }}
            showControls={true}
          />
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Emergency Information</h3>
            {destination && (
              <p className="text-sm text-gray-600">
                Destination set: {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}
              </p>
            )}
          </div>
          
          <AlertButton 
            isStuck={isStuck} 
            setIsStuck={setIsStuck} 
            destination={destination}
          />
        </div>
      </div>
    </div>
  );
};

export default AmbulanceDashboard;