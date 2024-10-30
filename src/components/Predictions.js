import React, { useState } from 'react';
import { predictInventory } from '../services/api';

const Predictions = () => {
    const [date, setDate] = useState('');
    const [hourOfDay, setHourOfDay] = useState(0);
    const [currentStock, setCurrentStock] = useState(0);
    const [prediction, setPrediction] = useState(null);

    const handlePredict = async () => {
        const data = { date, hourOfDay, currentStock };
        const response = await predictInventory(data);
        setPrediction(response.data.predicted_stock);
    };

    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Predict Future Inventory Needs</h2>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 border rounded mb-2"
            />
            <input
                type="number"
                placeholder="Hours of day"
                value={hourOfDay}
                onChange={(e) => setHourOfDay(e.target.value)}
                className="p-2 border rounded mb-2"
            />
            <input
                type="number"
                placeholder="Current Stock"
                value={currentStock}
                onChange={(e) => setCurrentStock(e.target.value)}
                className="p-2 border rounded mb-2"
            />
            <button onClick={handlePredict} className="px-4 py-2 bg-blue-600 text-white rounded">
                Predict
            </button>
            {prediction && <p className="mt-4">Predicted Stock: {prediction}</p>}
        </div>
    );
};

export default Predictions;
