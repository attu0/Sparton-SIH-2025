import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './ImageUpload.module.css'

function ImageUpload({ onImageSelect, isEnglish }) {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors.some(error => error.code === 'file-invalid-type')) {
        alert(isEnglish ? 'Please upload an image file' : 'कृपया प्रतिमा फाइल अपलोड करा')
      } else if (rejection.errors.some(error => error.code === 'file-too-large')) {
        alert(isEnglish ? 'File is too large. Please select a smaller image.' : 'फाइल खूप मोठी आहे. कृपया लहान प्रतिमा निवडा.')
      } else {
        alert(isEnglish ? 'Invalid file. Please try again.' : 'अवैध फाइल. कृपया पुन्हा प्रयत्न करा.')
      }
      return
    }

    // Handle accepted files
    if (acceptedFiles && acceptedFiles[0]) {
      onImageSelect(acceptedFiles[0])
    }
  }, [onImageSelect, isEnglish])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB max file size
  })

  // Dynamic class names based on drag state
  const getClassName = () => {
    let className = styles.dropzone
    if (isDragActive) {
      className += ` ${styles.dragging}`
    }
    if (isDragAccept) {
      className += ` ${styles.dragAccept}`
    }
    if (isDragReject) {
      className += ` ${styles.dragReject}`
    }
    return className
  }

  const getMainText = () => {
    if (isDragAccept) {
      return isEnglish ? 'Drop your image here' : 'येथे प्रतिमा ड्रॉप करा'
    }
    if (isDragReject) {
      return isEnglish ? 'Invalid file type' : 'अवैध फाइल प्रकार'
    }
    if (isDragActive) {
      return isEnglish ? 'Drop your image here' : 'येथे प्रतिमा ड्रॉप करा'
    }
    return isEnglish 
      ? 'Drag and drop an image here, or click to select'
      : 'येथे प्रतिमा ड्रॅग आणि ड्रॉप करा किंवा निवडण्यासाठी क्लिक करा'
  }

  return (
    <div
      {...getRootProps()}
      className={getClassName()}
    >
      <input {...getInputProps()} />
      <div>
        <div className={styles.icon}>
          {isDragReject ? '❌' : '📷'}
        </div>
        <p className={styles.mainText}>
          {getMainText()}
        </p>
        <p className={styles.supportText}>
          {isEnglish 
            ? 'Supports: JPG, PNG, GIF, WebP (Max: 10MB)' 
            : 'समर्थित: JPG, PNG, GIF, WebP (कमाल: 10MB)'
          }
        </p>
      </div>
    </div>
  )
}

export default ImageUpload