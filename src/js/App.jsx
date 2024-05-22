import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

const App = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

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
        popup: false,
      });
      SpeechRecognition.addListener('partialResults', (data) => {
        setTranscript(data.matches[0]);
      });
      setIsRecording(true);
    }
  };
  
  const stopRecording = async () => {
    if (Capacitor.platform == 'web') {
      alert('Speech recognition is not available here');
      return;
    }

    SpeechRecognition.removeAllListeners();
    if (Capacitor.platform === 'ios') { // Android stops automatically
      await SpeechRecognition.stop();
    }
    setIsRecording(false);
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ p:4 }}>
        <Typography variant="h3" gutterBottom>
          Speech to text
        </Typography>
      </Box>
  
      <Box sx={{ width:'80%', flex: 1 }}>
        <TextareaAutosize
          minRows={10}
          placeholder="Generated text will appear here..."
          style={{ width: '100%', border: 'none'}}
          value={transcript}
        />
      </Box>
  
      <Box sx={{ p:8, position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
        {!isRecording ? (
          <Fab color="primary" onClick={startRecording}>
            <MicIcon />
          </Fab>
        ) : (
          <Fab color="secondary" onClick={stopRecording}>
            <StopIcon />
          </Fab>
        )}
      </Box>
    </Box>
  );
}

export default App;