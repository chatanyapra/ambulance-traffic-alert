const AlertList = ({ alerts, onAlertClick, activeAlert, onResolve }) => {
    return (
      <div className="mt-4 bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Active Alerts
          </h3>
        </div>
        
        {alerts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No active alerts
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {alerts.map((alert) => (
              <li 
                key={alert._id} 
                className={`p-4 hover:bg-gray-50 cursor-pointer ${activeAlert?._id === alert._id ? 'bg-blue-50' : ''}`}
                onClick={() => onAlertClick(alert)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Ambulance in distress
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(alert.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Urgent
                  </span>
                </div>
                {activeAlert?._id === alert._id && (
                  <div className="mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onResolve();
                      }}
                      className="w-full inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Mark as Resolved
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default AlertList;