import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import geminiModel from './../gemini';
import Box from '@mui/material/Box';
import htmlToPdf from './../htmlToPdf';
import { Typography } from '@mui/material';

const NewScreen = () => {
  const location = useLocation();
  const transcript = location.state.transcript;
  const [input, setInput] = useState('');

  const myHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Sales Report</title>
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        padding: 8px;
        border: 1px solid #dddddd;
      }
    </style>
  </head>
  <body>
    <h1>Sales Report - May 28, 2024</h1>
    <h2>Client Visit Summary - PEPE Corporation</h2>
    <table>
      <tr>
        <th>Client Concerns</th>
        <td>Cost exceeding budget due to out-of-scope modifications, Need for on-time delivery by May 23rd for Q3 general meeting</td>
      </tr>
      <tr>
        <th>Client Request</th>
        <td>10% discount on the project cost</td>
      </tr>
    </table>
    <h2>Negotiation Outcome</h2>
    <p>Offered a 10% discount on the condition of:</p>
    <ul>
      <li>Assuming full responsibility for future app support for a minimum of 5 years.</li>
      <li>Securing a support contract at $100,000 annually.</li>
    </ul>
    <h2>Next Steps</h2>
    <ul>
      <li>Discuss the proposed discount and support contract with PEPE Corporation leadership.</li>
      <li>Prepare a formal quote outlining the revised pricing and support agreement.</li>
    </ul>
    <h3>Additional Notes</h3>
    <p>Ensure the revised quote clearly outlines the scope of the project, including the out-of-scope modifications and their associated costs. Clearly define the terms of the proposed support contract, including its duration, deliverables, and service level agreements (SLAs).</p>
  </body>
  </html>
  `;

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

        <Typography variant="h3" gutterBottom> Sales Report Example </Typography>

        <div dangerouslySetInnerHTML={{ __html: myHtml }} />

        <Button variant="contained" color="primary" onClick={() => htmlToPdf(myHtml)} style={{ pb: 5 }}>
          Generate PDF
        </Button> 
      </Box>
    </div>
  );
};

export default NewScreen;