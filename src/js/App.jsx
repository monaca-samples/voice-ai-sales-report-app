import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SpeechRecognition from "./screens/SpeechRecognition";
import ReportConfiguration from "./screens/ReportConfiguration";
import NewScreen from "./screens/NewScreen"; // Import your new screen

const App =() => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SpeechRecognition />,
    },
    {
      path: "/report-configuration",
      element: <ReportConfiguration />,
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