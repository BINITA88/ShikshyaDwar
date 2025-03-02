// import { useEffect } from "react";
// import useConversation from "../../../zustand/useConversation";
// import MessageInput from "../messages/MessageInput";
// import Messages from "../messages/Message";
// import { TiMessages } from "react-icons/ti";

// const MessageContainer = () => {
//     const { selectedConversation, setSelectedConversation } = useConversation();

//     // Retrieve user from localStorage (JWT)
//     const { user } = JSON.parse(localStorage.getItem("jwt")) || {};

//     useEffect(() => {
//         // Cleanup function (unmounts)
//         return () => setSelectedConversation(null);
//     }, [setSelectedConversation]);

//     return (
//         <div className="md:min-w-[450px] flex flex-col">
//             {/* Display user's name if available */}
//             {user && (
//                 <div className="px-4 py-2 text-lg font-semibold text-gray-800">
//                     Hello, {user.name}!
//                 </div>
//             )}

//             {/* Render conversation or NoChatSelected */}
//             {!selectedConversation ? (
//                 <NoChatSelected name={user?.name || "Guest"} />
//             ) : (
//                 <>
//                     {/* Header */}
//                     <div className="bg-slate-500 px-4 py-2 mb-2">
//                         <span className="label-text">To:</span>{" "}
//                         <span className="text-gray-900 font-bold">{selectedConversation.user}</span>
//                     </div>
//                     <Messages />
//                     <MessageInput />
//                 </>
//             )}
//         </div>
//     );
// };

// import { useEffect, useState } from "react";
// import useConversation from "../../../zustand/useConversation";
// import MessageInput from "../messages/MessageInput";
// import Messages from "../messages/Message";
// import { TiMessages } from "react-icons/ti";
// import useGetMessages from "../../../hooks/useGetMessages";
// import { isAuthenticated } from "../../../auth";

// const MessageContainer = () => {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { messages: messageList } = useGetMessages();
// const { token } = isAuthenticated();
//   const [getMessageList,setMessageList]=useState()
  

//   useEffect(()=>{
//     if(messageList){
//       setMessageList(messageList)
//     }
//   },[messageList])

//   useEffect(() => {
//     // Cleanup function to reset selected conversation
//     return () => setSelectedConversation(null);
//   }, [setSelectedConversation]);

//   const aftersubmit=async ()=>{
//     const res=await fetch(
//       `/api/messages/${selectedConversation._id}`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const data = await res.json();
//     setMessageList(data)
//   }

//   return (
//     <div className="md:min-w-[450px] flex flex-col">
//       {!selectedConversation ? (
//         <NoChatSelected />
//       ) : (
//         <>
//           <div className="bg-slate-500 px-4 py-2 mb-2">
//             <span className="label-text">To:</span>{" "}
//             <span className="text-gray-900 font-bold">
//               {selectedConversation.name}
//             </span>
//           </div>
//           <Messages />
//           <MessageInput aftersubmit={aftersubmit}/>
//           <div>
//             {getMessageList?.map(i => {
//               return <>
//                 <div>
//                   <div>
//                     {/* {i?.senderId},{i?.receiverId} */}
//                   </div>
//                   <div>
//                     {i?.message}
//                   </div>
//                 </div>
//               </>
//             })}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
// export default MessageContainer;

// const NoChatSelected = () => {
//   const { user } = JSON.parse(localStorage.getItem("jwt")) || {};
//   return (
//     <div className="flex items-center justify-center w-full h-full">
//       <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
//         <p>Welcome 👋 {user?.name} ❄</p>
//         <p>Select a chat to start messaging</p>
//         <TiMessages className="text-3xl md:text-6xl text-center" />
//       </div>
//     </div>
//   );
// };






// import { useEffect, useState } from "react";
// import useConversation from "../../../zustand/useConversation";
// import MessageInput from "../messages/MessageInput";
// import { TiMessages } from "react-icons/ti";
// import useGetMessages from "../../../hooks/useGetMessages";
// import { isAuthenticated } from "../../../auth";

// const MessageContainer = () => {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { messages: messageList } = useGetMessages();
//   const { token } = isAuthenticated();
//   const [getMessageList, setMessageList] = useState([]);

//   // Set messageList to state when it changes
//   useEffect(() => {
//     if (messageList) {
//       setMessageList(messageList);
//     }
//   }, [messageList]);

//   // Cleanup to reset selected conversation on unmount
//   useEffect(() => {
//     return () => setSelectedConversation(null);
//   }, [setSelectedConversation]);

//   // Fetch messages after submission (e.g., new message)
//   const aftersubmit = async () => {
//     if (!selectedConversation?._id) return;

