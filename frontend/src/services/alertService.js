import axios from 'axios';

const getAllAlerts = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`/api/alerts`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default {
  getAllAlerts
};