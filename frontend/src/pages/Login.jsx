import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../slice/apiSlice";
import { setCredentials } from "../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Fields cannot be Empty!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
    }

    try {
      const data = await login({ email, password }).unwrap();
      toast.success("User Logged-In!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
      dispatch(setCredentials({ ...data }));
      navigate("/");
    } catch (error) {
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <div className="container mx-auto bg-base-200">
      <div className="flex items-center justify-center flex-col p-8">
        <h1 className="py-4 block text-3xl font-bold">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <div className="py-[10px]">
              <label htmlFor="email">Email Address</label>
            </div>
            <input
              id="email"
              type="email"
              placeholder="Enter your Email"
              className="input input-bordered input-primary w-[300px] sm:w-[400px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="py-4">
            <div className="py-[10px]">
              <label htmlFor="password">Password</label>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Enter your Password"
              className="input input-bordered input-primary w-[300px] sm:w-[400px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="py-4">
            <button
              className={`btn btn-primary ${isLoading && "animate-spin"}`}
              type="submit"
            >
              Login
            </button>
          </div>
          <div>
            New Customer?
            <Link to="/register">
              <span className="btn btn-link px-[2px] no-underline capitalize">
                Register
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
