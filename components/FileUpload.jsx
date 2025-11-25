import React, { useState, useRef } from 'react';
import { Upload, X, File } from 'lucide-react';
import '../styles/FileUpload.css';

const FileUpload = ({ onFileUpload, acceptedFiles, multiple = false, maxFiles = 1 }) => {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      const fileType = file.type;
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

      // Check if file type or extension is accepted
      const isAccepted = Object.keys(acceptedFiles).some(type => {
        return fileType === type || acceptedFiles[type].includes(fileExtension);
      });

      return isAccepted;
    });

    let updatedFiles = [...files, ...validFiles];

    // Limit to maxFiles if not multiple
    if (!multiple && updatedFiles.length > maxFiles) {
      updatedFiles = updatedFiles.slice(0, maxFiles);
    }

    setFiles(updatedFiles);
    onFileUpload(updatedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileUpload(updatedFiles);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-upload">
      <div
        className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={Object.values(acceptedFiles).flat().join(',')}
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />

        <div className="upload-content">
          <Upload size={48} className="upload-icon" />
          <div className="upload-text">
            <p className="primary-text">
              {multiple ? 'Drop files here or click to browse' : 'Drop file here or click to browse'}
            </p>
            <p className="secondary-text">
              Supported formats: {Object.values(acceptedFiles).flat().join(', ')}
              {maxFiles > 1 && ` (max ${maxFiles} files)`}
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <div className="file-info">
                <File size={20} />
                <div className="file-details">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{formatFileSize(file.size)}</span>
                </div>
              </div>
              <button
                className="remove-file"
                onClick={() => removeFile(index)}
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
