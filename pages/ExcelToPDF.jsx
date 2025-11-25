import React from 'react';
import UploadExcelToPdf from '../components/UploadExcelToPdf';

const ExcelToPdf = () => {
  return (
    <div className="tool-page">
      <header className="tool-header">
        <h1>Excel to PDF</h1>
        <p>Upload an Excel (.xlsx/.xls) or CSV file and convert it into a PDF.</p>
      </header>

      <main className="tool-container">
        <UploadExcelToPdf />
      </main>
    </div>
  );
};

export default ExcelToPdf;