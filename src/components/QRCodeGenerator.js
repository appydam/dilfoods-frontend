import React, { useState } from 'react';
import axios from 'axios';

const QRCodeGenerator = () => {
    const [batchData, setBatchData] = useState({ batchId: '', productId: '', receivedDate: '', quantity: 0 });
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateQRCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/batches', batchData);
            const batchId = response.data.batchId;

            const qrCodeResponse = await axios.get(`http://localhost:8080/api/batches/qrcodebaby/${batchId}`, { responseType: 'blob' });
            const url = URL.createObjectURL(qrCodeResponse.data);

            setQrCodeUrl(url);
        } catch (error) {
            console.error('Error generating QR code:', error);
            setError('Error generating QR code. Please try again.'); // Set error message
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4">
            <div className="p-6 bg-gray-50 rounded-md shadow-md">
                <h2 className="text-xl font-bold mb-4">Create a new Batch</h2>
                <form onSubmit={handleGenerateQRCode} className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Batch ID"
                        onChange={(e) => setBatchData({ ...batchData, batchId: e.target.value })}
                        required
                        className="mb-2 border p-2"
                    />
                    <input
                        type="text"
                        placeholder="Product ID"
                        onChange={(e) => setBatchData({ ...batchData, productId: e.target.value })}
                        required
                        className="mb-2 border p-2"
                    />
                    <input
                        type="datetime-local"
                        onChange={(e) => setBatchData({ ...batchData, receivedDate: e.target.value })}
                        required
                        className="mb-2 border p-2"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        onChange={(e) => setBatchData({ ...batchData, quantity: +e.target.value })}
                        required
                        className="mb-2 border p-2"
                    />
                    <button type="submit" disabled={isLoading} className="bg-blue-500 text-white p-2">
                        {isLoading ? 'Generating...' : 'Generate QR Code'}
                    </button>

                </form>
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Display the QR code image */}
            {qrCodeUrl && <img src={qrCodeUrl} alt="Generated QR Code" className="mt-4 border p-2" />}
        </div>
    );
};

export default QRCodeGenerator;
