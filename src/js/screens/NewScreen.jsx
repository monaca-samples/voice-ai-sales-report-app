import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SalesReportEx from './../SalesReportEx';
import geminiModel from './../gemini';
import Box from '@mui/material/Box';

const NewScreen = () => {
  const location = useLocation();
  const transcript = location.state.transcript;
  const [input, setInput] = useState('');

  const fetchAnswer = async () => {
    const result = await geminiModel.generateContent(input);
    const response = await result.response;
    const text = response.text();
    alert(text);
  };

  return (
    <div>
      <p>{transcript}</p>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Prompt"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={fetchAnswer}>
          Generate Answer
        </Button>
      </Box>
      <SalesReportEx />
    </div>
  );
};

export default NewScreen;