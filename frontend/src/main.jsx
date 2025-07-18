import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DashBoardLayout from "./Layout/DashBoardLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./Store/store.js";
import { Provider } from "react-redux";
import ModelViewer from "./Pages/ModelViewer.jsx";
import { LandingPage } from "./Pages/LandingPage.jsx";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import UploadFile from "./Pages/UploadFile.jsx";
import DashBoard from "./Pages/DashBoard.jsx";
import EntryLayout from "./Layout/EntryLayout.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <EntryLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/dashboard/model/:_id",
        element: <ModelViewer />,
      },
      {
        path: "/dashboard/uploadfile",
        element: <UploadFile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
);
