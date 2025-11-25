import React from 'react'
import UploadPdfToWord from '../components/UploadPdfToWord'
import '../styles/ToolPage.css'

const PDFToWord = () => {
  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>PDF to Word Converter</h1>
        <p>Convert your PDF documents to editable Word files with perfect formatting</p>
      </div>

      <div className="tool-container">
        <div className="upload-section">
          <UploadPdfToWord />
        </div>

        <div className="info-section">
          <div className="info-card">
            <div>
              <h4>How to use PDF to Word Converter</h4>
              <ol>
                <li>Upload your PDF file by dragging or clicking</li>
                <li>Adjust conversion settings if needed</li>
                <li>Click "Convert to Word" button</li>
                <li>Download your converted Word file</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PDFToWord