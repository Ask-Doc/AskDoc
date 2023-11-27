import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Header from "../components/Header";
import {
  createProfile,
  editUserProfile,
  getUserProfile,
} from "../features/User/userSlice";
import Loading from "../components/Loading";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const [isDisabled, setIsDisabled] = useState(null);
  const [profileData, setProfileData] = useState({
    age: "",
    blood_group: "",
    height: "",
    weight: "",
    genotype: "",
    Medical_records: "",
  });

  const { age, blood_group, height, weight, genotype, Medical_records } =
    profileData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user,
  );
  const { userAuth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile(userAuth.user));
  }, [dispatch, userAuth.user]);

  useEffect(() => {
    if (user) {
      setIsEdit(true);
      setProfileData(user);
      setIsDisabled(true);
      setIsProfileLoaded(true);
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      setIsProfileLoaded(true);
    }

    // if (!isEdit) {
    //   toast.info("Please complete your profile registration to use AskDoc");
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isEdit, message, isSuccess, user]);

  const onChange = (e) => {
    // if (e.target.type === "file") {
    //   const file = e.target.files[0];
    //   if (file) {
    //     // Read the file content and convert it to base64
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       setProfileData((prev) => ({
    //         ...prev,
    //         image: reader.result, // Set the base64 string to the image field
    //       }));
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // }

    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!isEdit) {
      dispatch(createProfile(profileData));
    }

    if (isEdit) {
      const data = {
        data: profileData,
        user: userAuth.user,
      };
      dispatch(editUserProfile(data));
    }

    if (isSuccess) {
      toast.success("success");
    }
    // if (isError) {
    //   toast.error(message);
    //   setIsProfileLoaded(true);
    // }
  };

  return (
    <div>
      {isLoading || (!isProfileLoaded && <Loading />)}

      <Header />

      <main className="flex w-full flex-col items-center justify-center px-4 py-6">
        <div className="mb-6 flex items-center gap-10">
          <h1 className=" text-2xl font-bold uppercase md:text-3xl md:font-extrabold">
            {isEdit
              ? `${userAuth.username}'s Profile`
              : "Complete Registration"}
          </h1>
          {isEdit && (
            <button
              onClick={() => setIsDisabled(false)}
              className="text-sky-500 active:scale-95"
            >
              <FaEdit size="1.3em" />
            </button>
          )}
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="gap-8 space-y-2 lg:flex lg:space-y-0">
            <div className="space-y-2">
              <div>
                <label className="font-medium">Age</label>
                <input
                  onChange={onChange}
                  type="number"
                  id="age"
                  name="age"
                  value={age}
                  required
                  disabled={isDisabled}
                  className={`mt-2 w-full rounded-lg border bg-transparent px-3 py-2  shadow-sm outline-none focus:border-indigo-600 ${
                    isDisabled
                      ? "text-gray-500"
                      : "border-gray-900 text-gray-800 "
                  }`}
                />
              </div>

              <div>
                <label className="font-medium">
                  Height <span className="font-bold">{`(metres)`}</span>
                </label>
                <input
                  onChange={onChange}
                  type="text"
                  id="height"
                  name="height"
                  value={height}
                  required
                  disabled={isDisabled}
                  className={`mt-2 w-full rounded-lg border bg-transparent px-3 py-2  shadow-sm outline-none focus:border-indigo-600 ${
                    isDisabled
                      ? "text-gray-500"
                      : "border-gray-900 text-gray-800 "
                  }`}
                />
              </div>

              <div>
                <label className="font-medium">
                  Weight <span className="font-bold">{`(Kg)`}</span>
                </label>
                <input
                  onChange={onChange}
                  type="text"
                  id="weight"
                  name="weight"
                  value={weight}
                  required
                  disabled={isDisabled}
                  className={`mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-indigo-600 ${
                    isDisabled
                      ? "text-gray-500"
                      : "border-gray-900 text-gray-800 "
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="font-medium">Blood Group</label>
                <select
                  className={`mt-2 w-full rounded-lg border bg-transparent px-3 py-2  shadow-sm outline-none focus:border-indigo-600 ${
                    isDisabled
                      ? "text-gray-500"
                      : "border-gray-900 text-gray-800 "
                  }`}
                  name="blood_group"
                  id="blood_group"
                  value={blood_group}
                  onChange={onChange}
                  disabled={isDisabled}
                >
                  <option value="" disabled defaultValue hidden>
                    Select your blood group
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="O">O</option>
                  <option value="AB">AB</option>
                  <option value="">Don&apos;t Know</option>
                </select>
              </div>

              <div className="">
                <label className="font-medium">Genotype</label>
                <select
                  className={`mt-2 w-full rounded-lg border bg-transparent px-3 py-2  shadow-sm outline-none focus:border-indigo-600 ${
                    isDisabled
                      ? "text-gray-500"
                      : "border-gray-900 text-gray-800 "
                  }`}
                  name="genotype"
                  id="genotype"
                  value={genotype}
                  disabled={isDisabled}
                  onChange={onChange}
                >
                  <option value="" disabled defaultValue hidden>
                    Select Genotype
                  </option>
                  <option value="AA">AA</option>
                  <option value="AC">AC</option>
                  <option value="AS">AS</option>
                  <option value="CC">CC</option>
                  <option value="SC">SC</option>
                  <option value="SS">SS</option>
                  <option value="">Don&apos;t Know</option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="font-medium">Medical Record</label>
            <textarea
              onChange={onChange}
              type="text"
              name="Medical_records"
              id="Medical_records"
              value={Medical_records}
              disabled={isDisabled}
              className={`mt-2 w-full rounded-lg border bg-transparent px-3 py-2  shadow-sm outline-none focus:border-indigo-600 ${
                isDisabled ? "text-gray-500" : "border-gray-900 text-gray-800 "
              }`}
              rows="4"
            ></textarea>
            <input />
          </div>

          {/* <div>
            <label className="font-medium">image</label>
            <input
              type="file"
              className=""
              id="image"
              onChange={onChange}
              max="1"
              accept=".jpg,.png,.jpeg"
            />
          </div> */}

          <div className="w-full lg:mt-4 lg:flex lg:justify-center">
            <button
              disabled={isDisabled}
              className={`w-full rounded-lg bg-sky-500  px-4 py-2 font-medium text-white duration-150 hover:bg-sky-700 focus:ring-sky-400  lg:w-96 ${
                isDisabled ? "opacity-70" : "opacity-100 active:bg-indigo-800"
              }`}
            >
              {isEdit ? "Update Profile" : "Save Profile"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
