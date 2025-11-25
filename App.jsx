import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'

import Footer from './components/Footer'
import Home from './pages/Home'
import PDFToWord from './pages/PDFToWord'
import JPGToPDF from './pages/JPGToPDF'
import MergePDF from './pages/MergePDF'
import PDFToExcel from './pages/PDFToExcel'
import ExcelToPdf from './pages/ExcelToPdf'
import CompressPDF from './pages/CompressPDF'
import SplitPDF from './pages/SplitPDF'
import PDFToDoc from './pages/PDFToDoc'
import UploadDocToPdf from './components/UploadDocToPdf'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ContactUs from './pages/ContactUs'
import PDFToPowerPoint from './pages/PDFToPowerPoint'
import OrganizePage from './pages/OrganizePage'
import HtmlToPdf from './pages/HtmlToPdf'
import RemovePdfPage from './pages/RemovePdfPage'
import AddPageNumber from './pages/AddPageNumber'
import AiVoiceEditer from './pages/AiVoiceEditer'
import CropImage from './pages/CropImage'
import Pdfcrop from './pages/PdfCrop'
import RepairPdf from './components/UploadRepairPdf'
import RotatePPdf from './pages/RotatePdf'
import PdfToOcr from './pages/PdfToOcr'
import ScanToPdf from './pages/ScanToPdf'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ThreeDARPdf from './pages/ThreeDARPdf'
import EditPdf from './pages/EditPdf'
import PdfToPdfA from './pages/PdfToPdfA'
import './styles/App.css'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              
              {/* PDF Tools Routes */}
              <Route path="/pdf-to-word" element={<PDFToWord />} />
              <Route path="/jpg-to-pdf" element={<JPGToPDF />} />
              <Route path="/merge-pdf" element={<MergePDF />} />
              <Route path="/pdf-to-excel" element={<PDFToExcel />} />
              <Route path="/excel-to-pdf" element={<ExcelToPdf />} />
              <Route path="/compress-pdf" element={<CompressPDF />} />
              <Route path="/split-pdf" element={<SplitPDF />} />
              <Route path="/pdf-to-doc" element={<PDFToDoc />} />
              <Route path="/doc-to-pdf" element={<UploadDocToPdf />} />
              
              <Route path="/pdf-to-powerpoint" element={<PDFToPowerPoint />} />

              <Route path="/organize-page" element={<OrganizePage />}/>
              <Route path="/html-to-pdf" element={<HtmlToPdf />} />
              <Route path="/pdf-remove-page" element={<RemovePdfPage />} />

              <Route path="/repair-pdf" element={<RepairPdf />} />
              <Route path="/rotate-pdf" element={<RotatePPdf />} />
              <Route path="/pdf-to-ocr" element={<PdfToOcr />} />
              <Route path="/scan-to-pdf" element={<ScanToPdf />} />

              <Route path="/add-page-number" element={<AddPageNumber />} />

              <Route path="/crop-image" element={<CropImage />} />
              <Route path="/edit-pdf" element={<EditPdf />} />
              <Route path="/ai-voice-editer" element={<AiVoiceEditer />} />
              <Route path="/pdf-crop" element={<Pdfcrop />} />
              <Route path="/pdf-to-pdfa" element={<PdfToPdfA />} />
              <Route path="/three-d-ar-pdf" element={<ThreeDARPdf />} />
              

            </Routes>
            
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}





export default App


