import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaArrowRight,
  FaAt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaCheck,
} from "react-icons/fa";
import Header from "../components/Header";
import onlineTest from "../assets/online_test.svg";
import person from "../assets/person-using-pc-.webp";
import metrics1 from "../assets/metrics-img-1.png";
import { FaStethoscope } from "react-icons/fa";

const Home = () => {
  const { userAuth } = useSelector((state) => state.auth);

  return (
    <div>
      {/* Header/Nav*/}
      <div>
        <Header />
      </div>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col bg-white px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
          <h1 className="text-4xl capitalize text-gray-800 md:text-6xl">
            get a quick and courteous diagnosis for your health concerns{" "}
          </h1>
          <p className="pt-6 text-xl font-light text-gray-400">
            AskDoc is your AI companion for instant symptom insights and medical
            guidance. Unlock the power of AI-driven conversations, providing you
            with rapid responses and informed suggestions. Your virtual health
            advisor is just a chat away!
          </p>
        </div>

        {userAuth ? (
          <Link
            to="/getstarted"
            className="mx-auto mt-8 flex items-center gap-4 rounded-md bg-sky-500 px-6 py-3 text-lg font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400  focus:ring-offset-2"
          >
            <span className="font-bold">Diagnose Now</span>{" "}
            <FaStethoscope size="1.5em" className="text-gray-500" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="mx-auto mt-8 flex items-center gap-4 rounded-md bg-sky-500 px-6 py-3 text-lg font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400  focus:ring-offset-2"
          >
            <span>Get Started</span> <FaArrowRight />
          </Link>
        )}
      </section>

      {/* <!-- Image section --> */}
      <section className="w-full">
        <div className="relative h-full w-full">
          <div className="relative z-30 mx-auto w-4/5 max-w-5xl overflow-hidden rounded-xl px-4 sm:w-full sm:px-8">
            <div className=" aspect-video w-auto overflow-hidden rounded-xl">
              {/*  */}
              <img className="h-full w-full object-cover" src={person} alt="" />
            </div>
          </div>
          <div className="absolute bottom-0 h-1/2 w-full">
            <div className="absolute top-0 z-10 h-[6vw] w-full -translate-y-1/2 -skew-y-3 transform bg-white"></div>
            <div className="absolute top-0 z-0 h-full w-full bg-sky-900"></div>
          </div>
        </div>
      </section>

      {/* <!-- 3 Steps section --> */}
      <section className="w-full bg-sky-900">
        <div className="relative h-full w-full pb-[6vw] pt-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center px-4 sm:flex-row sm:px-8">
            <div className="text-center sm:order-2 sm:text-left">
              <h2 className="text-3xl text-white">
                Revolutionizing the way you approach healthcare, our application
                leverages AI to guide users through symptom descriptions,
                offering preliminary medical advice instantly.
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Say goodbye to uncertainty and hello to informed decisions about
                your health.
              </p>
            </div>
            <div className="mx-[15vw] mt-6 sm:mx-0 sm:mt-0 sm:pr-16">
              <img src={onlineTest} alt="" className="h-auto w-full" />
            </div>
          </div>
          <div className="mx-auto mb-24 mt-12 flex max-w-5xl flex-col px-4 sm:flex-row sm:px-8">
            <div className="relative flex flex-1 flex-row sm:flex-col sm:items-start">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 p-6 text-xl text-gray-100">
                1
              </div>
              <div className="absolute top-6 z-0 hidden w-full border-b-2 border-gray-600 sm:block"></div>
              <div className="mb-10 ml-6 w-auto sm:mb-0 sm:ml-0 sm:mr-6">
                <h3 className="text-gray-100 sm:mt-4">Register an account</h3>
                <p className="mt-2 text-gray-300">
                  Provide the necessary data about your person to get up and
                  running.
                </p>
              </div>
            </div>
            <div className="relative flex flex-1 flex-row sm:flex-col sm:items-start">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 p-6 text-xl text-gray-100">
                2
              </div>
              <div className="absolute top-6 z-0 hidden w-full border-b-2 border-gray-600 sm:block"></div>
              <div className="mb-10 ml-6 w-auto sm:mb-0 sm:ml-0 sm:mr-6">
                <h3 className="text-gray-100 sm:mt-4">
                  Share symptoms with AskDoc
                </h3>
                <p className="mt-2 text-gray-300">
                  through an intuitive conversation discuss your symptoms with
                  our AI health chatbot
                </p>
              </div>
            </div>
            <div className="relative flex flex-1 flex-row sm:flex-col sm:items-start">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 p-6 text-xl text-gray-100">
                3
              </div>
              <div className="mb-10 ml-6 w-auto sm:mb-0 sm:ml-0 sm:mr-6">
                <h3 className="text-gray-100 sm:mt-4">
                  Recieved informed response{" "}
                </h3>
                <p className="mt-2 text-gray-300">
                  Get a personalized response on the symptoms you shared
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 z-10 h-[6vw] w-full translate-y-1/2 skew-y-3 transform bg-white"></div>
        </div>
      </section>

      {/* <!-- Metrics section --> */}
      <section className="relative z-20 w-full">
        <div className="relative -top-24 mx-auto flex max-w-5xl flex-col px-4 pt-8 md:flex-row md:px-8">
          <div className="relative md:order-2 md:w-1/2">
            <div className="mx-auto w-full max-w-md">
              <div className="aspect-w-7 aspect-h-8 relative w-full">
                <div className="absolute h-auto w-full">
                  <img
                    src={metrics1}
                    alt=""
                    className="absolute left-0 top-0 z-20 hidden h-auto w-2/3 rounded-xl border shadow-2xl md:block"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 md:w-1/2">
            <div className="relative z-20 flex h-full flex-col justify-center pt-4 md:pr-8 md:pt-0">
              <h2 className="text-3xl text-gray-800">
                Effortless Health Management: Simplifying Symptom Tracking and
                Beyond
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Gathering and analyzing your symptoms is a key part of personal
                health, but the amount of time and effort it takes to collect,
                study and research symptoms can be a challenge. We store all of
                your health information in a secure database with powerful
                reporting tools tools to make it easy to manage.
              </p>
              <ul className="grid grid-cols-1 gap-4 py-8 text-green-800 md:grid-cols-2">
                <li className="flex">
                  <div className="mr-2 h-6 w-6 rounded-full bg-green-50 p-1">
                    <FaCheck size="0.9em" />
                  </div>
                  Report Summaries
                </li>
                <li className="flex">
                  <div className="mr-2 h-6 w-6 rounded-full bg-green-50 p-1">
                    <FaCheck size="0.9em" />
                  </div>
                  Symptom tracking
                </li>
                <li className="flex">
                  <div className="mr-2 h-6 w-6 rounded-full bg-green-50 p-1">
                    <FaCheck size="0.9em" />
                  </div>
                  Hospital Liason
                </li>
                <li className="flex">
                  <div className="mr-2 h-6 w-6 rounded-full bg-green-50 p-1">
                    <FaCheck size="0.9em" />
                  </div>
                  On/offboarding
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Get started button --> */}
      <section className="w-full bg-sky-900 py-16">
        <hr className="mx-auto max-w-5xl border-gray-600 pb-12" />
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:gap-0 sm:px-6 sm:text-left lg:px-8">
          <div>
            <h2 className="text-xl text-gray-200">
              Register today. Get started now.
            </h2>
            <p className="mt-1 text-lg text-gray-400">
              No more headaches. We simplify symptom identification
            </p>
          </div>
          <Link
            to="/login"
            className="flex items-center justify-center rounded-md bg-sky-600 px-6 py-3 text-lg font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:ring-offset-sky-900"
          >
            Get Started
          </Link>
        </div>
        <hr className="mx-auto mt-12 max-w-5xl border-gray-600" />
      </section>

      <footer className="bg-sky-900">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-200 hover:text-gray-400">
              <span className="sr-only">Facebook</span>
              <FaFacebook size="1.5em" />
            </a>

            <a href="#" className="text-gray-200 hover:text-gray-400">
              <span className="sr-only">Instagram</span>
              <FaInstagram size="1.5em" />
            </a>

            <a href="#" className="text-gray-200 hover:text-gray-400">
              <span className="sr-only">Twitter</span>
              <FaTwitter size="1.5em" />
            </a>

            <a href="#" className="text-gray-200 hover:text-gray-400">
              <span className="sr-only">Mail</span>
              <FaAt size="1.5em" />
            </a>
          </div>
          <p className="mt-8 text-center text-base text-gray-200">
            &copy; 2023<a href="#"> AskDoc</a>, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
