import "@/App.css";
import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { verifyUserApiCall } from "../Store/userAuthentication/authenticationSlice.js";
function DashBoardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, status } = useSelector(
    (state) => state.authenticationSlice
  );
  useEffect(() => {
    if (!isLoggedIn) {
      const page="dashboard"
      dispatch(verifyUserApiCall(page));
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (status === "failed") {
      navigate("/signin");
    }
  }, [status]);
  return (
    <>
      {isLoggedIn && status === "success" && (
        <>
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default DashBoardLayout;
