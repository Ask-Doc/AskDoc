import PropTypes from "prop-types";

const ChatMessages = ({ message, role }) => {
  return (
    <div className={`flex h-fit w-full ${role === "user" && "bg-sky-50"}`}>
      <p
        className={`prose w-1 lg:prose-xl ${
          role === "user" ? "bg-sky-500" : "bg-green-500"
        }`}
      ></p>
      <p className="prose w-full p-6 lg:prose-xl">{message}</p>
    </div>
  );
};

ChatMessages.propTypes = {
  message: PropTypes.string,
  role: PropTypes.string,
};

export default ChatMessages;
