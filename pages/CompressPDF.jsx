import React from 'react';
import UploadCompressPdf from '../components/UploadCompressPdf';

const CompressPDF = () => {
  return (
    <div className="tool-page">
      <header className="tool-header">
        <h1>Compress PDF</h1>
        <p>Upload a PDF and reduce its file size.</p>
      </header>

      <main className="tool-container">
        <UploadCompressPdf />
      </main>
    </div>
  );
};

export default CompressPDF;