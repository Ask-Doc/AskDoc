import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaSignOutAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { logout, reset } from "../features/Auth/authSlice";
import { reset as userReset } from "../features/User/userSlice";
import { reset as resetDiagnosis } from "../features/Diagnosis/diagnosisSlice";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import UserIcon from "./UserIcon";

const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isUserMenu, setIsUserMenu] = useState(false);

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
  const close = () => {
    setIsMobileMenu(false);
  };
  return (
    <nav className="bg-white text-sm text-gray-500">
      {isMobileMenu && <MobileNav close={close} />}
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center justify-between p-4">
          <div>
            <Link className="rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2">
              <Logo />
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex cursor-pointer items-center space-x-8 text-lg lg:space-x-12">
              <li className="group relative">
                <Link
                  to="/"
                  className="rounded-md px-2 py-1 focus:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                >
                  Home
                </Link>
                <div className="h-1 w-0 bg-sky-500 transition-all duration-200 group-hover:w-full"></div>
              </li>
              <li className="group relative">
                <Link
                  to="/chat"
                  className="rounded-md px-2 py-1 focus:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                >
                  Chat
                </Link>
                <div className="h-1 w-0 bg-sky-500 transition-all duration-200 group-hover:w-full "></div>
              </li>
              <li className="group relative">
                <Link
                  to="/about"
                  className="rounded-md px-2 py-1 focus:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                >
                  About
                </Link>
                <div className="h-1 w-0 bg-sky-500 transition-all duration-200 group-hover:w-full "></div>
              </li>
            </ul>
          </div>

          {/*  close user menu */}
          {isUserMenu && (
            <button
              onClick={() => setIsUserMenu(false)}
              className="absolute left-0 top-0 z-40 h-screen w-full bg-transparent"
            ></button>
          )}
          {userAuth ? (
            <div className="relative z-50 hidden md:block">
              <button className="" onClick={() => setIsUserMenu(!isUserMenu)}>
                <UserIcon />
              </button>

              {/* user menu */}
              {isUserMenu && (
                <div className="absolute right-0  h-fit w-40 bg-white shadow-lg">
                  <button
                    className="flex w-full items-center gap-2 border-b p-3 text-left text-xl font-bold transition-all hover:border-sky-500 hover:text-sky-500 focus:border-sky-500"
                    onClick={() => navigate("/profile")}
                  >
                    <FaUserCircle /> Profile
                  </button>
                  <button
                    onClick={onLogout}
                    className="flex w-full items-center gap-2 border-b p-3 text-left text-xl font-bold transition-all hover:border-sky-500 hover:text-sky-500 focus:border-sky-500"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden gap-3 md:flex">
              <Link
                to="/login"
                className="items-center justify-center rounded-md bg-white px-4 py-2 text-lg font-medium text-sky-500 hover:bg-sky-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 lg:flex"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="items-center justify-center rounded-md bg-sky-500 px-4 py-2 text-lg font-medium text-white hover:bg-sky-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 lg:flex"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          {
            <button
              onClick={() => setIsMobileMenu(true)}
              className="z-20 md:hidden"
            >
              {isMobileMenu ? (
                <FaTimes size="2.5em" />
              ) : (
                <FaPlus size="2.5em" />
              )}
            </button>
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;
