import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Download, FileText, Plus, Minus } from 'lucide-react';
import '../styles/SplitPdf.css';
// HMR trigger: updated import paths for SplitPdf styles
const UploadSplitPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [rangeMode, setRangeMode] = useState('custom');
  const [rangeType, setRangeType] = useState('fixed');
  const [ranges, setRanges] = useState([
    { id: 1, from: 1, to: 1 },
    { id: 2, from: 1, to: 1 }
  ]);

  // File upload function
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const pageCount = Math.floor(Math.random() * 50) + 1;
      setSelectedFile({
        file,
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        pages: pageCount
      });
      
      // Set initial ranges
      const midPoint = Math.ceil(pageCount / 2);
      setRanges([
        { id: 1, from: 1, to: midPoint },
        { id: 2, from: midPoint + 1, to: pageCount }
      ]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    maxSize: 52428800
  });

  const removeFile = () => {
    setSelectedFile(null);
    setRanges([{ id: 1, from: 1, to: 1 }, { id: 2, from: 1, to: 1 }]);
  };

  const updateRange = (id, field, value) => {
    const numValue = parseInt(value) || 1;
    setRanges(ranges.map(range => {
      if (range.id === id) {
        const updated = { ...range, [field]: numValue };
        
        // Ensure from <= to
        if (field === 'from' && numValue > updated.to) {
          updated.to = numValue;
        } else if (field === 'to' && numValue < updated.from) {
          updated.from = numValue;
        }
        
        // Ensure values are within page limits
        if (selectedFile) {
          updated.from = Math.min(Math.max(1, updated.from), selectedFile.pages);
        
        }
        
        return updated;
      }
      return range;
    }));
  };

  const splitFile = () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }
    
    console.log('Splitting file...', {
      fileName: selectedFile.name,
      ranges: ranges
    });
    
    alert(`Splitting ${selectedFile.name} into ${ranges.length} parts...`);
  };

  const downloadSplitFiles = () => {
    if (!selectedFile) return;
    alert(`Downloading ${ranges.length} split files...`);
  };

  return (
    <div className="split-pdf-container">
      {/* Main Heading */}
      <div className="split-header">
        <h1>SPLIT PDF OR Other File</h1>
            
      </div>

      <div className="split-content">
        {/* Left Side - File Selection & Preview */}
        <div className="left-section">
          {/* Select File Dropbox */}
          <div {...getRootProps()} className="select-file-dropbox">
            <input {...getInputProps()} />
            <Upload size={32} className="upload-icon" />
            <p className="dropbox-text">
              {isDragActive ? "Drop file here..." : "Select file"}
            </p>
          </div>

          {/* Selected File Section */}
          <div className="selected-file-section">
            <h3 className="section-heading">Selected file</h3>
            
            {/* Two A4 Style Boxes */}
            <div className="a4-boxes-container">
              {selectedFile ? (
                <>
                  {/* First A4 Box */}
                  <div className="a4-box">
                    <div className="file-info">
                      <FileText size={20} />
                      <span className="file-name">{selectedFile.name}</span>
                      <button onClick={removeFile} className="remove-btn">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="file-details">
                      <span>{selectedFile.size}</span>
                      <span>{selectedFile.pages} pages</span>
                    </div>
                  </div>

                  {/* Second A4 Box */}
                  <div className="a4-box">
                    <div className="file-info">
                      <FileText size={20} />
                      <span className="file-name">{selectedFile.name}</span>
                      <button onClick={removeFile} className="remove-btn">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="file-details">
                      <span>{selectedFile.size}</span>
                      <span>{selectedFile.pages} pages</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="no-file">
                  <FileText size={40} />
                  <p>No file selected</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Range Settings & Actions */}
        <div className="right-section">
          {/* Range Settings */}
          <div className="range-settings">
            <h3 className="settings-heading">Range mode:</h3>
            
            <div className="mode-buttons">
              <button
                className={`mode-btn ${rangeMode === 'custom' ? 'active' : ''}`}
                onClick={() => setRangeMode('custom')}
              >
                Custom range:
              </button>
            </div>

            <div className="type-buttons">
              <button
                className={`type-btn ${rangeType === 'fixed' ? 'active' : ''}`}
                onClick={() => setRangeType('fixed')}
              >
                Fixed
              </button>
            </div>

            {/* Range Inputs */}
            <div className="range-inputs">
              {ranges.map((range) => (
                <div key={range.id} className="range-group">
                  <h4 className="range-heading">Range {range.id}</h4>
                  <div className="range-controls">
                    <div className="range-field">
                      <span className="range-label">from</span>
                      <input
                        type="number"
                        min="1"
                        max={selectedFile?.pages || 1}
                        value={range.from}
                        onChange={(e) => updateRange(range.id, 'from', e.target.value)}
                        className="range-input"
                      />
                    </div>
                    <div className="range-field">
                      <span className="range-label">to</span>
                      <input
                        type="number"
                        min="1"
                        max={selectedFile?.pages || 1}
                        value={range.to}
                        onChange={(e) => updateRange(range.id, 'to', e.target.value)}
                        className="range-input"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              onClick={splitFile}
              disabled={!selectedFile}
              className="split-btn"
            >
              Split PDF
            </button>

            <button 
              onClick={downloadSplitFiles}
              disabled={!selectedFile}
              className="download-btn"
            >
              Download PDF split
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSplitPdf;