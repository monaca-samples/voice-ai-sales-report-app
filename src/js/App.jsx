import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

const App = () => {
  const [transcript, setTranscript] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [continueRecording, setContinueRecording] = useState(false);

  const startRecording = async (continueRecording = false) => {
    setContinueRecording(continueRecording);
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
      setIsRecording(true);

      let timeoutId = null;
      if (Capacitor.platform === 'android') {
        // Set a timeout to stop the recording after 5 seconds
        timeoutId = setTimeout(stopRecording, 2 * 1000);
      }

      //alert(continueRecording ? 'Continue recording...' : 'Start recording...')

      SpeechRecognition.addListener('partialResults', (data) => {
        if (continueRecording) {
          setCurrentTranscript(data.matches[0]);
        } else {
          setTranscript([data.matches[0]]);
        }

        if (Capacitor.platform === 'android') {
          // If a result is received, clear the timeout and set a new one
          clearTimeout(timeoutId);
          timeoutId = setTimeout(stopRecording, 2 * 1000);
        }

      });
    }
  };
  
  const stopRecording = async () => {

    // Combine the current transcript with the previous ones
    if (continueRecording) {
      setTranscript([...transcript, currentTranscript]);
      setCurrentTranscript('');
      setContinueRecording(false);
    }

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
          value={[...transcript, currentTranscript].join(' ')}
        />
      </Box>
  
      <Box sx={{ p:8, position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
        {!isRecording ? (
          <Box display="flex" justifyContent="center" gap={2} width="100%">
            <Fab color="primary" onClick={() => startRecording(false)}>
              <MicIcon />
            </Fab>
            {transcript[0] && (
              <Fab color="primary" onClick={() => startRecording(true)} style={{ minWidth: '100px' }}>
                Continue
              </Fab>
            )}
          </Box>
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