import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SpeechRecognition from "./screens/SpeechRecognition";
import NewScreen from "./screens/NewScreen"; // Import your new screen

const App =() => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SpeechRecognition />,
    },
    {
      path: "/new-screen",
      element: <NewScreen />,
    },
  ]);

  return(
    <RouterProvider router={router}/>
  );
}

export default App;
