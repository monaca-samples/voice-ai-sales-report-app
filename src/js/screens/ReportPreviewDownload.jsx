import Box from '@mui/material/Box';
import htmlToPdf from './../htmlToPdf';
import htmlToTxt from './../htmlToTxt';
import { Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Fab from '@mui/material/Fab';
import { useLocation } from 'react-router-dom';

const ReportPreviewDownload = () => {
  const location = useLocation();
  const htmlContent = location.state.htmlContent;

  return (
    <Box display="flex" flexDirection="column" style={{ margin: '10px'}} gap={2} mx={2}>
    <Typography variant="h3" gutterBottom> Sales Report Preview</Typography>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Box sx={{ p:6, position: 'fixed', bottom: 0, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Fab style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }} onClick={() => htmlToPdf(htmlContent)}>
          <PictureAsPdfIcon />
        </Fab>
        <Fab style={{ backgroundColor: 'blue', color: 'white', marginLeft: '10px' }} onClick={() => htmlToTxt(htmlContent)}>
          <TextFieldsIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default ReportPreviewDownload;