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

      const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      });

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
      {/* Intro video at the top (selective play) */}
      <h1>How to use</h1>
      <div className="intro-video-container">
        <div className="video-container">
          <iframe
            className="intro-video-iframe"
            src="https://drive.google.com/file/d/1Mi2Kk5P4-D-k1JDC08OQyIx8m3Afa-6F/preview"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
      <img src="/rover.jpg" alt="Logo" className="logo" />
      <div className="logo-text">
        <p>An unmanned guided vehicle designed to carry around 20kg of weight and travel through the terrains of a farm. The weight includes all the components required for communication, sensors,pesticide container, and robotic arm for pesticide spraying. The main motive of the UGV is to detect if the crop is infected and spray the pesticide only on infected plant. This is to be achieved by the ML system, communication protocols, and website based control.</p>
      </div>
      <h1>Try Yourself</h1>
      <div className="app-container">
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
