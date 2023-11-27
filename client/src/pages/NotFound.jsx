import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <main>
      <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-start px-4 md:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="grid w-full place-items-center pb-6">
            <Logo />
          </div>
          <h3 className="text-4xl font-semibold text-gray-800 sm:text-5xl">
            Page not found
          </h3>
          <p className="mt-3 text-gray-600">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>
          <div className="mt-5 grid w-full place-items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold uppercase text-blue-500"
            >
              <FaArrowLeft /> Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
