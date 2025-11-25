import React, { useState } from 'react';
import { useFileConversion } from '../hooks/useFileConversion';
import { Upload, X, Download, Zap, Smartphone, Eye } from 'lucide-react';
import '../styles/ThreeDPDFViewer.css';

const Upload3DARPdf = () => {
  const [conversionSettings, setConversionSettings] = useState({
    addARMarkers: true,
    embed3DModel: false,
    arInstructions: true
  });

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    files,
    removeFile,
    convert,
    isConverting
  } = useFileConversion({
    acceptedFileTypes: ['application/pdf'],
    maxFiles: 1,
    maxSize: 52428800 // 50MB
  });

  const handleConvert = async () => {
    if (files.length === 0) return;

    try {
      await convert(files[0], '3d-ar-pdf', conversionSettings);
      alert('3D AR PDF created successfully! Download will start automatically.');
    } catch (error) {
      alert(`Conversion failed: ${error.message}`);
    }
  };

  const toggleSetting = (setting) => {
    setConversionSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="threed-pdf-viewer">
      <div className="viewer-header">
        <h1>3D AR PDF Creator</h1>
        <p>Transform your PDF documents into immersive 3D and Augmented Reality experiences.</p>
      </div>
      <div className="viewer-container">
        <div className="control-panel">
          <div {...getRootProps()} className="select-pdf-dropbox">
            <input {...getInputProps()} />
            <Upload size={32} className="upload-icon" />
            <p className="dropbox-text">
              {isDragActive ? 'Drop PDF file here...' : 'Select PDF File'}
            </p>
            <p className="dropbox-hint">
              Drag & drop a PDF file here, or click to select file
            </p>
            <p className="file-limit">Max file size: 50MB</p>
          </div>

          <div className="selected-pdf-section">
            <h3 className="section-heading">Selected PDF File</h3>
            <div className="a4-pdf-container">
              {files.length > 0 ? (
                <div className="pdf-files-list">
                  {files.map((file, i) => (
                    <div key={i} className="pdf-file-item">
                      <div className="file-info">
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                      <div className="file-actions">
                        <button onClick={() => removeFile(i)} className="remove-btn">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-files">
                  <p>No PDF file selected</p>
                  <p className="hint-text">Upload a PDF to convert it to 3D AR format</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="viewer-main">
          <div className="conversion-settings">
            <h3 className="section-heading">3D AR Settings</h3>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <Smartphone size={20} />
                  <div>
                    <h4>Add AR Markers</h4>
                    <p>Include QR codes for AR scanning</p>
                  </div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={conversionSettings.addARMarkers}
                    onChange={() => toggleSetting('addARMarkers')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <Eye size={20} />
                  <div>
                    <h4>Embed 3D Model</h4>
                    <p>Include interactive 3D elements</p>
                  </div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={conversionSettings.embed3DModel}
                    onChange={() => toggleSetting('embed3DModel')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <Zap size={20} />
                  <div>
                    <h4>AR Instructions</h4>
                    <p>Add usage instructions for AR viewing</p>
                  </div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={conversionSettings.arInstructions}
                    onChange={() => toggleSetting('arInstructions')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button
              onClick={handleConvert}
              disabled={files.length === 0 || isConverting}
              className="merge-pdf-btn"
            >
              {isConverting ? 'Converting...' : 'Create 3D AR PDF'}
            </button>
            <button
              onClick={() => window.open('https://example.com/ar-viewer', '_blank')}
              className="download-merged-btn"
            >
              <Download size={20} />
              Test AR Viewer
            </button>
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="features-showcase">
        <h3>🚀 3D AR PDF Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h4>Augmented Reality</h4>
            <p>View PDF content in augmented reality using mobile devices</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h4>3D Interactions</h4>
            <p>Rotate, zoom, and interact with 3D elements in the PDF</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📷</div>
            <h4>AR Markers</h4>
            <p>Scan QR codes to activate AR content and 3D models</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Real-time Rendering</h4>
            <p>Smooth 3D rendering and AR experiences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload3DARPdf;
