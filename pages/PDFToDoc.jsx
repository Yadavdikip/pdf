import React from 'react'
import UploadPdfToDoc from '../components/UploadPdfToDoc'


const PDFToDoc = () => {
  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>PDF to DOC Converter</h1>
        <p>Convert your PDF documents to editable DOC files with perfect formatting</p>
      </div>

      <div className="tool-container">
        <div className="upload-section">
          <UploadPdfToDoc />
        </div>

        <div className="info-section">
          <div className="info-card">
            <div>
              <h4>How to use PDF to DOC Converter</h4>
              <ol>
                <li>Upload your PDF file by dragging or clicking</li>
                <li>Adjust conversion settings if needed</li>
                <li>Click "Convert to DOC" button</li>
                <li>Download your converted DOC file</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PDFToDoc
