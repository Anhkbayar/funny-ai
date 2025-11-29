import logo from './logo.svg';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const generateImage = async () => {
    setLoading(true)
    setImage(null)

    try {
      const res = await axios.get("http://localhost:8000/generate")
      setImage("data: image/png;base64," + res.data.image)
    } catch (e) {
      console.error(e)
      alert("Зураг үүсгэхэд алдаа гарлаа")
    }

    setLoading(false)
  }
  return (
    <div className='container'>
      <h1>Зураг үүсгэгч XD</h1>

      <button onClick={generateImage} disabled={loading}>
        {loading ? "Үүсгэж байна..... " : "Үүсгэх"}
      </button>
      <div className='picContainer'>
        {image && <img src={image} alt="GAN test" className='generatedImage' />}
      </div>
    </div>
  );
}

export default App;
