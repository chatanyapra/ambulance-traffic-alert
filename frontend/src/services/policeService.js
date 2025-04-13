import axios from 'axios';

const getAlerts = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`/alerts/police`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const resolveAlert = async (alertId) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`/alerts/${alertId}/resolve`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default {
  getAlerts,
  resolveAlert
};