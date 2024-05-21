import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

const App = () => {
  const [transcript, setTranscript] = useState('');

  const startRecording = async () => {
    if (Capacitor.platform == 'web') {
      alert('Speech recognition is not available here');
      return;
    }

    const { speechRecognition } = await SpeechRecognition.requestPermissions();
    if (speechRecognition === 'granted') {
      SpeechRecognition.start({
        language: 'en-US',
        maxResults: 2,
        prompt: 'Say something',
        partialResults: true,
        popup: true,
      });
      SpeechRecognition.addListener('partialResults', (data) => {
        setTranscript(data.matches[0]);
      });
    }
  };
  
  const stopRecording = async () => {
    if (Capacitor.platform == 'web') {
      alert('Speech recognition is not available here');
      return;
    }

    SpeechRecognition.removeAllListeners();
    await SpeechRecognition.stop();
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        m: 2
      }}
    >
      <Typography variant="h2" gutterBottom>
        Speech to text
      </Typography>

      <Button variant="contained" color="primary" onClick={startRecording}>
        Start Recording
      </Button>

      <Button variant="contained" color="secondary" onClick={stopRecording}>
        Stop Recording
      </Button>

      <TextareaAutosize
        minRows={10}
        placeholder="Generated text will appear here..."
        style={{ width: '100%', padding: '1em' }}
        value={transcript}
      />
    </Box>
  );
}

export default App;