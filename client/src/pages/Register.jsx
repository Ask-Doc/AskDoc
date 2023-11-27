import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/Auth/authSlice";
import Loading from "../components/Loading";
import { FaEye } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [formInput, setFormInput] = useState({
    first_name: "",
    last_name: "",
    username: "",
    gender: "",
    phone_number: "",
    email: "",
    password: "",
    password2: "",
    lat: "",
    lon: "",
  });

  const {
    first_name,
    last_name,
    username,
    gender,
    phone_number,
    email,
    password,
    password2,
    // lat,
    // lon,
  } = formInput;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userAuth, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );
  // Get location - geoLocation is async, so we need to wait for it to complete before continuing, hence the promise. which is used in the useEffect
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // setUserLocation({ lat: latitude, lon: longitude });
            resolve({ lat: latitude, lon: longitude });
          },
          (error) => {
            // console.error("Error getting user location:", error);
            reject(error);
          },
        );
      } else {
        // console.error("Geolocation is not supported by this browser.");
        reject("Geolocation not supported");
      }
    });
  };

  const onChange = (e) => {
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("passwords do not match");
    } else {
      const data = {
        first_name,
        last_name,
        email,
        password,
        gender,
        username,
        phone_number,
        // lat,
        // lon
      };

      setShowPassword(false);
      setShowPassword2(false);

      dispatch(register(data));
    }
  };

  useEffect(() => {
    // Get user location on launch
    getUserLocation()
      .then((location) => {
        setFormInput((prev) => ({
          ...prev,
          lat: location.lat,
          lon: location.lon,
        }));
        // console.log("User location on mount:", location);
      })
      .catch((error) => {
        console.error("Error getting user location on mount:", error);
      });
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess) {
      navigate("/login");
      toast.success("success");
    }

    dispatch(reset());
  }, [isError, message, isSuccess, userAuth, dispatch, navigate]);

  useEffect(() => {
    // Redirect if logged in
    if (userAuth) {
      navigate("/getstarted");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuth]);

  return (
    <div>
      {isLoading && <Loading />}

      <main className="flex w-full flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-sm space-y-3 text-gray-600">
          <div className="pb-4 text-center">
            <Logo />
            <div className="mt-5">
              <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                Register a New Account
              </h3>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-2">
            <div>
              <label className="font-medium">First Name</label>
              <input
                onChange={onChange}
                type="text"
                id="first_name"
                name="first_name"
                value={first_name}
                required
                autoComplete="off"
                className="mt-2 w-full rounded-lg border border-gray-900 bg-transparent px-3 py-2 text-gray-800 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="font-medium">Last Name</label>
              <input
                onChange={onChange}
                type="text"
                id="last_name"
                name="last_name"
                value={last_name}
                required
                autoComplete="off"
                className="mt-2 w-full rounded-lg border border-gray-900 bg-transparent px-3 py-2 text-gray-800 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="font-medium">Username</label>
              <input
                onChange={onChange}
                type="text"
                id="username"
                name="username"
                value={username}
                required
                autoComplete="off"
                className="mt-2 w-full rounded-lg border border-gray-900 bg-transparent px-3 py-2 text-gray-800 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="font-medium">Email</label>
              <input
                onChange={onChange}
                type="email"
                id="email"
                name="email"
                value={email}
                autoComplete="off"
                required
                className="mt-2 w-full rounded-lg border border-gray-900 bg-transparent px-3 py-2 text-gray-800 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="font-medium">Gender</label>
              <select
                className="mt-2 w-full rounded-lg border border-gray-900 bg-transparent px-3 py-2 text-gray-800 shadow-sm outline-none focus:border-indigo-600"
                name="gender"
                id="gender"
                value={gender}
                onChange={onChange}
              >
                <option value="" disabled defaultValue hidden>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Phone No.</label>
              <input
                onChange={onChange}
                type="tel"
                id="phone_number"
                name="phone_number"
                value={phone_number}
                required
                autoComplete="off"
                className="mt-2 w-full rounded-lg border border-gray-900 bg-transparent px-3 py-2 text-gray-800 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>

            <div className="relative">
              <label className="font-medium">Password</label>
              <input
                onChange={onChange}
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                name="password"
                autoComplete="off"
                value={password}
                min="6"
                required
                className="mt-2 w-full rounded-lg border border-gray-900 bg-transparent px-3 py-2 text-gray-800 shadow-sm outline-none focus:border-indigo-600"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className={`${
                  showPassword ? "text-gray-800" : "text-gray-400"
                } absolute right-0.5 top-[2.3rem] p-2`}
              >
                <FaEye />
              </div>
            </div>
            <div className="relative">
              <label className="font-medium">Confirm Password</label>
              <input
                onChange={onChange}
                type={`${showPassword2 ? "text" : "password"}`}
                id="password2"
                name="password2"
                autoComplete="off"
                value={password2}
                required
                className="mt-2 w-full rounded-lg border border-gray-900 bg-transparent px-3 py-2 text-gray-800 shadow-sm outline-none focus:border-indigo-600"
              />
              <div
                onClick={() => setShowPassword2(!showPassword2)}
                className={`${
                  showPassword2 ? "text-gray-800" : "text-gray-400"
                } absolute right-0.5 top-[2.3rem] p-2`}
              >
                <FaEye />
              </div>
            </div>

            <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600">
              Register{" "}
            </button>
          </form>
          {/* <button className="flex w-full items-center justify-center gap-x-3 rounded-lg border py-2.5 text-sm font-medium duration-150 hover:bg-gray-50 active:bg-gray-100">
            <svg
              className="h-5 w-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>{" "}
            Continue with Google
          </button> */}
          <p className="text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              log in{" "}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
