import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return <>{!userInfo ? <Navigate to="/login" /> : <Outlet />}</>;
};

export default AuthProvider;
