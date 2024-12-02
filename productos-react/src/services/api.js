import axios from 'axios';

const API_URL = 'https://productoapp-f3cmatc6gfhzawg3.canadacentral-01.azurewebsites.net/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: 'admin', 
    password: 'adminpassword',
  },
  withCredentials: true,
});

export default api;
