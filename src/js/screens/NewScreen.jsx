import { useLocation } from 'react-router-dom';
import SalesReportEx from './../SalesReportEx'; // adjust the path as needed

const NewScreen = () => {
  const location = useLocation();
  const transcript = location.state.transcript;

  return (
    <div>
      <p>{transcript}</p>
      <SalesReportEx />
    </div>
  );
};

export default NewScreen;