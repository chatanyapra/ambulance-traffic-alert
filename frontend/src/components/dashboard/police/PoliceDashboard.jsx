import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { SocketContext } from '../../../context/SocketContext';
import Map from '../../common/Map';
import AlertList from './AlertList';

const PoliceDashboard = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [alerts, setAlerts] = useState([]);
  const [activeAlert, setActiveAlert] = useState(null);

  useEffect(() => {
    // Listen for alerts
    if (socket) {
      socket.on('newAlert', (alert) => {
        setAlerts(prev => [...prev, alert]);
      });

      return () => {
        socket.off('newAlert');
      };
    }
  }, [socket]);

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

  const getMarkers = () => {
    const markers = [];
    
    if (activeAlert) {
      markers.push({
        position: {
          lat: activeAlert.location.coordinates[1],
          lng: activeAlert.location.coordinates[0]
        },
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        }
      });
      
      markers.push({
        position: {
          lat: activeAlert.destination.coordinates[1],
          lng: activeAlert.destination.coordinates[0]
        },
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        }
      });
    }
    
    return markers;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Police Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Map 
            showCurrentLocation={true}
            markers={getMarkers()}
            style={{ height: '500px' }}
            showControls={true}
          />
        </div>
        
        <div>
          <AlertList 
            alerts={alerts} 
            onAlertClick={handleAlertClick} 
            activeAlert={activeAlert}
            onResolve={handleResolveAlert}
          />
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;