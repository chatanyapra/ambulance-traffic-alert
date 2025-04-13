import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Emergency Ambulance Alert System
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Helping ambulances navigate through traffic faster with real-time police coordination
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        {!isAuthenticated ? (
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-blue-100 hover:bg-blue-200"
            >
              Register
            </Link>
          </div>
        ) : (
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Go to Dashboard
          </Link>
        )}
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-blue-600 mb-4">
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Real-time Alerts</h3>
          <p className="mt-2 text-gray-500">
            Instant notifications to nearby traffic police when an ambulance is stuck
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-blue-600 mb-4">
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Live Tracking</h3>
          <p className="mt-2 text-gray-500">
            Precise GPS tracking of ambulances and their routes
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-blue-600 mb-4">
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Fast Response</h3>
          <p className="mt-2 text-gray-500">
            Reduced emergency response times through coordinated traffic clearance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;