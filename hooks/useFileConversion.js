import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { saveAs } from 'file-saver'
import { convertFile } from '../utils/conversion'

export const useFileConversion = (options = {}) => {
  const [files, setFiles] = useState([])
  const [isConverting, setIsConverting] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: options.acceptedFileTypes?.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {}),
    maxFiles: options.maxFiles || 1,
    maxSize: options.maxSize || 10000000, // 10MB default
  })

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const processFiles = async (file, conversionType, settings = {}) => {
    await convert(file, conversionType, settings)
  }

  const convert = async (file, conversionType, settings = {}) => {
    setIsConverting(true)

    try {
      // Simulate API call - replace with actual conversion service
      const convertedBlob = await convertFile(file, conversionType, settings)

      // Generate download
      const fileName = file.name ? file.name.replace(/\.[^/.]+$/, '') : 'converted'
      const extension = getOutputExtension(conversionType, settings)

      // For split operations, we typically get a ZIP file
      if (conversionType === 'split-pdf') {
        saveAs(convertedBlob, `${fileName}-split.zip`)
      } else {
        saveAs(convertedBlob, `${fileName}.${extension}`)
      }

    } catch (error) {
      throw new Error(`Conversion failed: ${error.message}`)
    } finally {
      setIsConverting(false)
    }
  }

  const getOutputExtension = (conversionType, settings = {}) => {
    const extensions = {
      'pdf-to-word': 'docx',
      'jpg-to-pdf': 'pdf',
      'merge-pdf': 'pdf',
      'compress-pdf': 'pdf',
      'pdf-to-excel': 'xlsx',
      'excel-to-pdf': 'pdf',
      'pdf-to-doc': settings.outputFormat === 'doc' ? 'rtf' :
                    settings.outputFormat === 'rtf' ? 'rtf' :
                    settings.outputFormat === 'odt' ? 'odt' : 'rtf',
      'doc-to-pdf': 'pdf',
      'split-pdf': 'zip',  // Split operations typically return a ZIP file
      'repair-pdf': 'pdf',
      'rotate-pdf': 'pdf',
      'crop-pdf': 'pdf',
      '3d-ar-pdf': 'pdf',
      'ai-voice-editer': 'mp3',
      'ocr': 'txt',
      'pdf-to-html': 'html',
      'pdf-to-powerpoint': 'pptx',
      'pdf-remove-page': 'pdf',
      'add-page-number': 'pdf',
      'crop-image': 'png',
      'pdf-to-ocr': 'pdf',

       'edit-pdf': 'pdf',
      // Add more mappings as needed
    }
    return extensions[conversionType] || 'pdf'
  }

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    files,
    removeFile,
    processFiles,
    convert,
    isConverting
  }
}
