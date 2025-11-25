import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import { Download, Settings, Info, FileCheck } from 'lucide-react';
import { useFileConversion } from '../hooks/useFileConversion';
import '../styles/ToolPage.css';

const PdfToPdfA = () => {
  const [files, setFiles] = useState([]);
  const [conversionSettings, setConversionSettings] = useState({
    complianceLevel: 'PDF/A-2b',
    embedFonts: true,
    colorProfile: 'sRGB',
    preserveMetadata: true
  });

  const { convert, isConverting } = useFileConversion();

  const handleFileUpload = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    
    try {
      await convert(files[0], 'pdf-to-pdfa', conversionSettings);
    } catch (error) {
      console.error('Conversion failed:', error);
    }
  };

  const acceptedFiles = {
    'application/pdf': ['.pdf']
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <div className="tool-icon-header">
          <FileCheck size={48} />
        </div>
        <h1>PDF to PDF/A</h1>
        <p>Convert regular PDF files to PDF/A format for long-term archiving and compliance</p>
      </div>

      <div className="tool-container">
        <div className="upload-section">
          <FileUpload
            onFileUpload={handleFileUpload}
            acceptedFiles={acceptedFiles}
            multiple={false}
            maxFiles={1}
            maxSize={50000000} // 50MB
            uploadText="Drag & drop your PDF file here, or click to select"
            hintText="Convert to PDF/A for long-term archiving"
            icon={FileCheck}
          />
        </div>

        {files.length > 0 && (
          <div className="settings-section">
            <h3>
              <Settings size={20} />
              PDF/A Settings
            </h3>
            <div className="settings-grid">
              <label className="setting-option">
                <span>Compliance Level:</span>
                <select 
                  value={conversionSettings.complianceLevel}
                  onChange={(e) => setConversionSettings(prev => ({
                    ...prev,
                    complianceLevel: e.target.value
                  }))}
                >
                  <option value="PDF/A-1b">PDF/A-1b (Basic)</option>
                  <option value="PDF/A-2b">PDF/A-2b (Recommended)</option>
                  <option value="PDF/A-3b">PDF/A-3b (Advanced)</option>
                </select>
              </label>
              <label className="setting-option">
                <span>Color Profile:</span>
                <select 
                  value={conversionSettings.colorProfile}
                  onChange={(e) => setConversionSettings(prev => ({
                    ...prev,
                    colorProfile: e.target.value
                  }))}
                >
                  <option value="sRGB">sRGB</option>
                  <option value="CMYK">CMYK</option>
                  <option value="Gray">Gray</option>
                </select>
              </label>
              <label className="setting-option">
                <input
                  type="checkbox"
                  checked={conversionSettings.embedFonts}
                  onChange={(e) => setConversionSettings(prev => ({
                    ...prev,
                    embedFonts: e.target.checked
                  }))}
                />
                <span>Embed all fonts</span>
              </label>
              <label className="setting-option">
                <input
                  type="checkbox"
                  checked={conversionSettings.preserveMetadata}
                  onChange={(e) => setConversionSettings(prev => ({
                    ...prev,
                    preserveMetadata: e.target.checked
                  }))}
                />
                <span>Preserve metadata</span>
              </label>
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="action-section">
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className={`convert-btn ${isConverting ? 'converting' : ''}`}
            >
              {isConverting ? (
                <>
                  <div className="spinner"></div>
                  Converting to PDF/A...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Convert to PDF/A
                </>
              )}
            </button>
          </div>
        )}

        <div className="info-section">
          <div className="info-card">
            <Info size={20} />
            <div>
              <h4>About PDF/A Format</h4>
              <p>PDF/A is an ISO-standardized version of PDF specialized for digital preservation of electronic documents.</p>
              <h5>Key Features:</h5>
              <ul>
                <li>Embedded fonts for consistent rendering</li>
                <li>Device-independent color</li>
                <li>Self-contained document structure</li>
                <li>Long-term preservation capabilities</li>
              </ul>
              <h5>How to Convert:</h5>
              <ol>
                <li>Upload your PDF file</li>
                <li>Select PDF/A compliance level</li>
                <li>Click "Convert to PDF/A" button</li>
                <li>Download your compliant PDF/A file</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfToPdfA;