import { useState, useContext } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import { AuthContext } from '../../../context/AuthContext';

const AlertButton = ({ isStuck, setIsStuck, currentLocation }) => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState(null);

  const handleSendAlert = () => {
    if (!currentLocation || !destination) return;
    
    socket.emit('sendAlert', {
      userId: user._id,
      location: currentLocation,
      destination: destination
    });
    setIsStuck(true);
  };

  const handleCancelAlert = () => {
    setIsStuck(false);
    // You might want to emit a cancel alert event to the server
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Emergency Alert</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Destination</label>
        <input
          type="text"
          placeholder="Enter hospital name or address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      {!isStuck ? (
        <button
          onClick={handleSendAlert}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Send Emergency Alert
        </button>
      ) : (
        <div className="space-y-2">
          <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>Emergency alert active! Police have been notified.</p>
          </div>
          <button
            onClick={handleCancelAlert}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel Alert
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertButton;