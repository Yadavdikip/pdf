import React from 'react';
import UploadAddPageNumber from '../components/UploadAddPageNumber';

import { Hash } from 'lucide-react';


const AddPageNumber = () => {
  return (
    <div className="tool-page">
      <div className="tool-header">
        <div className="tool-icon">
          <Hash size={32} />
        </div>
        <h1>Add Page Numbers to PDF</h1>
        <p>Add professional page numbers to your PDF documents with custom formatting</p>
      </div>

      <div className="tool-container">
        <UploadAddPageNumber />
      </div>
    </div>
  );
};

export default AddPageNumber;
