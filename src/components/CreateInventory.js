import React, { useState } from 'react';
import { createInventory } from '../services/api';

const CreateInventory = () => {
    const [inventoryData, setInventoryData] = useState({
        itemId: '',
        batchId: '',
        currentStock: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryData({
            ...inventoryData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createInventory(inventoryData);
            alert('Inventory item created successfully!');
            setInventoryData({ itemId: '', batchId: '', currentStock: 0 }); // Reset form
        } catch (error) {
            console.error('Error creating inventory:', error);
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded-md">
            <h2 className="text-xl font-bold mb-4">Create Inventory</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Item ID</label>
                    <input
                        type="text"
                        name="itemId"
                        value={inventoryData.itemId}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Batch ID</label>
                    <input
                        type="text"
                        name="batchId"
                        value={inventoryData.batchId}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Current Stock</label>
                    <input
                        type="number"
                        name="currentStock"
                        value={inventoryData.currentStock}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
                    Create Inventory
                </button>
            </form>
        </div>
    );
};

export default CreateInventory;
