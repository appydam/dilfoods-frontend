import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

const API_BASE_URL = 'http://localhost:8080/api';

export const getBatches = () => api.get('/batches');
export const getBatchById = (batchId) => api.get(`/batches/${batchId}`);
export const createBatch = (batch) => api.post('/batches', batch);
export const getInventory = () => api.get('/inventory');
export const updateStock = async (itemId, newStock) => {
    try {
        // Sending a PUT request to update the stock
        const response = await api.put(`/inventory/${itemId}/stock`, null, {
            params: { newStock }, // Send newStock as a query parameter
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the response data for further processing
    } catch (error) {
        // Enhanced error handling
        console.error('Error updating stock:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : 'Failed to update stock');
    }
};
export const predictInventory = (data) => api.post('/ml/predict', data);

