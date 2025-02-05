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

import { useEffect, useState } from "react";
import useConversation from "../../../zustand/useConversation";
import MessageInput from "../messages/MessageInput";
import Messages from "../messages/Message";
import { TiMessages } from "react-icons/ti";
import useGetMessages from "../../../hooks/useGetMessages";
import { isAuthenticated } from "../../../auth";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { messages: messageList } = useGetMessages();
const { token } = isAuthenticated();
  const [getMessageList,setMessageList]=useState()
  

  useEffect(()=>{
    if(messageList){
      setMessageList(messageList)
    }
  },[messageList])

  useEffect(() => {
    // Cleanup function to reset selected conversation
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const aftersubmit=async ()=>{
    const res=await fetch(
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
    setMessageList(data)
  }

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.name}
            </span>
          </div>
          <Messages />
          <MessageInput aftersubmit={aftersubmit}/>
          <div>
            {getMessageList?.map(i => {
              return <>
                <div>
                  <div>
                    {/* {i?.senderId},{i?.receiverId} */}
                  </div>
                  <div>
                    {i?.message}
                  </div>
                </div>
              </>
            })}
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
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {user?.name} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
