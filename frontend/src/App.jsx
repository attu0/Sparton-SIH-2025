import { useState } from 'react'
import Navbar from './components/Navbar'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import PredictionResult from './PredictionResult'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isEnglish, setIsEnglish] = useState(true)

  const handleLanguageChange = (isEnglish) => {
    setIsEnglish(isEnglish)
  }

  const handleImageSelect = (image) => {
    setSelectedImage(image)
    setPrediction(null)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedImage)

      const apiUrl = import.meta.env.VITE_API_URL || 'https://plant-disease-api-vk3v.onrender.com'
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to get prediction')
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar onLanguageChange={handleLanguageChange} isEnglish={isEnglish} />
      <div className="app-container">
        <h1>{isEnglish ? 'AI Plant Disease Detection' : 'AI वनस्पती रोग शोध'}</h1>
        <div className="main-content">
          <div className="left-panel">
            <ImageUpload onImageSelect={handleImageSelect} isEnglish={isEnglish} />
            <ImagePreview image={selectedImage} isEnglish={isEnglish} />
          </div>
          <div className="right-panel">
            <PredictionResult 
              prediction={prediction}
              isLoading={isLoading}
              error={error}
              isEnglish={isEnglish}
            />
            {selectedImage && (
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (isEnglish ? 'Processing...' : 'प्रक्रिया करत आहे...') : (isEnglish ? 'Classify Image' : 'प्रतिमा वर्गीकृत करा')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
