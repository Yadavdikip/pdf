import React from 'react'
import UploadMergePdf from '../components/UploadMergePdf'
import '../styles/ToolPage.css'

const MergePDF = () => {
  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>Merge PDF</h1>
        <p>Combine multiple PDF files into one document in any order you want</p>
      </div>

      <div className="tool-container">
        <div className="upload-section">
          <UploadMergePdf />
        </div>

        <div className="info-section">
          <div className="info-card">
            <div>
              <h4>How to Merge PDF Files</h4>
              <ol>
                <li>Upload two or more PDF files</li>
                <li>Arrange the files in your preferred order using the arrows</li>
                <li>Remove any files you don't want to include</li>
                <li>Click "Merge PDFs" button</li>
                <li>Download your merged PDF file</li>
              </ol>
              <p><strong>Tip:</strong> You can merge multiple PDF files at once.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MergePDF;