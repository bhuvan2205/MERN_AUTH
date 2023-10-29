import { useDispatch, useSelector } from "react-redux";
import Stats from "../components/Stats";
import { useState } from "react";
import { useUpdateProfileMutation } from "../slice/apiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slice/authSlice";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo?.name);
  const [changeName, setChangeName] = useState(false);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
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
      await updateProfile({ name, email: userInfo.email });
      dispatch(setCredentials({ ...userInfo, name }));
      setChangeName(false);
      toast.success("Profile updated!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
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

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center py-20 gap-20">
        <Stats
          email={userInfo.email}
          name={userInfo.name}
          setChangeName={setChangeName}
          changeName={changeName}
        />
        {changeName && (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="py-4">
                <div className="py-[10px]">
                  <label htmlFor="name">User Name</label>
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Change User Name"
                  className="input input-bordered input-primary w-[300px] sm:w-[400px]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="py-4">
                <button
                  className={`btn btn-primary ${isLoading && "animate-spin"}`}
                  type="submit"
                  disabled={userInfo.name === name}
                >
                  Change Name
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
