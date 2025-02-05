// // import { AuthContext } from "../../../context/AuthContext";
// import { extractTime } from "../../../utils/extractTime";
// import useConversation from "../../../zustand/useConversation";

// const Message = ({ message }) => {
// 	// Check if message exists and has the required properties
// 	if (!message || !message.senderId || !message.createdAt) {
// 		return null; // Return null to avoid rendering the component if message is invalid
// 	}
// 	const { selectedConversation } = useConversation();
// 	const loggedInUser = JSON.parse(localStorage.getItem("jwt"));
// 	const fromMe = loggedInUser?.user?._id === message.senderId; // Check if loggedInUser and user exist
// 	const formattedTime = extractTime(message.createdAt);
// 	const chatClassName = fromMe ? "chat-end" : "chat-start";
// 	const profilePic = fromMe ? loggedInUser.profilePic : selectedConversation?.profilePic;
// 	const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-500"; // Default background for others

// 	const shakeClass = message.shouldShake ? "shake" : "";

// 	return (
// 		<div className={`chat ${chatClassName}`}>
// 			<div className='chat-image avatar'>
// 				<div className='w-10 rounded-full'>
// 					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
// 				</div>
// 			</div>
// 			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
// 				{message.message}
// 			</div>
// 			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
// 				{formattedTime}
// 			</div>
// 		</div>
// 	);
// };

// export default Message;

import { extractTime } from "../../../utils/extractTime";
import useConversation from "../../../zustand/useConversation";

const Message = ({ message }) => {
  // Handle case where message or user might be undefined
  const jwt = localStorage.getItem("jwt");
  const { user } = jwt ? JSON.parse(jwt) : { user: null };
  const { selectedConversation } = useConversation();

  if (!message) {
    return null; // If no message is passed, render nothing
  }

  const fromMe = message.senderId === user?._id; // Use optional chaining
  const formattedTime = message.createdAt
    ? extractTime(message.createdAt)
    : "Unknown Time"; // Handle missing createdAt
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? user?.profilePic || "/default-profile.png" // Fallback to default profile picture
    : selectedConversation?.profilePic || "/default-profile.png";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Chat profile"
            src={profilePic}
            onError={(e) => (e.target.src = "/default-profile.png")} // Fallback if image fails to load
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message || "No message provided"} {/* Fallback for empty message */}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
     \
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
