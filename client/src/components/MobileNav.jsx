import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/Auth/authSlice";
import { reset as userReset } from "../features/User/userSlice";
import { reset as resetDiagnosis } from "../features/Diagnosis/diagnosisSlice";

const MobileNav = ({ close }) => {
  const { userAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    close();
    dispatch(logout());
    dispatch(reset());
    dispatch(userReset());
    dispatch(resetDiagnosis());
    navigate("/");
  };

  return (
    <div className="absolute inset-0 z-50 h-full w-full">
      {/* Dark overlay */}
      <button
        onClick={close}
        className=" h-full w-full bg-black opacity-30"
      ></button>

      <div className="z-60 absolute left-1/2 top-1/2 h-96 w-64 -translate-x-1/2 -translate-y-1/2 rounded bg-sky-50 p-4 text-gray-900">
        <ul className="flex flex-col gap-3">
          <li className="border-b  text-xl font-bold hover:border-sky-500 focus:border-sky-500">
            <Link onClick={close} className="block w-full p-2" to="/">
              Home
            </Link>
          </li>
          <li className="border-b  text-xl font-bold hover:border-sky-500 focus:border-sky-500">
            <Link onClick={close} className="block w-full p-2" to="/chat">
              Chat
            </Link>
          </li>
          <li className="border-b  text-xl font-bold hover:border-sky-500 focus:border-sky-500">
            <Link to="/about" onClick={close} className="block w-full p-2">
              About
            </Link>
          </li>
          {userAuth ? (
            <div className="flex flex-col gap-3">
              <li className="border-b text-xl font-bold hover:border-b hover:border-sky-500 focus:border-sky-500">
                <Link
                  onClick={(() => navigate("/profile"), close)}
                  className="block w-full p-2 "
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li className=" text-xl font-bold hover:border-b hover:border-sky-500 focus:border-sky-500">
                <button
                  onClick={onLogout}
                  className="block w-full p-2 text-left"
                >
                  Logout
                </button>
              </li>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <li className="border-b  text-xl font-bold hover:border-sky-500 focus:border-sky-500">
                <Link onClick={close} className="block w-full p-2 " to="/login">
                  Login
                </Link>
              </li>
              <li className=" text-xl font-bold hover:border-b hover:border-sky-500 focus:border-sky-500">
                <Link
                  onClick={close}
                  className="block w-full p-2"
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

MobileNav.propTypes = {
  close: PropTypes.func,
};

export default MobileNav;
