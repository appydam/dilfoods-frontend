// import React, { useState } from 'react';
// import { createBatch } from '../services/api';
// import axios from 'axios';

// const QRCodeGenerator = () => {
//     const [batchData, setBatchData] = useState({
//         batchId: '',
//         productId: '',
//         receivedDate: '',
//         quantity: ''
//     });
//     const [qrCodeUrl, setQrCodeUrl] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setBatchData({ ...batchData, [name]: value });
//     };

//     const handleGenerateQRCode = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         try {
//             // const response = await createBatch(batchData);
//             // const batchId = response.data.batchId; // Get batchId from response
//             // setQrCodeUrl(`http://localhost:8080/api/qrcodes/${batchId}`); // Construct the QR code URL
//             // setQrCodeUrl(response.data.qrCodeUrl);

//             const response = await axios.post('http://localhost:8080/api/batches', batchData);
//             const batchId = response.data.batchId;

//             // Step 2: Fetch the QR code image using the batch ID
//             const qrCodeResponse = await axios.get(`http://localhost:8080/api/qrcodebaby/${batchId}`, { responseType: 'blob' });
//             const url = URL.createObjectURL(qrCodeResponse.data); // Create a URL for the QR code image

//             setQrCodeUrl(url); // Set the QR code URL state

//         } catch (error) {
//             console.error('Error generating QR code:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="p-6 bg-gray-50 rounded-md shadow-md">
//             <h2 className="text-xl font-bold mb-4">Generate QR Code</h2>
//             <form onSubmit={handleGenerateQRCode} className="space-y-4">
//                 <input
//                     type="text"
//                     name="batchId"
//                     value={batchData.batchId}
//                     onChange={handleInputChange}
//                     placeholder="Batch ID"
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="text"
//                     name="productId"
//                     value={batchData.productId}
//                     onChange={handleInputChange}
//                     placeholder="Product ID"
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="datetime-local"
//                     name="receivedDate"
//                     value={batchData.receivedDate}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="number"
//                     name="quantity"
//                     value={batchData.quantity}
//                     onChange={handleInputChange}
//                     placeholder="Quantity"
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 <button
//                     type="submit"
//                     className="w-full py-2 bg-blue-500 text-white rounded"
//                     disabled={isLoading}
//                 >
//                     {isLoading ? 'Generating...' : 'Generate QR Code'}
//                 </button>
//             </form>

//             {qrCodeUrl && (
//                 <div className="mt-4">
//                     <p className="font-semibold">QR Code URL:</p>
//                     <a href={qrCodeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
//                         {qrCodeUrl}
//                     </a>

//                     {/* <img src={qrCodeUrl} alt="Generated QR Code" className="mt-2 border p-2" /> */}
//                 </div>
//             )}
//             {/* Display the QR code image */}
//             {qrCodeUrl && <img src={qrCodeUrl} alt="Generated QR Code" className="mt-2 border p-2" />}
//         </div>
//     );
// };

// export default QRCodeGenerator;
import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported

const QRCodeGenerator = () => {
    const [batchData, setBatchData] = useState({ batchId: '', productId: '', receivedDate: '', quantity: 0 });
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateQRCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Reset error state before starting

        try {
            // Step 1: Create the batch and get the batch ID
            const response = await axios.post('http://localhost:8080/api/batches', batchData);
            const batchId = response.data.batchId;

            // Step 2: Fetch the QR code image using the batch ID
            const qrCodeResponse = await axios.get(`http://localhost:8080/api/batches/qrcodebaby/${batchId}`, { responseType: 'blob' });
            const url = URL.createObjectURL(qrCodeResponse.data); // Create a URL for the QR code image

            setQrCodeUrl(url); // Set the QR code URL state
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