//     try {
//       const res = await fetch(`/api/messages/${selectedConversation._id}`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       setMessageList(data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   return (
//     <div className="md:min-w-[450px] flex flex-col">
//       {!selectedConversation ? (
//         <NoChatSelected />
//       ) : (
//         <>
//           <div className="bg-slate-500 px-4 py-2 mb-2">
//             <span className="label-text">To:</span>{" "}
//             <span className="text-gray-900 font-bold">
//               {selectedConversation.name}
//             </span>
//           </div>
//           {/* Display existing messages */}
//           <div className="flex-grow overflow-auto">
//             {getMessageList?.length > 0 ? (
//               getMessageList.map((i, index) => (
//                 <div key={index} className="p-2 border-b">
//                   <div className="text-sm text-gray-600">
//                     {i?.senderId === selectedConversation._id
//                       ? "Receiver"
//                       : "You"}:
//                   </div>
//                   <div>{i?.message}</div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500 p-4">
//                 No messages yet.
//               </div>
//             )}
//           </div>
//           {/* Message input component */}
//           <MessageInput aftersubmit={aftersubmit} />
//         </>
//       )}
//     </div>
//   );
// };

// export default MessageContainer;

// // NoChatSelected component for when no chat is selected
// const NoChatSelected = () => {
//   const { user } = JSON.parse(localStorage.getItem("jwt")) || {};
//   return (
//     <div className="flex items-center justify-center w-full h-full">
//       <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
//         <p>Welcome 👋 {user?.name} ❄</p>
//         <p>Select a chat to start messaging</p>
//         <TiMessages className="text-3xl md:text-6xl text-center" />
//       </div>
//     </div>
//   );
// };



// import { useEffect, useState } from "react";
// import useConversation from "../../../zustand/useConversation";
// import MessageInput from "../messages/MessageInput";
// import Messages from "../messages/Message";
// import { TiMessages } from "react-icons/ti";
// import useGetMessages from "../../../hooks/useGetMessages";
// import { isAuthenticated } from "../../../auth";

// const MessageContainer = () => {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { messages: messageList } = useGetMessages();
//   const { token } = isAuthenticated();
  
//   // Initialize as an empty array to avoid undefined issues
//   const [getMessageList, setMessageList] = useState([]);

//   useEffect(() => {
//     if (messageList) {
//       setMessageList(messageList);
//     }
//   }, [messageList]);

//   useEffect(() => {
//     // Cleanup function to reset selected conversation
//     return () => setSelectedConversation(null);
//   }, [setSelectedConversation]);

//   const aftersubmit = async () => {
//     const res = await fetch(
//       `/api/messages/${selectedConversation._id}`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const data = await res.json();
//     setMessageList(data);
//   };

//   return (
//     <div className="md:min-w-[450px] flex flex-col">
//       {!selectedConversation ? (
//         <NoChatSelected />
//       ) : (
//         <>
//           <div className="bg-slate-500 px-4 py-2 mb-2">
//             <span className="label-text">To:</span>{" "}
//             <span className="text-gray-900 font-bold">
//               {selectedConversation.name}
//             </span>
//           </div>
//           <Messages />
//           <MessageInput aftersubmit={aftersubmit} />
//           <div>
//             {Array.isArray(getMessageList) && getMessageList.length > 0 ? (
//               getMessageList.map((i) => (
//                 <div key={i._id}>
//                   <div>
//                     {/* {i?.senderId},{i?.receiverId} */}
//                   </div>
//                   <div>{i?.message}</div>
//                 </div>
//               ))
//             ) : (
//               <p>No messages yet</p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
// export default MessageContainer;

// const NoChatSelected = () => {
//   const { user } = JSON.parse(localStorage.getItem("jwt")) || {};
//   return (
//     <div className="flex items-center justify-center w-full h-full">
//       <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
//         <p>Welcome 👋 {user?.name} ❄</p>
//         <p>Select a chat to start messaging</p>
//         <TiMessages className="text-3xl md:text-6xl text-center" />
//       </div>
//     </div>
//   );
// };


