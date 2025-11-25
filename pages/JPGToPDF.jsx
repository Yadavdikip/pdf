import React from 'react';
import UploadJpgToPdf from '../components/UploadJpgToPdf';


const JPGToPDF = () => {
  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>JPG to PDF Converter</h1>
        <p>Convert your JPG, PNG, and WebP images to PDF documents with customizable settings</p>
      </div>

      <UploadJpgToPdf />
    </div>
  );
};

export default JPGToPDF;
