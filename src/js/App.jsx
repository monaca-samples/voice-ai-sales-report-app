import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SpeechRecognition from "./screens/SpeechRecognition";
import NewScreen from "./screens/NewScreen"; // Import your new screen
import ReportPreviewDownload from "./screens/ReportPreviewDownload";

const App =() => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SpeechRecognition />,
    },
    {
      path: "/report-preview",
      element: <ReportPreviewDownload />
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