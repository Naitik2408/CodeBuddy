import axios from '../services/axiosInstance';

const authService = {
  register: (userData) => axios.post('/api/users/register', userData), // Fixed endpoint
  login: (userData) => axios.post('/api/users/login', userData), // Fixed endpoint
};

export default authService;