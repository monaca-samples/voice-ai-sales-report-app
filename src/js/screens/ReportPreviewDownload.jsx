import Box from '@mui/material/Box';
import htmlToPdf from './../htmlToPdf';
import htmlToTxt from './../htmlToTxt';
import { Typography, Divider } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Fab from '@mui/material/Fab';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ReportPreviewDownload = () => {
  const location = useLocation();
  const htmlContent = location.state.htmlContent;
  const transcript = location.state.transcript;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/', { state: { transcript }});
  };

  return (
    <Box display="flex" flexDirection="column" style={{ margin: '30px'}} gap={2} mx={2}>
      <Box sx={{ position: 'fixed', top: 'calc(env(safe-area-inset-top, 0px) + 30px)' }}>
        <Fab style={{ backgroundColor: 'blue', color: 'white', position: 'relative', marginBottom: '10px' }} onClick={handleBack}>
          <ArrowBackIcon />
        </Fab>
      </Box>
      <Typography mt="80px" variant="h4" gutterBottom> Sales Report Preview</Typography>
      <Divider />
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