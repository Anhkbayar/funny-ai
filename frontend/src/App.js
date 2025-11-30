import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState("")
  const [error, setError] = useState("")

  const texts = [
    "Юу гарч ирч байна хаха",
    "Жалга2",
    "Хичээж л явна даа",
    "Сэтгэгдлээ үлдээгээрэй XD",
    "Чадлаараа л сургалаа хэхэ",
    "💩"
  ]

  const generateImage = async () => {
    setLoading(true)
    setImage(null)

    const randomPrompt = texts[Math.floor(Math.random() * texts.length)];
    setText(randomPrompt);

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/generate`)
      setImage("data: image/png;base64," + res.data.image)
      setError("")
    } catch (e) {
      if (e.response && e.response.status === 429) {
        setError("Минутад 10 зураг л гаргаж өгнөө.");
      } else {
        setError("Зураг үүсгэхэд алдаа гарлаа");
      }
    }

    setLoading(false)
  }
  return (
    <div className='container'>
      <h1>Зураг үүсгэгч XD</h1>

      <button onClick={generateImage} disabled={loading}>
        {loading ? "Үүсгэж байна..... " : "Үүсгэх"}
      </button>
      {image && <img src={image} alt="GAN test" style={{ width: 256, height: 256 }} className='generatedImage' />}
      {text && <p>{text}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
