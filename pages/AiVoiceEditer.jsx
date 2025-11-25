import React from 'react';
import UploadAIVoiceEditer from '../components/UploadAIVoiceEditer';
import { Mic } from 'lucide-react';


const AIVoiceEditer = () => {
  return (
    <div className="tool-page">
      <div className="tool-header">
        <div className="tool-icon-header">
          <Mic size={48} />
        </div>
        <h1>AI Voice PDF Editor</h1>
        <p>Use voice commands to edit your PDF files - add text, watermarks, navigate pages, and more</p>
      </div>

      <div className="tool-container">
        <UploadAIVoiceEditer />
      </div>

      <div className="tool-info">
        <h3>About AI Voice PDF Editor</h3>
        <div className="info-content">
          <h4>Features:</h4>
          <ul>
            <li>Voice-controlled PDF editing</li>
            <li>Natural language command processing</li>
            <li>Add text and watermarks with voice</li>
            <li>Navigate pages using voice commands</li>
            <li>Real-time voice recognition</li>
            <li>Command history tracking</li>
          </ul>

          <h4>How to Use:</h4>
          <ol>
            <li>Upload your PDF file</li>
            <li>Click the microphone button to start voice recognition</li>
            <li>Speak your commands clearly</li>
            <li>Watch the changes apply in real-time</li>
            <li>Download your edited PDF when finished</li>
          </ol>

          <div className="tips-section">
            <h4>Tips for Best Results:</h4>
            <ul>
              <li>Speak clearly and at a normal pace</li>
              <li>Use the exact command phrases shown in the help section</li>
              <li>Wait for each command to complete before giving the next one</li>
              <li>Check the command history to verify your commands were recognized</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIVoiceEditer;
