import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ChatMessages from "../components/ChatMessages";
// import { FaArrowRight } from "react-icons/fa";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { startDiagnosis, reset } from "../features/Diagnosis/diagnosisSlice";
import { FaArrowLeft } from "react-icons/fa";

const Chat = () => {
  const [beginDiagnosis, setBeginDiagnosis] = useState(true);
  // const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const { message, user } = useSelector((state) => state.user);
  const { diagnosis, isSuccess, isLoading } = useSelector(
    (state) => state.diagnosis,
  );
  const currentUser = { ...user };
  delete currentUser["id"];
  delete currentUser["user"];
  delete currentUser["date_created"];
  delete currentUser["date_updated"];
  const medical_history = JSON.stringify(currentUser);

  const [chatLog, setChatLog] = useState([]);

  const [formInput, setFormInput] = useState({
    problem: "",
    symptoms: "",
  });

  const { problem, symptoms } = formInput;

  const onChange = (e) => {
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (message) {
  //     // navigate("/profile");
  //   }
  // }, [message, navigate]);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let newChatLog = [...chatLog, { role: "user", message: `${input}` }];

  //   setInput("");

  //   setChatLog(newChatLog);
  // };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }, [chatLog]);

  const onSubmit = (e) => {
    e.preventDefault();
    const diagnosisInput = formInput;
    formInput.medical_history = medical_history;

    dispatch(startDiagnosis(diagnosisInput));
    let newChatLog = [
      ...chatLog,
      {
        role: "user",
        message: `${formInput.problem}. ${formInput.symptoms}`,
      },
    ];
    setChatLog(newChatLog);
  };

  useEffect(() => {
    if (isSuccess) {
      setBeginDiagnosis(false);
    }
  }, [isSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  const newSymptom = () => {
    dispatch(reset());
    setFormInput("");
    setBeginDiagnosis(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-sky-200">
      <Header />
      {beginDiagnosis && (
        <div className="absolute inset-0 z-10 h-full w-full bg-sky-800"></div>
      )}
      {beginDiagnosis && (
        <div className="absolute left-1/2 top-1/2 z-20 flex w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-xl  bg-white px-5 py-7 lg:w-2/4">
          <Link
            to="/"
            className="absolute left-1.5 top-1 flex items-center gap-2 font-bold text-blue-500"
          >
            <FaArrowLeft /> Go Home
          </Link>
          <h4 className="text-center font-bold">Start Diagnosis</h4>
          <span className="text-center text-sm">
            Please provide responses below to initiate diagnosis
          </span>
          <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-xl ">
            <div>
              <label className="font-medium">Problem</label>
              <textarea
                onChange={onChange}
                type="text"
                id="problem"
                name="problem"
                value={problem}
                required
                placeholder="Briefly describe your health concern..."
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
              ></textarea>
            </div>
            <div>
              <label className="font-medium">Symptoms</label>
              <textarea
                onChange={onChange}
                type="text"
                id="symptoms"
                name="symptoms"
                value={symptoms}
                required
                placeholder="List your symptoms, separated by commas..."
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
              ></textarea>
            </div>

            <button
              className="w-full rounded-lg bg-sky-500 px-4 py-2
              font-medium text-white  duration-150 hover:bg-sky-700 focus:ring-sky-400 "
            >
              Start Diagnosis
            </button>
          </form>
        </div>
      )}

      <div className="tranform absolute bottom-7 left-1/2 w-3/4 -translate-x-1/2  [&>*]:border-b [&>*]:border-sky-500">
        {/* Chat box */}
        <div
          ref={chatBoxRef}
          className="h-[500px] overflow-x-hidden overflow-y-scroll rounded-t-lg bg-sky-100"
        >
          {Array.isArray(diagnosis) ? (
            diagnosis.map((chat, index) => (
              <ChatMessages
                key={index}
                message={chat.message}
                role={chat.role}
              />
            ))
          ) : (
            <ChatMessages role="gpt" message={"No messages yet"} />
          )}
        </div>

        {/* input */}
        {/* <form
          onSubmit={handleSubmit}
          className="flex h-16 w-full rounded-b-lg bg-white px-4 py-4 text-lg font-bold shadow-xl shadow-sky-400 sm:h-20"
        >
          <input
            className="h-full w-11/12 rounded-lg outline-none sm:w-5/6"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="message"
          />
          <div className="grid h-full w-1/12 place-items-end sm:w-1/6 sm:place-items-center">
            <button className="h-full rounded-lg text-white shadow-sky-200 drop-shadow-2xl transition-shadow active:shadow-none sm:w-16 sm:bg-sky-500 sm:shadow-inner md:w-24">
              <span className="hidden sm:block">Send</span>
              <FaArrowRight className="text-gray-800 sm:hidden" />
            </button>
          </div>
        </form> */}

        <div className="grid h-14 w-full place-items-center bg-white ">
          <button
            onClick={newSymptom}
            className=" h-10 w-fit place-items-end rounded-lg bg-sky-500  px-2 text-white shadow-inner shadow-sky-200 drop-shadow-2xl transition-shadow active:shadow-none md:w-24"
          >
            <span className="">New</span>
            {/* <FaArrowRight className="text-gray-800 sm:hidden" /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
