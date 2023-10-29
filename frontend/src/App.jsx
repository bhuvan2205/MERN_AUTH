import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetProfileQuery } from "./slice/apiSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCredentials } from "./slice/authSlice";

function App() {
  const { data } = useGetProfileQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);
  return (
    <>
      <Header />
      <Outlet />

      <ToastContainer />
    </>
  );
}

export default App;
