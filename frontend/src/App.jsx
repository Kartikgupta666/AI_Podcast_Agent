import './App.css';
import axios from "axios";
import Loader from './Components/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [audio, setAudio] = useState(null);
  const [loader, setLoader] = useState(false);


  useEffect(() => {
    if (sessionStorage.getItem('title')) {
      axios.get(`http://localhost:8000/audio/${sessionStorage.getItem('title')}`)
        .then(response => {
          if (response.status === 200) {
            setAudio(`http://localhost:8000/audio/${sessionStorage.getItem('title')}`);
          }
        }
        ).catch(err => {
          console.error('Error fetching audio:', err);
          alert('Failed to fetch audio: ' + err.message);
        }
        )
    }
  },[sessionStorage.getItem('title')]);

  const handleGenerate = async () => {
    setLoader(true);
    if (!url.trim()) {
      alert('Please enter a title');
      setLoader(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/${url}`)
      if (response.status === 200) {
        sessionStorage.setItem('title', url);
        setLoader(false);
      }
    } catch (err) {
      alert('Failed to play audio: ' + err.message);
    } finally {
      setLoader(false);
    }
  };

  const handelDownload = async () => {
    setLoader(true);
    try {
      await axios.get(`http://localhost:8000/audio/${sessionStorage.getItem('title')}`,
        { responseType: 'blob' }
      ).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'audio/wav' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${sessionStorage.getItem('title')}.wav`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
        .catch(error => {
          console.error('Download failed:', error);
        });

    }
    catch (err) {
      alert('Failed to play audio: ' + err.message);
    } finally {
      setLoader(false);
    }
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r  from-blue-500 to-purple-500 text-white'>
      <h1 className='text-5xl mt-5 font-bold'>AI Podcast</h1>

      <div className='flex flex-col md:flex-row justify-center items-center my-10 gap-4'>
        <input
          type="text"
          placeholder='Enter your title'
          className='px-4 py-2 rounded-md w-80 text-black border-1 focus:outline-blue-400'
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button
          className='px-4 py-2 bg-blue-700 rounded-lg hover:bg-green-700 transition-all'
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>

      {loader && <Loader />}
      {audio && (<audio className='mb-5' controls src={audio}></audio>)}
      {sessionStorage.getItem('title') && <button onClick={handelDownload} className='px-4 py-2 bg-blue-700 rounded-lg hover:bg-green-700 transition-all'>Download {sessionStorage.getItem('title')}.wav </button>}
    </div>
  );
}

export default App;
