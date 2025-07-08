import "./App.css";
import { Outlet } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Component/Footer";
function App() {
  return (
    <>
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
