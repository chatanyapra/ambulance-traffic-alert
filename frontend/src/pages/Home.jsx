import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const features = [
    {
      title: "Real-time Alerts",
      description: "Instant notifications to nearby traffic police when an ambulance is stuck",
      icon: (
        <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
        </svg>
      ),
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Live Tracking",
      description: "Precise GPS tracking of ambulances and their routes",
      icon: (
        <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Fast Response",
      description: "Reduced emergency response times through coordinated traffic clearance",
      icon: (
        <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block">Emergency</span>
            <span className="block text-blue-600">Ambulance Alert System</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-600">
            Revolutionizing emergency response with real-time coordination between ambulances and traffic police
          </p>
          
          <div className="mt-10 flex justify-center">
            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
                  >
                    Get Started
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-blue-700 bg-white hover:bg-gray-50 transition-all duration-300"
                  >
                    Create Account
                  </Link>
                </motion.div>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all duration-300"
                >
                  Go to Dashboard
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-2xl shadow-lg transition-all duration-300 ${feature.color} bg-opacity-50 hover:bg-opacity-70`}
              >
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-full ${feature.color} bg-opacity-30`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-lg text-center text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">50%</div>
              <div className="mt-2 text-lg font-medium text-gray-600">Faster Response Times</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600">24/7</div>
              <div className="mt-2 text-lg font-medium text-gray-600">Emergency Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600">100+</div>
              <div className="mt-2 text-lg font-medium text-gray-600">Lives Saved Daily</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;