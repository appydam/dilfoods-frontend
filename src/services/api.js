import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

const API_BASE_URL = 'http://localhost:8080/api';

export const getBatches = () => api.get('/batches');
export const getBatchById = (batchId) => api.get(`/batches/${batchId}`);
export const createBatch = (batch) => api.post('/batches', batch);
export const createInventory = (inventoryData) => {
    return axios.post(`${API_BASE_URL}/inventory`, inventoryData);
};
export const getInventory = () => api.get('/inventory');
export const updateStock = async (itemId, newStock) => {
    try {
        const response = await api.put(`/inventory/${itemId}/stock`, null, {
            params: { newStock },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating stock:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : 'Failed to update stock');
    }
};
export const predictInventory = (data) => api.post('/ml/predict', data);

