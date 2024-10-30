import React, { useEffect, useState } from 'react';
import { getInventory, updateStock } from '../services/api';

const InventoryManagement = () => {
    const [inventory, setInventory] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [newStock, setNewStock] = useState('');

    // Fetch inventory items on component mount
    useEffect(() => {
        async function fetchInventory() {
            try {
                const { data } = await getInventory();
                setInventory(data);
            } catch (error) {
                console.error('Error fetching inventory:', error.response ? error.response.data : error.message);
            }
        }
        fetchInventory();
    }, []);

    // Handle stock update
    const handleUpdateStock = async (itemId) => {
        if (!newStock) {
            alert("Please enter a valid stock value.");
            return;
        }

        try {
            // Make the API call to update the stock
            const response = await updateStock(itemId, newStock);
            console.log('Stock updated successfully:', response.data);

            // Update the local inventory state
            setInventory(inventory.map(item =>
                item.itemId === itemId ? { ...item, currentStock: newStock } : item
            ));
            setEditItemId(null); // Exit edit mode
            setNewStock(''); // Clear input
        } catch (error) {
            console.error('Error updating stock:', error.response ? error.response.data : error.message);
            alert('Failed to update stock. Please check the console for more details.');
        }
    };

    return (
        <div className="p-6 bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Inventory Management</h2>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 border-b">Item ID</th>
                        <th className="py-2 border-b">Batch ID</th>
                        <th className="py-2 border-b">Current Stock</th>
                        <th className="py-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.itemId} className="border-t">
                            <td className="p-2 border">{item.itemId}</td>
                            <td className="p-2 border">{item.batchId}</td>
                            <td className="p-2 border">
                                {editItemId === item.itemId ? (
                                    <input
                                        type="number"
                                        value={newStock}
                                        onChange={(e) => setNewStock(e.target.value)}
                                        className="p-1 border rounded"
                                    />
                                ) : (
                                    item.currentStock
                                )}
                            </td>
                            <td className="p-2 border">
                                {editItemId === item.itemId ? (
                                    <button
                                        onClick={() => handleUpdateStock(item.itemId)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEditItemId(item.itemId);
                                            setNewStock(item.currentStock);
                                        }}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryManagement;
