import { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { AuthContext } from '../../../context/AuthContext';
import { SocketContext } from '../../../context/SocketContext';
import AlertButton from './AlertButton';

const containerStyle = {
  width: '100%',
  height: '80vh'
};

const AmbulanceDashboard = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(pos);
          
          // Update server with current location
          if (socket) {
            socket.emit('updateLocation', {
              userId: user._id,
              location: pos
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [socket, user]);

  const handleDestinationSelect = (e) => {
    const hospitalLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setDestination(hospitalLocation);
    
    // Calculate route
    if (window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentLocation,
          destination: hospitalLocation,
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
    <div className="dashboard">
      <h2>Ambulance Dashboard</h2>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation || { lat: 20.5937, lng: 78.9629 }} // Default to India
          zoom={15}
          onClick={handleDestinationSelect}
        >
          {currentLocation && <Marker position={currentLocation} />}
          {destination && <Marker position={destination} />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
      <AlertButton 
        isStuck={isStuck} 
        setIsStuck={setIsStuck} 
        currentLocation={currentLocation} 
      />
    </div>
  );
};

export default AmbulanceDashboard;