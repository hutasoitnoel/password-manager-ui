import { performOCR } from '../../helper/axiosHelper';
import React, { useState } from 'react';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>('');
    const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setStatus('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            setStatus('Uploading...');
            const response: any = await performOCR(formData);

            console.log(response)

            setStatus('File uploaded and processed successfully.');
            setProcessedImageUrl(response.processedImage); // Save processed image URL
        } catch (error: any) {
            setStatus(`Error: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h1>Image Upload and Processing</h1>
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                style={{ marginBottom: '10px' }}
            />
            <button onClick={handleUpload} style={{ display: 'block', marginBottom: '10px' }}>
                Upload
            </button>
            {status && <p>{status}</p>}
            {processedImageUrl && (
                <div>
                    <h2>Processed Image:</h2>
                    <img
                        src={`http://localhost:3000${processedImageUrl}`}
                        alt="Processed"
                        style={{ maxWidth: '100%' }}
                    />
                </div>
            )}
        </div>
    );
};

export default FileUpload;
