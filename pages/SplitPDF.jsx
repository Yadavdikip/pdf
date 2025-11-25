import React from 'react'
import UploadSplitPdf from '../components/UploadSplitPdf'
import '../styles/ToolPage.css'

const SplitPDF = () => {
  // HMR trigger - no-op comment
  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>Split PDF</h1>
        <p>Split PDF documents into multiple files by page ranges or extract specific pages</p>
      </div>

      <div className="tool-container">
        <div className="upload-section">
          <UploadSplitPdf />
        </div>

        <div className="info-section">
          <div className="info-card">
            <div>
              <h4>How to Split PDF Files</h4>
              <ol>
                <li>Upload your PDF file</li>
                <li>Choose your preferred splitting method</li>
                <li>Configure the split options based on your selection</li>
                <li>Click "Split PDF" button</li>
                <li>Download your split PDF files as a ZIP archive</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplitPDF;