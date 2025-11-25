import React from 'react';
import Upload3DARPdf from '../components/Upload3DARPdf';
import ToolPage from './ToolPage';

const ThreeDARPdf = () => {
  return (
    <ToolPage
      title="3D AR PDF Creator"
      description="Transform your PDF documents into immersive 3D and Augmented Reality experiences. Add interactive 3D elements, AR markers, and enhanced viewing capabilities."
      component={Upload3DARPdf}
      features={[
        "Convert standard PDFs to 3D AR format",
        "Add QR codes for AR scanning",
        "Embed interactive 3D models",
        "Include AR viewing instructions",
        "Compatible with AR-enabled devices",
        "Real-time 3D rendering"
      ]}
      faqs={[
        {
          question: "What is a 3D AR PDF?",
          answer: "A 3D AR PDF is an enhanced PDF document that includes augmented reality features, allowing users to view interactive 3D content and experience immersive elements using AR-capable devices."
        },
        {
          question: "How do I view the 3D AR content?",
          answer: "Use an AR-enabled mobile device or tablet. Scan the QR codes in the PDF or use compatible AR viewing applications to activate the 3D content."
        },
        {
          question: "What devices support 3D AR PDFs?",
          answer: "Most modern smartphones and tablets with cameras support AR viewing. iOS devices (iPhone/iPad) and Android devices with ARCore are fully compatible."
        },
        {
          question: "Can I customize the 3D elements?",
          answer: "Yes, you can choose to embed 3D models, add AR markers, and include viewing instructions during the conversion process."
        }
      ]}
    />
  );
};

export default ThreeDARPdf;
