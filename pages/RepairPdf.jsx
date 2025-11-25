import React from 'react'
import UploadRepairPdf from '../components/UploadRepairPdf'


const RepairPdf = () => {
  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>Repair PDF</h1>
        <p>Fix corrupted or damaged PDF files and restore their functionality</p>
      </div>

      <div className="tool-container">
        <div className="upload-section">
          <UploadRepairPdf />
        </div>

        <div className="info-section">
          <div className="info-card">
            <div>
              <h4>How to Repair PDF Files</h4>
              <ol>
                <li>Upload your damaged or corrupted PDF file</li>
                <li>Click "Convert Repair PDF" to start the repair process</li>
                <li>Wait for the repair to complete</li>
                <li>Download your repaired PDF file</li>
              </ol>
              <p><strong>Note:</strong> This tool attempts to fix common PDF issues like corrupted structure, broken fonts, and damaged elements. Not all PDF corruption can be repaired.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepairPdf
