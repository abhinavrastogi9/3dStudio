import "@/App.css";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { verifyUserApiCall } from "../Store/userAuthentication/authenticationSlice.js";
function EntryLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, status } = useSelector(
    (state) => state.authenticationSlice
  );
  useEffect(() => {
    if (!isLoggedIn) {
      const page = "entry";
      dispatch(verifyUserApiCall(page));
    }
  }, []);
  useEffect(() => {
    if (status === "success") {
      navigate("/dashboard");
    }
  }, [status]);
  return (
    <>
      {!isLoggedIn && status == "failed" && (
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

export default EntryLayout;
