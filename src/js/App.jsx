import React from 'react';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const App = () => {
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

      <Button variant="contained" color="primary">
      Start Recording
      </Button>

      <Button variant="contained" color="secondary">
      Stop Recording
      </Button>

      <TextareaAutosize
      minRows={10}
      placeholder="Generated text will appear here..."
      style={{ width: '100%', padding: '1em' }}
      />
    </Box>
  );
}

export default App;
