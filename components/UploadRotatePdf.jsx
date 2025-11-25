import React, { useState, useRef } from 'react';
import { useFileConversion } from '../hooks/useFileConversion';
import '../styles/RotatePdf.css';

const RotatePdf = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [rotatedPdf, setRotatedPdf] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const dropboxRef = useRef(null);
  const { convert, isConverting } = useFileConversion();

  const handlePdfSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedPdf({
        name: file.name,
        size: file.size,
        file: file,
        status: 'selected'
      });
      setRotatedPdf(null);
      setError(null);
      setRotation(0);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const handleDriveClick = () => {
    alert('Google Drive integration would open here');
  };

  const handleDropboxClick = () => {
    dropboxRef.current?.click();
  };

  const handleRotateLeft = () => {
    if (selectedPdf) {
      const newRotation = (rotation - 90) % 360;
      setRotation(newRotation);
      setRotatedPdf({
        ...selectedPdf,
        rotation: newRotation
      });
    } else {
      alert('Please select a PDF file first');
    }
  };

  const handleRotateRight = () => {
    if (selectedPdf) {
      const newRotation = (rotation + 90) % 360;
      setRotation(newRotation);
      setRotatedPdf({
        ...selectedPdf,
        rotation: newRotation
      });
    } else {
      alert('Please select a PDF file first');
    }
  };

  const handleConvertRotation = async () => {
    if (selectedPdf && rotation !== 0) {
      setIsRotating(true);
      setError(null);
      try {
        await convert(selectedPdf.file, 'rotate-pdf', { rotation });
        setRotatedPdf({
          ...selectedPdf,
          status: 'rotated',
          rotatedAt: new Date().toLocaleString()
        });
      } catch (err) {
        setError(err.message);
        alert(`Rotation failed: ${err.message}`);
      } finally {
        setIsRotating(false);
      }
    } else if (rotation === 0) {
      alert('Please select a rotation angle first');
    } else {
      alert('Please select a PDF file first');
    }
  };

  const handleDownload = () => {
    if (rotatedPdf) {
      const link = document.createElement('a');
      link.href = rotatedPdf.url;
      link.download = `rotated-${rotatedPdf.name}`;
      link.click();
    } else {
      alert('No rotated PDF available for download');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="rotate-pdf-container">
      {/* Header */}
      
    
         
   

      <div className="main-content">
        {/* Left Side - PDF Selection and Preview */}
        <div className="left-section">
          {/* Select PDF Dropbox */}
          <div className="select-pdf-section">
            <div 
              className="dropbox"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="dropbox-content">
                <span className="dropbox-icon">📄</span>
                <p>Select PDF</p>
                <p className="dropbox-hint">Click here or drag and drop PDF files</p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePdfSelect}
                accept=".pdf,application/pdf"
                style={{ display: 'none' }}
              />
              <input
                type="file"
                ref={dropboxRef}
                onChange={handlePdfSelect}
                accept=".pdf,application/pdf"
                style={{ display: 'none' }}
              />
            </div>

            {/* Drive and Dropbox Buttons */}
            <div className="cloud-buttons">
              <button className="cloud-btn drive-btn" onClick={handleDriveClick}>
                <span className="btn-icon">📁</span>
                Drive
              </button>
              <button className="cloud-btn dropbox-btn" onClick={handleDropboxClick}>
                <span className="btn-icon">☁️</span>
                DropBox
              </button>
            </div>
          </div>

          {/* Selected PDF Preview (A4 Size) */}
          <div className="selected-pdf-section">
            <h3>Selected PDF</h3>
            <div className="a4-preview">
              {selectedPdf ? (
                <div className="pdf-preview">
                  <div className="pdf-icon" style={{ transform: `rotate(${rotation}deg)` }}>
                    📄
                  </div>
                  <div className="pdf-info">
                    <h4>{selectedPdf.name}</h4>
                    <p>Size: {formatFileSize(selectedPdf.size)}</p>
                    <p className={`rotation-status ${rotation !== 0 ? 'rotated' : ''}`}>
                      Rotation: {rotation}°
                    </p>
                    <p className="pdf-status">
                      {rotatedPdf ? 'PDF Rotated Successfully' : 'Ready for rotation'}
                    </p>
                    {rotatedPdf && (
                      <p className="rotation-time">
                        Rotated at: {rotatedPdf.rotatedAt}
                      </p>
                    )}
                    {isRotating && (
                      <div className="rotation-progress">
                        <div className="progress-bar">
                          <div className="progress-fill"></div>
                        </div>
                        <p>Processing your PDF...</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="empty-preview">
                  <div className="pdf-placeholder">📄</div>
                  <p>No PDF selected</p>
                  <p className="hint">A4 Size Preview Area</p>
                </div>
              )}
            </div>
          </div>

          {/* Rotate Function Section */}
          <div className="rotate-function-section">
            <h3>Rotate Function</h3>
            <div className="rotation-controls">
              <div className="rotation-direction">
                <label>Rotation:</label>
                <div className="rotation-buttons">
                  <button 
                    className="rotate-btn left-rotate" 
                    onClick={handleRotateLeft}
                    disabled={!selectedPdf}
                  >
                    <span className="rotate-icon">↶</span>
                    Left
                  </button>
                  <button 
                    className="rotate-btn right-rotate" 
                    onClick={handleRotateRight}
                    disabled={!selectedPdf}
                  >
                    <span className="rotate-icon">↷</span>
                    Right
                  </button>
                </div>
              </div>
              <div className="current-rotation">
                <span>Current Angle: {rotation}°</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Function Buttons */}
        <div className="right-section">
          {/* Other Function Section */}
          <div className="other-function-section">
            <h3>other function</h3>
            <div className="function-buttons">
              <button className="func-btn quality-btn">
                <span className="btn-icon">⭐</span>
                Quality PDF
              </button>
              
              <button
                className="func-btn convert-btn"
                onClick={handleConvertRotation}
                disabled={!selectedPdf || rotation === 0 || isRotating}
              >
                <span className="btn-icon">
                  {isRotating ? '🔄' : '🔄'}
                </span>
                {isRotating ? 'Rotating...' : 'Convert Rotation'}
              </button>
              
              <button 
                className="func-btn download-btn" 
                onClick={handleDownload}
                disabled={!rotatedPdf}
              >
                <span className="btn-icon">📥</span>
                Download Rotate PDF
              </button>
            </div>
          </div>

          {/* Download to Cloud Buttons */}
          <div className="download-cloud-buttons">
            <button 
              className="cloud-download-btn drive-download"
              disabled={!rotatedPdf}
            >
              <span className="btn-icon">📁</span>
              Drive
            </button>
            <button 
              className="cloud-download-btn dropbox-download"
              disabled={!rotatedPdf}
            >
              <span className="btn-icon">☁️</span>
              DropBox
            </button>
          </div>
        </div>
      </div>

      {/* Hints Section */}
      <div className="hints-section">
        <h3>Hints:</h3>
        <ul>
          <li>Select a PDF by clicking the dropbox or using cloud services (Drive/DropBox)</li>
          <li>Use Left (↶) and Right (↷) rotation buttons to rotate your PDF</li>
          <li>Current rotation angle is displayed in degrees</li>
          <li>Click "Convert Rotation" to apply the rotation changes</li>
          <li>Download rotated PDF or save directly to cloud services</li>
          <li>Use quality button to adjust PDF quality settings</li>
        </ul>
      </div>
    </div>
  );
};

export default RotatePdf;