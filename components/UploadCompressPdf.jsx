import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Download } from 'lucide-react';
import '../styles/CompressPdf.css';

function UploadCompressPdf() {
  const [fileItem, setFileItem] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState('medium');
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [busy, setBusy] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    const f = acceptedFiles[0];
    setFileItem({
      file: f,
      id: Math.random().toString(36).slice(2, 9),
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2) + ' MB',
    });
    setCompressedBlob(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    maxSize: 52428800,
  });

  const removeFile = () => {
    setFileItem(null);
    setCompressedBlob(null);
  };

  const compressionFactors = {
    low: 0.9,
    medium: 0.6,
    high: 0.4,
    extreme: 0.25,
  };

  const compressPdf = async () => {
    if (!fileItem) return alert('Please upload a PDF first.');
    setBusy(true);
    try {
      // Mock compression: slice the original file to simulate reduced size
      const factor = compressionFactors[compressionLevel] ?? 0.6;
      const targetSize = Math.max(1024, Math.round(fileItem.file.size * factor));
      const blob = fileItem.file.slice(0, targetSize, fileItem.file.type || 'application/pdf');
      setCompressedBlob(blob);
      alert('Compression complete (mock). Click Download to save the file.');
    } catch (err) {
      console.error(err);
      alert('Compression failed.');
    } finally {
      setBusy(false);
    }
  };

  const downloadCompressedPdf = () => {
    if (!compressedBlob) return alert('No compressed file available.');
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileItem ? `compressed-${fileItem.name}` : 'compressed.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="merge-pdf-container">
      <div className="merge-header"><h1>Compress PDF</h1></div>
      <div className="merge-content">
        <div className="left-section">
          <div {...getRootProps()} className="select-pdf-dropbox">
            <input {...getInputProps()} />
            <Upload size={32} className="upload-icon" />
            <p className="dropbox-text">{isDragActive ? 'Drop PDF here...' : 'Select PDF'}</p>
            <p className="dropbox-hint">Drag & drop a PDF here, or click to select file</p>
          </div>

          <div className="selected-pdf-section">
            <h3 className="section-heading">Selected PDF</h3>
            <div className="a4-pdf-container">
              {fileItem ? (
                <div className="pdf-file-item">
                  <div className="file-info">
                    <span className="file-name">{fileItem.name}</span>
                    <span className="file-size">{fileItem.size}</span>
                  </div>
                  <div className="file-actions">
                    <button onClick={removeFile} className="remove-btn"><X size={16} /></button>
                  </div>
                </div>
              ) : (
                <div className="no-files"><p>No PDF file selected</p></div>
              )}
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="settings-section">
            <h3>Compression Level</h3>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>
                <input type="radio" name="level" value="low" checked={compressionLevel === 'low'} onChange={() => setCompressionLevel('low')} />
                <span style={{ marginLeft: 8 }}>Low (best quality)</span>
              </label>
              <label style={{ display: 'block', marginBottom: 6 }}>
                <input type="radio" name="level" value="medium" checked={compressionLevel === 'medium'} onChange={() => setCompressionLevel('medium')} />
                <span style={{ marginLeft: 8 }}>Medium</span>
              </label>
              <label style={{ display: 'block', marginBottom: 6 }}>
                <input type="radio" name="level" value="high" checked={compressionLevel === 'high'} onChange={() => setCompressionLevel('high')} />
                <span style={{ marginLeft: 8 }}>High (smaller size)</span>
              </label>
              <label style={{ display: 'block' }}>
                <input type="radio" name="level" value="extreme" checked={compressionLevel === 'extreme'} onChange={() => setCompressionLevel('extreme')} />
                <span style={{ marginLeft: 8 }}>Extreme (max reduction)</span>
              </label>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={compressPdf} disabled={!fileItem || busy} className="merge-pdf-btn">
              {busy ? 'Compressing...' : 'Compress PDF'}
            </button>
            <button onClick={downloadCompressedPdf} disabled={!compressedBlob} className="download-merged-btn">
              <Download size={20} /> Download Compressed PDF
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <p><strong>Note:</strong> This is a client-side mock compression (file slicing). Replace compressPdf with real server-side or library-based compression for production.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCompressPdf;