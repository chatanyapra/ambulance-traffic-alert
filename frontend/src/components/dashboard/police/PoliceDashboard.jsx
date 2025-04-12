import { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { AuthContext } from '../../../context/AuthContext';
import { SocketContext } from '../../../context/SocketContext';
import AlertList from './AlertList';

const containerStyle = {
  width: '100%',
  height: '80vh'
};

const PoliceDashboard = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [activeAlert, setActiveAlert] = useState(null);

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

    // Listen for alerts
    if (socket) {
      socket.on('newAlert', (alert) => {
        setAlerts(prev => [...prev, alert]);
      });
    }

    return () => {
      if (socket) {
        socket.off('newAlert');
      }
    };
  }, [socket, user]);

  const handleAlertClick = (alert) => {
    setActiveAlert(alert);
  };

  const handleResolveAlert = () => {
    if (socket && activeAlert) {
      socket.emit('resolveAlert', { alertId: activeAlert._id });
      setAlerts(prev => prev.filter(a => a._id !== activeAlert._id));
      setActiveAlert(null);
    }
  };

  return (
    <div className="dashboard">
      <h2>Police Dashboard</h2>
      <div className="dashboard-content">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation || { lat: 20.5937, lng: 78.9629 }}
            zoom={15}
          >
            {currentLocation && <Marker position={currentLocation} />}
            {activeAlert && (
              <>
                <Marker 
                  position={activeAlert.location} 
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                  }} 
                />
                <Marker 
                  position={activeAlert.destination} 
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                  }} 
                />
              </>
            )}
          </GoogleMap>
        </LoadScript>
        <AlertList 
          alerts={alerts} 
          onAlertClick={handleAlertClick} 
          activeAlert={activeAlert}
          onResolve={handleResolveAlert}
        />
      </div>
    </div>
  );
};

export default PoliceDashboard;