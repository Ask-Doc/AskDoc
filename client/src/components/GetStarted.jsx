import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../features/User/userSlice";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { toast } from "react-toastify";

const GetStarted = () => {
  const [wait, setWait] = useState(true);
  const { user, isLoading, message } = useSelector((state) => state.user);
  const { userAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileOrChat = () => {
    return new Promise((resolve) => {
      dispatch(getUserProfile(userAuth.user));
      resolve(user);
    });
  };

  useEffect(() => {
    profileOrChat()
      .then((user) => {
        if (user) {
          setWait(false);
          navigate("/chat");
        }
        if (message) {
          setWait(false);
          navigate("/profile");
          toast.info("Please complete your registration to proceed");
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        // Handle error if needed
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, message, user, message, navigate]);

  // useEffect(() => {
  //   if (!wait) {
  //     if (user) {
  //       navigate("/chat");
  //     } else {
  //       navigate("/profile");
  //     }
  //   }
  // }, [navigate, user, wait]);

  if (isLoading || wait) {
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  }
};

export default GetStarted;
