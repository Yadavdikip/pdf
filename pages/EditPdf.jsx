import React from 'react';
import UploadEditPdf from '../components/UploadEditPdf';
import { Edit3 } from 'lucide-react';


const EditPdf = () => {
  return (
    <div className="tool-page">
      <div className="tool-header">
        <div className="tool-icon-header">
          <Edit3 size={48} />
        </div>
        <h1>Edit PDF</h1>
        <p>Basic PDF editing tools to modify your documents - add text, watermarks, rotate pages, and more</p>
      </div>

      <div className="tool-container">
        <UploadEditPdf />
      </div>
    </div>
  );
};

export default EditPdf;