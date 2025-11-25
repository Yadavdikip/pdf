import React from 'react';
import UploadPdfToPowerPoint from '../components/UploadPdfToPowerPoint';
import '../styles/PdfToPptConverter.css';

const PDFToPowerPoint = () => {
  return (
    <div className="pdf-to-powerpoint-page">
      <h1>PDF to PowerPoint</h1>
      <p>Upload your PDF file to convert it to PowerPoint format.</p>
      <UploadPdfToPowerPoint />
    </div>
  );
};

export default PDFToPowerPoint;
