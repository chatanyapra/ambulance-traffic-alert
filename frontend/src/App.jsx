import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AmbulanceDashboard from './components/dashboard/ambulance/AmbulanceDashboard';
import PoliceDashboard from './components/dashboard/police/PoliceDashboard';
import AdminDashboard from './components/dashboard/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="py-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                  <Route path="ambulance" element={<PrivateRoute roles={['ambulance']}><AmbulanceDashboard /></PrivateRoute>} />
                  <Route path="police" element={<PrivateRoute roles={['police']}><PoliceDashboard /></PrivateRoute>} />
                  <Route path="admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
                </Route>
              </Routes>
            </main>
          </div>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;