import React, { useState } from 'react';
import UploadPdfcrop from '../components/UploadPdfcrop';
import { Moon, Sun } from 'lucide-react';

const Pdfcrop = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`pdf-cropper-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <div className="date-display">
          <div className="calendar-date">
            {new Date().getDate()}
          </div>
          <div className="calendar-day">
            {new Date().toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
        </div>
        <h1>PDF Cropper</h1>
        <button
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <UploadPdfcrop isDarkMode={isDarkMode} />
    </div>
  );
};

export default Pdfcrop;
