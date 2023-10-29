import { useDispatch, useSelector } from "react-redux";
import profile from "../assets/profile.jpg";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slice/apiSlice";
import { removeCredentials } from "../slice/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(removeCredentials());
    navigate("/");
  };

  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">MERN</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profile} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
            >
              {!userInfo ? (
                <>
                  <li>
                    <Link to="/login">
                      Sign In <FaSignInAlt />
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      Register <FaUser />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/profile">
                      Profile <FaUser />
                    </Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      Logout <FaSignOutAlt />
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
