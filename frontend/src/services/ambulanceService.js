import axios from 'axios';

const updateLocation = async (locationData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`/ambulance/location`, locationData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const sendAlert = async (alertData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`/alerts`, alertData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export default {
  updateLocation,
  sendAlert
};