import "@/App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
function EntryLayout() {
  // const { isLoggedIn } = useSelector((state) => state.authenticationSlice);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (isLoggedIn) navigate("/dashboard");
  //   else {
  //     navigate("/signin");
  //   }
  // }, [isLoggedIn]);
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

export default EntryLayout;
