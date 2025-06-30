import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const DashboardService = {
  getAllStats: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/users/all-data`, {
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  getActivityLogs: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/users/logs`, {
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      throw error;
    }
  },

  getUserLessonProgress: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('https://lioness-fun-singularly.ngrok-free.app/api/lessons/userProgress', {
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "true",
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user lesson progress:', error);
      throw error;
    }
  }
}; 