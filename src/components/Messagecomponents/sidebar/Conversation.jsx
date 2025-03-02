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

// import { useSocketContext } from "../../../context/SocketContext";
// import useConversation from "../../../zustand/useConversation";

// const Conversation = ({ conversation, lastIdx, emoji }) => {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { onlineUsers } = useSocketContext();

//   // Check if this conversation is selected
//   const isSelected = selectedConversation?._id === conversation._id;

//   // Check if the user in the conversation is online
//   const isOnline = onlineUsers.includes(conversation._id);

//   return (
//     <>
//       <div
//         className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
//         ${isSelected ? "bg-sky-500" : ""}
//         `}
//         onClick={() => setSelectedConversation(conversation)}
//       >
//         <div className={`avatar ${isOnline ? "online" : ""}`}>
//           <div className="w-12 rounded-full">
//             <img src={conversation.profilePic} alt="user avatar" />
//           </div>
//         </div>

//         <div className="flex flex-col flex-1">
//           <div className="flex gap-3 justify-between">
//             <p className="font-bold ml-10 text-gray-600">{conversation.name}</p>
//             <span className="text-xl">{emoji}</span>
//           </div>
//         </div>
//       </div>

//       {/* Divider between conversations */}
//       {!lastIdx && <div className="divider my-0 py-0 h-1" />}
//     </>
//   );
// };

// export default Conversation;
// import { useSocketContext } from "../../../context/SocketContext";
// import useConversation from "../../../zustand/useConversation";
// import { useRef } from "react";

// // List of unique cartoon avatar URLs
// const cartoonAvatars = [
//   "https://i.pravatar.cc/150?img=1",
//   "https://i.pravatar.cc/150?img=2",
//   "https://i.pravatar.cc/150?img=3",
//   "https://i.pravatar.cc/150?img=4",
//   "https://i.pravatar.cc/150?img=5",
//   "https://i.pravatar.cc/150?img=6",
//   "https://i.pravatar.cc/150?img=7",
//   "https://i.pravatar.cc/150?img=8",
//   "https://i.pravatar.cc/150?img=9",
//   "https://i.pravatar.cc/150?img=10",
// ];

// const Conversation = ({ conversation, index, lastIdx, emoji }) => {
//   const { selectedConversation, setSelectedConversation } = useConversation();

//   // Store assigned avatars to prevent repetition
//   const assignedAvatars = useRef(new Map());

//   // Function to assign a unique avatar
//   const getUniqueAvatar = (id) => {
//     if (assignedAvatars.current.has(id)) {
//       return assignedAvatars.current.get(id);
//     }

//     const availableAvatars = cartoonAvatars.filter(
//       (avatar) => !Array.from(assignedAvatars.current.values()).includes(avatar)
//     );

//     const selectedAvatar =
//       availableAvatars.length > 0
//         ? availableAvatars[Math.floor(Math.random() * availableAvatars.length)]
//         : cartoonAvatars[Math.floor(Math.random() * cartoonAvatars.length)];

//     assignedAvatars.current.set(id, selectedAvatar);
//     return selectedAvatar;
//   };

//   const avatar = getUniqueAvatar(conversation._id);

//   // 🟢 Random Online/Offline Status
//   const isOnline = Math.random() > 0.5; // 50% chance for online/offline

//   return (
//     <>
//       <div
//         className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
//         ${selectedConversation?._id === conversation._id ? "bg-sky-500" : ""}
//         `}
//         onClick={() => setSelectedConversation(conversation)}
//       >
//         <div className="relative">
//           {/* Avatar Image */}
//           <div className="w-12 h-12 rounded-full overflow-hidden">
//             <img
//               src={avatar}
//               alt="Cartoon Avatar"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Online/Offline Indicator */}
//           <div
//             className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
//               isOnline ? "bg-green-500" : "bg-gray-400"
//             }`}
//           ></div>
//         </div>

//         <div className="flex flex-col flex-1">
//           <div className="flex gap-3 justify-between">
//             <p className="font-bold ml-4 text-gray-600">{conversation.name}</p>
//             <span className="text-xl">{emoji}</span>
//           </div>
//         </div>
//       </div>

//       {/* Divider between conversations */}
//       {!lastIdx && <div className="divider my-0 py-0 h-1" />}
//     </>
//   );
// };

// export default Conversation;

import { useSocketContext } from "../../../context/SocketContext";
import useConversation from "../../../zustand/useConversation";
import { useRef, useState, useEffect } from "react";

// Importing images from assets manually
import Australia from "../../../assets/img/Australia.png";
import Canada from "../../../assets/img/canada.png";
import Discuss from "../../../assets/img/discuss.jpg";
import Forget from "../../../assets/img/forget.png";
import I1 from "../../../assets/img/i.png";
import I2 from "../../../assets/img/i2.png";
import I3 from "../../../assets/img/i3.png";
import I4 from "../../../assets/img/i4.png";
import IELTS from "../../../assets/img/ielts.png";
import Library from "../../../assets/img/library.png";
import Login from "../../../assets/img/login.png";
import P1 from "../../../assets/img/p1.png";
import Profile from "../../../assets/img/profile.png";
import PTE from "../../../assets/img/pte.png";
import Register from "../../../assets/img/register.jpg";

// List of local avatar images (Ensure unique usage)
const localAvatars = [Australia, Canada, Discuss, Forget, I1, I2, I3, I4, IELTS, Library, Login, P1, Profile, PTE, Register];

const Conversation = ({ conversation, index, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const assignedAvatars = useRef(new Map()); // Store assigned avatars
  const [availableAvatars, setAvailableAvatars] = useState([...localAvatars]); // Track available avatars

  useEffect(() => {
    // Reset avatar tracking when component mounts
    assignedAvatars.current.clear();
    setAvailableAvatars([...localAvatars]);
  }, []);

  // Function to assign a unique avatar without repetition
  const getUniqueAvatar = (id) => {
    if (assignedAvatars.current.has(id)) {
      return assignedAvatars.current.get(id);
    }

    // If no avatars left, reset the list and start over
    if (availableAvatars.length === 0) {
      console.warn("All avatars assigned! Restarting...");
      setAvailableAvatars([...localAvatars]); // Reset available avatars
    }

    // Pick a random available avatar
    const randomIndex = Math.floor(Math.random() * availableAvatars.length);
    const selectedAvatar = availableAvatars[randomIndex];

    // Remove selected avatar from available list
    setAvailableAvatars((prev) => prev.filter((_, i) => i !== randomIndex));

    // Store assigned avatar
    assignedAvatars.current.set(id, selectedAvatar);
    return selectedAvatar;
  };

  const avatar = getUniqueAvatar(conversation._id);

  // 🟢 Random Online/Offline Status
  const isOnline = Math.random() > 0.5; // 50% chance for online/offline

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${selectedConversation?._id === conversation._id ? "bg-sky-500" : ""}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="relative">
          {/* Avatar Image (Only Show if Assigned) */}
          {avatar ? (
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              ❌
            </div> // Placeholder if no avatar is available
          )}

          {/* Online/Offline Indicator */}
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          ></div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold ml-4 text-gray-600">{conversation.name}</p>
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



