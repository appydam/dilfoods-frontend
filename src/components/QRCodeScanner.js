import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { getBatchById } from '../services/api';

const QRCodeScannerComponent = () => {
    const [error, setError] = useState('');
    const [data, setData] = useState('No result');
    const videoRef = useRef(null);
    const codeReader = useRef(null);

    useEffect(() => {
        codeReader.current = new BrowserMultiFormatReader();

        const startScanner = async () => {
            try {
                const result = await codeReader.current.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
                    if (result) {
                        console.log('Scan Result:', result);
                        handleScan(result);
                    }
                    if (err) {
                        console.error('Scanning error:', err);
                    }
                });
                console.log(result);
            } catch (err) {
                console.error('Error starting scanner:', err);
                setError('Error starting scanner');
            }
        };

        startScanner();

        return () => {
            codeReader.current.reset();
        };
    }, []);

    const handleScan = async (result) => {
        if (result && result.text) {
            setData(result.text);
            console.log('Processed Scanned Data:', result.text);
            try {
                const { batchId } = JSON.parse(result.text);
                console.log('Parsed Batch ID:', batchId);
                const response = await getBatchById(batchId);
                alert(`Batch Details: ${JSON.stringify(response.data)}`);
            } catch (err) {
                console.error('Error fetching batch details:', err);
                setError('Failed to fetch batch details. Please check the QR code.');
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Scan QR Code</h2>
            <div className="h-80 border rounded bg-gray-200 flex items-center justify-center">
                <video ref={videoRef} className="w-full h-full" />
            </div>


            {data && <p className="mt-4">Result: {data}</p>}
        </div>
    );
};

export default QRCodeScannerComponent;
