// import React, { useState } from 'react';
// import { BsSend } from "react-icons/bs";
// import useSendMessage from "../../../hooks/useSendMessage";


// const MessageInput = () => {
// 	const [message, setMessage] = useState("");
// 	const { loading, sendMessage } = useSendMessage();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (!message) return;
// 		await sendMessage(message);
// 		setMessage("");
// 	};

// 	return (
// 		<form className='px-4 my-3' onSubmit={handleSubmit}>
// 			<div className='w-full relative'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 					value={message}
// 					onChange={(e) => setMessage(e.target.value)}
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;



import React, { useState } from 'react';
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../../hooks/useSendMessage";

const MessageInput = ({aftersubmit}) => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
		aftersubmit()
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;




// ............
// import React, { useState } from "react";
// import { BsSend } from "react-icons/bs";

// const MessageInput = ({ aftersubmit, addLocalMessage }) => {
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     // **Instantly display the message before sending**
//     addLocalMessage(message);

//     setMessage(""); // Clear input field

//     // Call function to update backend and fetch new messages
//     await aftersubmit();
//   };

//   return (
//     <form className="px-4 my-3" onSubmit={handleSubmit}>
//       <div className="w-full relative">
//         <input
//           type="text"
//           className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
//           placeholder="Send a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
//           <BsSend />
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MessageInput;
























// ...............................new changes......................

// import React, { useState } from "react";
// import { BsSend } from "react-icons/bs";

// const MessageInput = ({ onSendMessage }) => {
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     onSendMessage(message); // Send message to frontend logic
//     setMessage(""); // Clear input field after sending
//   };

//   return (
//     <div className="w-full p-4 bg-gray-800">
//       <form className="w-full max-w-3xl mx-auto relative flex items-center" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit" className="absolute inset-y-0 right-3 flex items-center text-white">
//           <BsSend size={20} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MessageInput;