// ...............................new changes..................................
import { useEffect, useState } from "react";
import useConversation from "../../../zustand/useConversation";
import MessageInput from "../messages/MessageInput";
import { TiMessages } from "react-icons/ti";
import useGetMessages from "../../../hooks/useGetMessages";
import { isAuthenticated } from "../../../auth";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { messages: messageList } = useGetMessages();
  const { token, user } = isAuthenticated(); // Get user details
  
  // Initialize as an empty array to avoid undefined issues
  const [getMessageList, setMessageList] = useState([]);

  useEffect(() => {
    if (messageList) {
      setMessageList(messageList);
    }
  }, [messageList]);

  useEffect(() => {
    // Cleanup function to reset selected conversation
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const aftersubmit = async () => {
    const res = await fetch(
      `/api/messages/${selectedConversation._id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setMessageList(data);
  };

  return (
    <div className="w-full flex flex-col h-screen bg-blue-100">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className=" px-6 py-3 mb-4 text-black font-bold text-lg">
            <span>Chat with: {selectedConversation.name}</span>
          </div>

          {/* Messages Display */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {Array.isArray(getMessageList) && getMessageList.length > 0 ? (
              getMessageList.map((msg) => (
                <div 
                  key={msg._id} 
                  className={`flex w-full my-2 ${
                    msg.senderId === user._id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div 
                    className={`max-w-[75%] p-3 rounded-lg text-white shadow-md ${
                      msg.senderId === user._id 
                        ? "bg-blue-500 self-end text-right"  // Sender (Right)
                        : "bg-gray-700 self-start text-left" // Receiver (Left)
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-black">No messages yet</p>
            )}
          </div>

          {/* Message Input */}
          <div className="px-6 pb-4">
            <MessageInput aftersubmit={aftersubmit} />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { user } = JSON.parse(localStorage.getItem("jwt")) || {};
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-6 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-3">
        <p>Welcome 👋 {user?.name} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-4xl md:text-6xl text-center" />
      </div>
    </div>
  );
};




// import { useEffect, useState } from "react";
// import useConversation from "../../../zustand/useConversation";
// import MessageInput from "../messages/MessageInput";
// import Message from "../messages/Message";
// import { isAuthenticated } from "../../../auth";
// import toast from "react-hot-toast";

// const MessageContainer = () => {
//   const { selectedConversation } = useConversation();
//   const { token, user } = isAuthenticated();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (selectedConversation?._id) {
//       loadMessagesFromLocalStorage();
//       fetchMessagesFromBackend();
//     }
//   }, [selectedConversation?._id]);

//   // **Fetch Messages from Backend and Store in Local Storage**
//   const fetchMessagesFromBackend = async () => {
//     if (!selectedConversation?._id) return;
//     setLoading(true);
//     try {
//       console.log("Fetching messages for conversation:", selectedConversation._id);
//       const res = await fetch(`/api/messages/${selectedConversation._id}`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         console.error("API Error Response:", errorData);
//         throw new Error(errorData.error || "Failed to fetch messages");
//       }

//       const data = await res.json();
//       console.log("Fetched Messages:", data);
//       setMessages(data || []);

//       // **Save messages to localStorage**
//       localStorage.setItem("chat_messages", JSON.stringify({ [selectedConversation._id]: data }));

//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       toast.error("Error fetching messages.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // **Load Messages from Local Storage on Page Refresh**
//   const loadMessagesFromLocalStorage = () => {
//     const storedMessages = JSON.parse(localStorage.getItem("chat_messages")) || {};
//     setMessages(storedMessages[selectedConversation._id] || []);
//   };

//   // **Send Message and Update Local Storage**
//   const sendMessage = (messageText) => {
//     if (!selectedConversation?._id) {
//       toast.error("No conversation selected!");
//       return;
//     }
//     if (!messageText.trim()) {
//       toast.error("Message cannot be empty!");
//       return;
//     }

//     // **Create a new message**
//     const newMessage = {
//       _id: Date.now().toString(),
//       senderId: user._id,
//       receiverId: selectedConversation._id,
//       message: messageText.trim(),
//       createdAt: new Date().toISOString(),
//     };

//     // **Instantly update the UI**
//     setMessages((prevMessages) => {
//       const updatedMessages = [...prevMessages, newMessage];

//       // **Save updated messages to localStorage**
//       const storedMessages = JSON.parse(localStorage.getItem("chat_messages")) || {};
//       storedMessages[selectedConversation._id] = updatedMessages;
//       localStorage.setItem("chat_messages", JSON.stringify(storedMessages));

//       return updatedMessages;
//     });
//   };

//   return (
//     <div className="w-full flex flex-col h-screen bg-gray-900">
//       {!selectedConversation ? (
//         <p className="text-center text-gray-400">Select a chat to start messaging</p>
//       ) : (
//         <>
//           <div className="bg-slate-500 px-4 py-2 mb-2 text-white font-bold">
//             <span>To: {selectedConversation.name}</span>
//           </div>

//           {/* Message Display Area */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-2">
//             {loading ? (
//               <p className="text-center text-gray-400">Loading messages...</p>
//             ) : messages.length > 0 ? (
//               messages.map((message) => <Message key={message._id} message={message} />)
//             ) : (
//               <p className="text-center text-gray-400">No messages yet</p>
//             )}
//           </div>

//           {/* Message Input */}
//           <MessageInput onSendMessage={sendMessage} />
//         </>
//       )}
//     </div>
//   );
// };

// export default MessageContainer;
