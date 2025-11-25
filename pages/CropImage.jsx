import React from 'react';
import UploadImagecrop from '../components/UploadImagecrop';
import { Image } from 'lucide-react';


const CropImage = () => {
  return (
    <div className="tool-page">
      <div className="tool-header">
        <div className="tool-icon-header">
          <Image size={48} />
        </div>
        <h1>Crop Image</h1>
        <p>Crop and resize your images with precision. Select an area and download the cropped result.</p>
      </div>

      <div className="tool-container">
        <UploadImagecrop />
      </div>
    </div>
  );
};

export default CropImage;