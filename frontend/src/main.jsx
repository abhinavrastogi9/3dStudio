import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./Store/store.js";
import { Provider } from "react-redux";
import ModelViewer from "./Component/Pages/ModelViewer.jsx";
import { LandingPage } from "./Component/Pages/LandingPage.jsx";
import SignIn from "./Component/Pages/SignIn.jsx";
import SignUp from "./Component/Pages/SignUp.jsx";
import UploadFile from "./Component/Pages/UploadFile.jsx";
import DashBoard from "./Component/Pages/DashBoard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/model",
        element: <ModelViewer />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/uploadfile",
        element: <UploadFile />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "*",
        element: <LandingPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
