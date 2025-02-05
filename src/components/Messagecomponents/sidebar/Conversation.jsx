// import { useSocketContext } from "../../../context/SocketContext";
// import React from 'react';
// import useConversation from "../../../zustand/useConversation";
// import { MessageCircle } from 'lucide-react';

// const Conversation = ({ conversation, lastIdx, emoji }) => {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { onlineUsers } = useSocketContext();
//   const isSelected = selectedConversation?._id === conversation._id;
//   const isOnline = onlineUsers.includes(conversation._id);

//   return (
//     <div className="relative bg-slate-400">
//       <div
//         className={`flex items-center gap-3 p-3 transition-all duration-200 
//           ${isSelected ? 'bg-sky-500/90' : 'hover:bg-gray-700/50'} 
//           rounded-lg cursor-pointer relative group`}
//         onClick={() => setSelectedConversation(conversation)}
//       >
//         {/* Avatar Section */}
//         <div className="relative">
//           <div className={`w-12 h-12 rounded-full overflow-hidden border-2 
//             ${isSelected ? 'border-white' : 'border-gray-600'} 
//             transition-all duration-200`}
//           >
//             {conversation.profilePic ? (
//               <img
//                 src={conversation.profilePic}
//                 // alt={`${conversation.fullName}'s avatar`}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-gray-600 flex items-center justify-center">
//                 <MessageCircle className="w-6 h-6 text-gray-300" />
//               </div>
//             )}
//           </div>
          
//           {/* Online Status Indicator */}
//           {isOnline && (
//             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full 
//               border-2 border-gray-800 transform translate-x-0.5 translate-y-0.5">
//               <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
//             </div>
//           )}
//         </div>

//         {/* Content Section */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <div className="flex items-center justify-between gap-2">
//             <p className={`font-semibold truncate ${isSelected ? 'text-black' : 'text-gray-700'}`}>
//               {conversation.name}
//             </p>
//             <span className="text-4xl ml-7 mt-4 flex-shrink-0">{emoji}</span>
//           </div>
          
//           {/* Optional: Last Message Preview */} 
//      <p className={`text-sm truncate ${isSelected ? 'text-white/90' : 'text-gray-400'}`}>
//             Click to start chatting
//           </p>
//         </div>

//         {/* Selection Indicator */}
//         {isSelected && (
//           <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
//         )}
//       </div>

//       {/* Divider */}
//       {!lastIdx && (
//         <div className="mx-3 h-7 w-16 bg-gray-700/50" />
//       )}
//     </div>
//   );
// };

// export default Conversation;

// // STARTER CODE SNIPPET
// // const Conversation = () => {
// // 	return (
// // 		<>
// // 			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// // 				<div className='avatar online'>
// // 					<div className='w-12 rounded-full'>
// // 						<img
// // 							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// // 							alt='user avatar'
// // 						/>
// // 					</div>
// // 				</div>

// // 				<div className='flex flex-col flex-1'>
// // 					<div className='flex gap-3 justify-between'>
// // 						<p className='font-bold text-gray-200'>John Doe</p>
// // 						<span className='text-xl'>🎃</span>
// // 					</div>
// // 				</div>
// // 			</div>

// // 			<div className='divider my-0 py-0 h-1' />
// // 		</>
// // 	);
// // };
// // export default Conversation;

// // const Conversation = ({ conversation, lastIdx, emoji }) => {
// //     const { selectedConversation, setSelectedConversation } = useConversation();
// //     // const { onlineUsers } = useSocketContext();
// //     const isSelected = selectedConversation?._id === conversation._id;

// //     // Retrieve user information from localStorage
// //     const user = JSON.parse(localStorage.getItem("jwt"));

// //     return (
// //         <>
// //             <div
// //                 className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
// //                 ${isSelected ? "bg-sky-500" : ""}
// //             `}
// //                 onClick={() => setSelectedConversation(conversation)}
// //             >
// //                 <div className="flex flex-col flex-1">
// //                     <div className="flex gap-3 justify-between">
// //                         {/* Show conversation name */}
// //                         <p className="font-bold text-gray-200">
// //                             {conversation.name || "Unknown"}
// //                         </p>
// //                         <span className="text-xl">{emoji}</span>
// //                     </div>
// //                     {user && (
// //                         <p className="text-sm text-gray-400">
// //                             Logged in as: {user.name}
// //                         </p>
// //                     )}
// //                 </div>
// //             </div>

// //             {!lastIdx && <div className="divider my-0 py-0 h-1" />}
// //         </>
// //     );
// // };

// // export default Conversation;

import { useSocketContext } from "../../../context/SocketContext";
import useConversation from "../../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  // Check if this conversation is selected
  const isSelected = selectedConversation?._id === conversation._id;

  // Check if the user in the conversation is online
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-600">{conversation.name}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {/* Divider between conversations */}
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;

