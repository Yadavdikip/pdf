import React, { useState } from 'react';
import { useFileConversion } from '../hooks/useFileConversion';
import { Upload, Crop } from 'lucide-react';
import '../styles/PdfCropper.css';

const UploadCropPdf = () => {
  const [cropSettings, setCropSettings] = useState({
    cropType: 'margin',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    applyToAll: true
  });
  const [error, setError] = useState('');

  const { getRootProps, getInputProps, isDragActive, files, removeFile, processFiles } = useFileConversion({
    acceptedFileTypes: ['.pdf'],
    maxFiles: 1,
    maxSize: 10000000, // 10MB
  });

  const handleCropSettingsChange = (setting, value) => {
    setCropSettings(prev => ({
      ...prev,
      [setting]: typeof value === 'string' ? parseInt(value) || 0 : value
    }));
  };

  const handleCropPdf = async () => {
    try {
      setError('');
      if (files.length === 0) return;
      await processFiles(files[0], 'crop-pdf', cropSettings);
    } catch (error) {
      console.error('Error cropping PDF:', error);
      setError(error.message || 'Failed to crop PDF. Please try again.');
    }
  };

  return (
    <div className="upload-container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <Upload size={50} />
        <p>Drag & drop your PDF file here, or click to select</p>
        <p className="file-info">Maximum file size: 10MB</p>
      </div>

      {files.length > 0 && (
        <div className="settings-container">
          <div className="file-list">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <span>{file.name}</span>
                <button onClick={() => removeFile(index)} className="remove-btn">
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="crop-settings">
            <div className="setting-group">
              <label>Crop Type:</label>
              <select 
                value={cropSettings.cropType}
                onChange={(e) => handleCropSettingsChange('cropType', e.target.value)}
              >
                <option value="margin">Margin</option>
                <option value="content">Content Area</option>
              </select>
            </div>

            <div className="margins-grid">
              <div className="setting-group">
                <label>Top Margin (px):</label>
                <input 
                  type="number" 
                  min="0"
                  value={cropSettings.top}
                  onChange={(e) => handleCropSettingsChange('top', e.target.value)}
                />
              </div>

              <div className="setting-group">
                <label>Bottom Margin (px):</label>
                <input 
                  type="number" 
                  min="0"
                  value={cropSettings.bottom}
                  onChange={(e) => handleCropSettingsChange('bottom', e.target.value)}
                />
              </div>

              <div className="setting-group">
                <label>Left Margin (px):</label>
                <input 
                  type="number" 
                  min="0"
                  value={cropSettings.left}
                  onChange={(e) => handleCropSettingsChange('left', e.target.value)}
                />
              </div>

              <div className="setting-group">
                <label>Right Margin (px):</label>
                <input 
                  type="number" 
                  min="0"
                  value={cropSettings.right}
                  onChange={(e) => handleCropSettingsChange('right', e.target.value)}
                />
              </div>
            </div>

            <div className="setting-group">
              <label>
                <input 
                  type="checkbox"
                  checked={cropSettings.applyToAll}
                  onChange={(e) => handleCropSettingsChange('applyToAll', e.target.checked)}
                />
                Apply to all pages
              </label>
            </div>
          </div>

          {error && (
            <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
              {error}
            </div>
          )}

          <button onClick={handleCropPdf} className="convert-btn">
            Crop PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadCropPdf;