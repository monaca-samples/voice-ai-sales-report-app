import { useLocation } from 'react-router-dom';

const NewScreen = () => {
  const location = useLocation();
  const transcript = location.state.transcript;

  return (
    <div>
      <h1>New Screen</h1>
      <p>{transcript}</p>
    </div>
  );
};

export default NewScreen;