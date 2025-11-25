# TODO: Fix PDF Crop Page Prepare Not Working

## Tasks
- [x] 1. Fix import in src/pages/PdfCrop.jsx: Change UploadCropPdf to UploadPdfcrop and ensure prop passing.
- [x] 2. Update src/components/UploadPdfcrop.jsx:
  - [x] Add missing React imports (useState, useRef).
  - [x] Fix CSS import to '../styles/PdfCropper.css'.
  - [x] Accept and use isDarkMode prop for dark mode classes.
- [x] 3. Improve crop UX in UploadPdfcrop.jsx:
  - [x] Make crop params relative (%) instead of absolute pts.
  - [x] Display detected page size (use min/avg across pages).
- [x] 4. Implement proper visual crop in cropPdf():
  - [x] Improved with per-page %->pts conversion, setCropBox + setSize for visual resize/clip.
- [ ] 5. Test: Run dev server, navigate to /pdf-crop (likely route), upload PDF, adjust crop (e.g., 10% all sides), verify preview/download shows cropped visually (smaller pages, margins removed).
- [ ] 6. Update this TODO with completions and mark [x].
