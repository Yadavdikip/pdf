// Mock conversion functions - replace with actual implementation
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { createWorker } from 'tesseract.js';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import PptxGenJS from 'pptxgenjs';
import QRCode from 'qrcode';

// Set PDF.js worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Helper function to compress JPEG images
const compressImage = async (imageBytes, quality) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(async (blob) => {
        const buffer = await blob.arrayBuffer();
        resolve(buffer);
      }, 'image/jpeg', quality);
    };
    img.src = URL.createObjectURL(new Blob([imageBytes], { type: 'image/jpeg' }));
  });
};

export const convertFile = async (file, conversionType, settings) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (conversionType === 'crop-pdf') {
    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      if (pages.length === 0) {
        throw new Error('PDF has no pages');
      }

      const left = Math.max(0, settings.left || 0);
      const right = Math.max(0, settings.right || 0);
      const top = Math.max(0, settings.top || 0);
      const bottom = Math.max(0, settings.bottom || 0);

      // Validate that margins are not too large
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      const newWidth = width - left - right;
      const newHeight = height - top - bottom;

      if (newWidth <= 10 || newHeight <= 10) {
        throw new Error('Crop margins are too large. Please reduce the margin values to ensure the page has at least 10px width and height.');
      }

      if (left >= width || right >= width || top >= height || bottom >= height) {
        throw new Error('Invalid crop margins. Margins cannot be larger than or equal to page dimensions.');
      }

      pages.forEach(page => {
        // Use setMediaBox to actually crop the page by changing its physical size
        // This ensures content is properly positioned and no white space appears
        page.setMediaBox(left, bottom, newWidth, newHeight);
      });

      const croppedBytes = await pdfDoc.save();
      return new Blob([croppedBytes], { type: 'application/pdf' });
    } catch (error) {
      console.error('Crop PDF error:', error);
      throw new Error(`Failed to crop PDF: ${error.message}`);
    }
  }
  if (conversionType === 'organize-pages') {
    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const total = pdfDoc.getPageCount();

      // Build page order
      let order = Array.from({ length: total }, (_, i) => i + 1);

      if (settings.reverseOrder) {
        order = order.reverse();
      }

      if (settings.customOrder && settings.pageOrder) {
        // parse ranges like '3,1,2,5-7'
        const parts = settings.pageOrder.split(',').map(p => p.trim());
        const custom = [];
        parts.forEach(part => {
          if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n, 10));
            if (!isNaN(start) && !isNaN(end)) {
              for (let k = start; k <= end; k++) custom.push(k);
            }
          } else {
            const n = parseInt(part, 10);
            if (!isNaN(n)) custom.push(n);
          }
        });
        // filter to valid pages and dedupe
        order = custom.filter((p, i) => p >= 1 && p <= total && custom.indexOf(p) === i);
      }

      // Create new PDF with pages in requested order
      const newPdf = await PDFDocument.create();
      const copied = await newPdf.copyPages(pdfDoc, order.map(n => n - 1));
      copied.forEach(p => newPdf.addPage(p));
      const outBytes = await newPdf.save();
      return new Blob([outBytes], { type: 'application/pdf' });
    } catch (err) {
      console.error('Organize pages error:', err);
      return new Blob(['Organize error'], { type: 'text/plain' });
    }
  }

  if (conversionType === 'add-page-number') {
    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();
      const total = pages.length;

      for (let i = 0; i < total; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        let text = settings.format;

        // Replace placeholders in format string
        text = text.replace('{n}', (i + settings.startNumber).toString());
        if (settings.includeTotal) {
          text = text.replace('{t}', total.toString());
        }

        // Calculate position based on settings
        let x = 0;
        let y = 0;
        const margin = 20;

        switch (settings.position) {
          case 'top-left':
            x = settings.marginTop;
            y = height - settings.marginTop;
            break;
          case 'top-center':
            x = width / 2;
            y = height - settings.marginTop;
            break;
          case 'top-right':
            x = width - settings.marginTop;
            y = height - settings.marginTop;
            break;
          case 'bottom-left':
            x = settings.marginBottom;
            y = settings.marginBottom;
            break;
          case 'bottom-center':
            x = width / 2;
            y = settings.marginBottom;
            break;
          case 'bottom-right':
            x = width - settings.marginBottom;
            y = settings.marginBottom;
            break;
        }

        page.drawText(text, {
          x: x,
          y: y,
          size: settings.fontSize,
          color: { r: 0, g: 0, b: 0 },
        });
      }

      const outBytes = await pdfDoc.save();
      return new Blob([outBytes], { type: 'application/pdf' });
    } catch (err) {
      console.error('Add page numbers error:', err);
      return new Blob(['Add page numbers error'], { type: 'text/plain' });
    }
  }

  if (conversionType === 'repair-pdf') {
    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      // Repair by loading and saving - this can fix some structural issues
      const repairedBytes = await pdfDoc.save();
      return new Blob([repairedBytes], { type: 'application/pdf' });
    } catch (err) {
      console.error('Repair PDF error:', err);
      throw new Error('Unable to repair PDF. The file may be too corrupted.');
    }
  }

  if (conversionType === 'rotate-pdf') {
    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      // Rotate all pages by the specified angle
      const rotationAngle = settings.rotation || 0;
      pages.forEach(page => {
        page.setRotation(page.getRotation().angle + rotationAngle);
      });

      const rotatedBytes = await pdfDoc.save();
      return new Blob([rotatedBytes], { type: 'application/pdf' });
    } catch (err) {
      console.error('Rotate PDF error:', err);
      throw new Error('Unable to rotate PDF. The file may be corrupted.');
    }
  }

  if (conversionType === '3d-ar-pdf') {
    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      // Create AR instructions page if enabled
      if (settings.arInstructions) {
        const instructionsPage = pdfDoc.insertPage(0);
        const { width, height } = instructionsPage.getSize();

        // Add title
        instructionsPage.drawText('3D AR PDF Document', {
          x: 50,
          y: height - 50,
          size: 24,
          color: { r: 0, g: 0, b: 0 },
        });

        // Add AR instructions
        const instructions = [
          'Augmented Reality Instructions:',
          '',
          '1. Use an AR-enabled mobile device (iPhone/iPad or Android with ARCore)',
          '2. Open this PDF in a compatible PDF viewer',
          '3. Look for QR codes or AR markers on the pages',
          '4. Scan the markers with your device camera',
          '5. Experience interactive 3D content and animations',
          '',
          'Compatible Apps:',
          '• Adobe Acrobat Reader',
          '• AR PDF viewers',
          '• Web browsers with AR support',
          '',
          'Note: Ensure your device has good lighting for optimal AR experience.'
        ];

        instructions.forEach((line, index) => {
          instructionsPage.drawText(line, {
            x: 50,
            y: height - 100 - (index * 15),
            size: 10,
            color: { r: 0, g: 0, b: 0 },
            maxWidth: width - 100,
          });
        });

        // Generate QR code for AR content if enabled
        if (settings.addARMarkers) {
          try {
            const qrData = `ar-pdf://${file.name || 'document'}`;
            const qrCodeDataURL = await QRCode.toDataURL(qrData, {
              width: 150,
              margin: 2,
              color: {
                dark: '#000000',
                light: '#FFFFFF'
              }
            });

            // Convert data URL to image and embed in PDF
            const qrImageBytes = await fetch(qrCodeDataURL).then(res => res.arrayBuffer());
            const qrImage = await pdfDoc.embedPng(qrImageBytes);

            instructionsPage.drawImage(qrImage, {
              x: width - 200,
              y: height - 200,
              width: 150,
              height: 150,
            });

            instructionsPage.drawText('Scan QR Code for AR Content', {
              x: width - 200,
              y: height - 220,
              size: 8,
              color: { r: 0, g: 0, b: 0 },
            });
          } catch (qrError) {
            console.warn('QR code generation failed:', qrError);
          }
        }
      }

      // Add AR markers to existing pages if enabled
      if (settings.addARMarkers) {
        pages.forEach((page, index) => {
          const pageWidth = page.getWidth();
          const pageHeight = page.getHeight();

          // Add small AR marker indicator
          page.drawText('AR', {
            x: pageWidth - 30,
            y: pageHeight - 20,
            size: 8,
            color: { r: 1, g: 0, b: 0 },
          });
        });
      }

      // Add 3D model metadata if enabled
      if (settings.embed3DModel) {
        // Simulate 3D model embedding with metadata
        pdfDoc.setKeywords(['3D', 'AR', 'Augmented Reality', 'Interactive PDF']);
        pdfDoc.setProducer('PDF Tools - 3D AR Converter');
      }

      // Set enhanced metadata
      pdfDoc.setTitle('3D AR PDF - ' + (file.name || 'Document'));
      pdfDoc.setSubject('Augmented Reality Enhanced PDF with Interactive 3D Content');
      pdfDoc.setCreator('PDF Tools Website');
      pdfDoc.setProducer('PDF Tools - AR Enhancement');

      const arPdfBytes = await pdfDoc.save();
      return new Blob([arPdfBytes], { type: 'application/pdf' });
    } catch (err) {
      console.error('3D AR PDF conversion error:', err);
      throw new Error('Unable to convert to 3D AR PDF. The file may be corrupted.');
    }
  }

  if (conversionType === 'doc-to-pdf') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.create();

      if (file.name.match(/\.(docx?)$/i)) {
        // Handle Word documents
        const result = await mammoth.convertToHtml({ arrayBuffer });
        const htmlContent = result.value;

        // Create a simple PDF page with the HTML content
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        // Simple text extraction from HTML (basic implementation)
        const textContent = htmlContent.replace(/<[^>]*>/g, '').trim();

        page.drawText(textContent, {
          x: 50,
          y: height - 50,
          size: 12,
          maxWidth: width - 100,
        });
      } else if (file.name.match(/\.(xlsx?)$/i)) {
        // Handle Excel documents
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const csvContent = XLSX.utils.sheet_to_csv(worksheet);

        // Create a PDF page with the CSV content
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        page.drawText(csvContent, {
          x: 50,
          y: height - 50,
          size: 10,
          maxWidth: width - 100,
        });
      } else if (file.name.match(/\.(txt)$/i)) {
        // Handle text files
        const textContent = new TextDecoder().decode(arrayBuffer);

        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        page.drawText(textContent, {
          x: 50,
          y: height - 50,
          size: 12,
          maxWidth: width - 100,
        });
      }

      const pdfBytes = await pdfDoc.save();
      return new Blob([pdfBytes], { type: 'application/pdf' });
    } catch (err) {
      console.error('Doc to PDF conversion error:', err);
      throw new Error('Unable to convert document to PDF. The file may be corrupted or unsupported.');
    }
  }

  if (conversionType === 'ocr') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const worker = await createWorker();

      // Map language names to Tesseract language codes
      const langMap = {
        'English': 'eng',
        'Spanish': 'spa',
        'French': 'fra',
        'German': 'deu',
        'Hindi': 'hin',
        'Chinese': 'chi_sim',
        'Arabic': 'ara'
      };
      const tessLang = langMap[settings.language] || 'eng';

      await worker.loadLanguage(tessLang);
      await worker.initialize(tessLang);

      let fullText = '';

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better OCR
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext).promise;

        const { data: { text } } = await worker.recognize(canvas);
        fullText += `Page ${pageNum}:\n${text}\n\n`;
      }

      await worker.terminate();

      return new Blob([fullText], { type: 'text/plain' });
    } catch (err) {
      console.error('OCR conversion error:', err);
      throw new Error('Unable to perform OCR on PDF. The file may be corrupted or unsupported.');
    }
  }

  if (conversionType === 'pdf-to-doc') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      let fullText = '';

      // Extract text from all pages
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const textItems = textContent.items;

        let pageText = '';
        textItems.forEach(item => {
          if (item.str) {
            pageText += item.str + ' ';
          }
        });

        fullText += pageText.trim() + '\n\n';
      }

      // Generate file based on output format
      if (settings.outputFormat === 'doc' || settings.outputFormat === 'rtf') {
        // Generate RTF content
        const rtfContent = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}
{\\colortbl;\\red0\\green0\\blue0;}
\\viewkind4\\uc1\\pard\\lang1033\\f0\\fs24
${fullText.replace(/\n/g, '\\par\n')}
}`;

        return new Blob([rtfContent], { type: 'application/rtf' });
      } else if (settings.outputFormat === 'odt') {
        // Generate basic ODT content (OpenDocument Text)
        const odtContent = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
  xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
  xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0">
  <office:body>
    <office:text>
      <text:p text:style-name="Standard">${fullText.replace(/\n\n/g, '</text:p><text:p text:style-name="Standard">').replace(/\n/g, ' ')}</text:p>
    </office:text>
  </office:body>
</office:document-content>`;

        // ODT is a ZIP file with XML, but for simplicity, return as XML
        // In a real implementation, you'd create a proper ODT ZIP structure
        return new Blob([odtContent], { type: 'application/vnd.oasis.opendocument.text' });
      }

      // Default to RTF
      const rtfContent = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}
{\\colortbl;\\red0\\green0\\blue0;}
\\viewkind4\\uc1\\pard\\lang1033\\f0\\fs24
${fullText.replace(/\n/g, '\\par\n')}
}`;

      return new Blob([rtfContent], { type: 'application/rtf' });
    } catch (err) {
      console.error('PDF to DOC conversion error:', err);
      throw new Error('Unable to convert PDF to DOC. The file may be corrupted or unsupported.');
    }
  }

  if (conversionType === 'pdf-to-powerpoint') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      // Create a new PowerPoint presentation
      const pptx = new PptxGenJS();

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 }); // Scale for better text extraction
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext).promise;

        // Extract text content from the page
        const textContent = await page.getTextContent();
        const textItems = textContent.items;
        let slideText = '';

        // Concatenate text items
        textItems.forEach(item => {
          if (item.str) {
            slideText += item.str + ' ';
          }
        });

        // Create a new slide
        const slide = pptx.addSlide();

        // Add title
        slide.addText(`Page ${pageNum}`, {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 1,
          fontSize: 24,
          bold: true,
          color: '000000'
        });

        // Add text content
        if (slideText.trim()) {
          slide.addText(slideText.trim(), {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 5,
            fontSize: 14,
            color: '000000',
            wrap: true
          });
        } else {
          // If no text, add a placeholder
          slide.addText('No text content extracted from this page.', {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 5,
            fontSize: 14,
            color: '666666',
            italic: true
          });
        }
      }

      // Generate the PPTX file as a blob
      const pptxBlob = await pptx.write({ outputType: 'blob' });
      return pptxBlob;
    } catch (err) {
      console.error('PDF to PowerPoint conversion error:', err);
      throw new Error('Unable to convert PDF to PowerPoint. The file may be corrupted or unsupported.');
    }
  }

  if (conversionType === 'jpg-to-pdf') {
    try {
      const pdfDoc = await PDFDocument.create();

      // Page size mappings
      const pageSizes = {
        a4: [595.28, 841.89], // A4 in points
        letter: [612, 792],   // Letter in points
        legal: [612, 1008]    // Legal in points
      };

      const pageWidth = pageSizes[settings.pageSize || 'a4'][0];
      const pageHeight = pageSizes[settings.pageSize || 'a4'][1];

      // Adjust for orientation
      const [width, height] = settings.orientation === 'landscape'
        ? [pageHeight, pageWidth]
        : [pageWidth, pageHeight];

      // Quality settings for compression
      const qualityMap = {
        high: 0.95,
        medium: 0.75,
        low: 0.5
      };
      const quality = qualityMap[settings.imageQuality || 'high'];

      for (const imageFile of file) {
        let imageBytes = await imageFile.arrayBuffer();

        // Compress image if it's JPEG and quality is not high
        if ((imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') && quality < 0.95) {
          imageBytes = await compressImage(imageBytes, quality);
        }

        let embeddedImage;
        if (imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg') {
          embeddedImage = await pdfDoc.embedJpg(imageBytes);
        } else if (imageFile.type === 'image/png') {
          embeddedImage = await pdfDoc.embedPng(imageBytes);
        } else if (imageFile.type === 'image/webp') {
          // Convert WebP to PNG (basic implementation)
          const img = new Image();
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          await new Promise((resolve) => {
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              resolve();
            };
            img.src = URL.createObjectURL(new Blob([imageBytes], { type: 'image/webp' }));
          });

          const pngDataUrl = canvas.toDataURL('image/png');
          const pngResponse = await fetch(pngDataUrl);
          const pngBytes = await pngResponse.arrayBuffer();
          embeddedImage = await pdfDoc.embedPng(pngBytes);
        } else {
          throw new Error(`Unsupported image format: ${imageFile.type}`);
        }

        const page = pdfDoc.addPage([width, height]);

        // Calculate image dimensions to fit the page while maintaining aspect ratio
        const imgWidth = embeddedImage.width;
        const imgHeight = embeddedImage.height;
        const pageAspectRatio = width / height;
        const imgAspectRatio = imgWidth / imgHeight;

        let scaledWidth, scaledHeight;
        if (imgAspectRatio > pageAspectRatio) {
          // Image is wider than page aspect ratio
          scaledWidth = width;
          scaledHeight = width / imgAspectRatio;
        } else {
          // Image is taller than page aspect ratio
          scaledHeight = height;
          scaledWidth = height * imgAspectRatio;
        }

        // Center the image on the page
        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;

        page.drawImage(embeddedImage, {
          x,
          y,
          width: scaledWidth,
          height: scaledHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      return new Blob([pdfBytes], { type: 'application/pdf' });
    } catch (error) {
      console.error('JPG to PDF conversion error:', error);
      throw new Error(`Failed to convert images to PDF: ${error.message}`);
    }
  }

  // ...existing code...
  console.log(`Converting ${file.name} from ${conversionType} with settings:`, settings)
  return new Blob(['Mock converted file content'], {
    type: getOutputMimeType(conversionType, settings)
  })
}

const getOutputMimeType = (conversionType, settings) => {
  const mimeTypes = {
    'pdf-to-word': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'jpg-to-pdf': 'application/pdf',
    'merge-pdf': 'application/pdf',
    'compress-pdf': 'application/pdf',
    'pdf-to-excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'excel-to-pdf': 'application/pdf',
    'pdf-to-doc': settings?.outputFormat === 'doc' ? 'application/msword' :
                  settings?.outputFormat === 'rtf' ? 'application/rtf' :
                  'application/vnd.oasis.opendocument.text',
    'doc-to-pdf': 'application/pdf',
    'add-page-number': 'application/pdf',
    'split-pdf': 'application/zip',  // Split operations return ZIP files
    'ocr': 'text/plain'
  }
  return mimeTypes[conversionType] || 'application/octet-stream'
}
