import { useState, useEffect } from 'react';
import Map from '../../common/Map';
import UserManagement from './UserManagement';
// import useAuth from '../../../hooks/useAuth';
import ambulanceService from '../../../services/ambulanceService';
import policeService from '../../../services/policeService';

const AdminDashboard = () => {
  // const { user } = useAuth();
  const [ambulances, setAmbulances] = useState([]);
  const [police, setPolice] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ambulanceRes, policeRes] = await Promise.all([
          ambulanceService.getAllAmbulances(),
          policeService.getAllPolice()
        ]);
        setAmbulances(ambulanceRes.data);
        setPolice(policeRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getMapMarkers = () => {
    const markers = [];
    
    ambulances.forEach(ambulance => {
      markers.push({
        position: {
          lat: ambulance.location.coordinates[1],
          lng: ambulance.location.coordinates[0]
        },
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        },
        label: 'A'
      });
    });
    
    police.forEach(officer => {
      if (officer.location?.coordinates) {
        markers.push({
          position: {
            lat: officer.location.coordinates[1],
            lng: officer.location.coordinates[0]
          },
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          },
          label: 'P'
        });
      }
    });
    
    return markers;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">System Overview</h3>
        <div className="h-96">
          <Map 
            markers={getMapMarkers()}
            showControls={true}
          />
        </div>
      </div>
      
      <UserManagement />
    </div>
  );
};

export default AdminDashboard;