import axiosInstance from './axiosConfig';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

const getAuthHeader = () => {
  const token = getAuthToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const RestaurantsService = {
  getAllRestaurants: async () => {
    try {
      console.log('Fetching all restaurants...');
      const response = await axiosInstance.get('/restaurants');
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw error;
    }
  },

  createRestaurant: async (restaurantData) => {
    try {
      console.log('Creating restaurant...', restaurantData);
      const response = await axiosInstance.post('/restaurants/create', restaurantData);
      return response.data;
    } catch (error) {
      console.error('Error creating restaurant:', error);
      throw error;
    }
  },

  updateRestaurant: async (restaurantId, restaurantData) => {
    try {
      console.log('Updating restaurant...', { restaurantId, restaurantData });
      const response = await axiosInstance.put(`/restaurants/${restaurantId}`, restaurantData);
      return response.data;
    } catch (error) {
      console.error('Error updating restaurant:', error);
      throw error;
    }
  },

  searchData: async () => {
    try {
      const response = await axiosInstance.get('/users/searchData');
      return response.data;
    } catch (error) {
      console.error('Error fetching search data:', error);
      throw error;
    }
  }
}; 