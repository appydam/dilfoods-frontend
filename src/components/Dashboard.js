import React, { useEffect, useState } from 'react';
import { getInventory } from '../services/api';

const Dashboard = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        async function fetchInventory() {
            const { data } = await getInventory();
            setInventory(data);
        }
        fetchInventory();
    }, []);

    return (
        <div className="p-6 bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Inventory Dashboard</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Item ID</th>
                        <th className="py-2">Batch ID</th>
                        <th className="py-2">Current Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.itemId} className="border-t">
                            <td className="p-2">{item.itemId}</td>
                            <td className="p-2">{item.batchId}</td>
                            <td className="p-2">{item.currentStock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
