import "./App.css";
import { Outlet } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
function App() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

export default App;
