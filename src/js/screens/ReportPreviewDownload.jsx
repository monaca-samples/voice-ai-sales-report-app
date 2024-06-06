import Box from '@mui/material/Box';
import htmlToPdf from './../htmlToPdf';
import { Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Fab from '@mui/material/Fab';

const ReportPreviewDownload = () => {

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

  return (
    <Box display="flex" flexDirection="column" gap={2} mx={2}>

      <Typography variant="h3" gutterBottom> Sales Report Preview</Typography>
      <div dangerouslySetInnerHTML={{ __html: myHtml }} />

      <Box sx={{ p:6, position: 'fixed', bottom: 0, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Fab style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }} onClick={() => htmlToPdf(myHtml)}>
          <PictureAsPdfIcon />
        </Fab>
        <Fab style={{ backgroundColor: 'blue', color: 'white', marginLeft: '10px' }} onClick={() => {alert('Not implemented')}}>
          <TextFieldsIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default ReportPreviewDownload;