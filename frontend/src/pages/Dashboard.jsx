import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;