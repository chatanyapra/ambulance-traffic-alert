import axios from 'axios';

const register = async (userData) => {
  const response = await axios.post(`/auth/register`, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`/auth/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};

const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`/auth/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};

const deleteUser = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`/auth/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};

export default {
  register,
  login,
  getProfile,
  getAllUsers,
  deleteUser
};