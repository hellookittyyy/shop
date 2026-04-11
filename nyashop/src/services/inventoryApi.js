import axios from 'axios';
const BASE_URL = ''; 
const api = axios.create({
  baseURL: BASE_URL,
});
export const inventoryApi = {
  getInventory: async () => {
    const response = await api.get('/inventory');
    return response.data;
  },
  getItem: async (id) => {
    const response = await api.get(`/inventory/${id}`);
    return response.data;
  },
  createItem: async (formData) => {
    const response = await api.post('/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  updateItemText: async (id, data) => {
    const response = await api.put(`/inventory/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
  updateItemPhoto: async (id, formData) => {
    const response = await api.put(`/inventory/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteItem: async (id) => {
    const response = await api.delete(`/inventory/${id}`);
    return response.data;
  },
  getPhotoUrl: (photoPath) => {
    if (!photoPath) return null;
    return photoPath;
  }
};
