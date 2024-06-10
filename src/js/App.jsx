import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SpeechRecognition from "./screens/SpeechRecognition";
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
  ]);

  return(
    <RouterProvider router={router}/>
  );
}

export default App;