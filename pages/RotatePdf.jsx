import React from 'react'
import UploadRotatePdf from '../components/UploadRotatePdf'


const RotatePdf = () => {
  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>Rotate PDF</h1>
        <p>Rotate PDF pages by 90, 180, or 270 degrees to change their orientation</p>
      </div>

      <div className="tool-container">
        <div className="upload-section">
          <UploadRotatePdf />
        </div>

        <div className="info-section">
          <div className="info-card">
            <div>
              <h4>How to Rotate PDF Files</h4>
              <ol>
                <li>Upload your PDF file</li>
                <li>Select the rotation angle (90°, 180°, or 270°)</li>
                <li>Click "Convert Rotation" to apply the rotation</li>
                <li>Wait for the rotation to complete</li>
                <li>Download your rotated PDF file</li>
              </ol>
              <p><strong>Note:</strong> Rotation is applied to all pages in the PDF. The rotation angle is clockwise.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RotatePdf
