import { FaLaptopMedical } from "react-icons/fa";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <span className="flex items-center justify-center gap-2 font-lobster text-4xl text-sky-900">
        AskDoc
        <FaLaptopMedical size={"1em"} />
      </span>{" "}
    </Link>
  );
};

export default Logo;
