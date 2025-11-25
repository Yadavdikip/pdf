import React from 'react';
import UploadPdfToExcel from '../components/UploadPdfToExcel';

const PdfToExcel = () => {
  return (
    <div className="tool-page">
      <header className="tool-header">
        <h1>PDF to Excel</h1>
        <p>Upload a PDF to convert it into an Excel file.</p>
      </header>

      <main className="tool-container">
        <UploadPdfToExcel />
      </main>
    </div>
  );
};

export default PdfToExcel;