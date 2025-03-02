// const { useEffect, useRef } = require("react");
// const useGetMessages = require("../../hooks/useGetMessages");
// const MessageSkeleton = require("../skeletons/MessageSkeleton");
// const Message = require("./Message");
// const useListenMessages = require("../../hooks/useListenMessages");

// const Messages = () => {
//     const { message, loading } = useGetMessages();
//     useListenMessages();
//     const lastMessageRef = useRef();

//     useEffect(() => {
//         setTimeout(() => {
//             lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//         }, 100);
//     }, [message]);

//     return (
//         <div className='px-4 flex-1 overflow-auto'>
//             {!loading &&
//                 message.length > 0 &&
//                 message.map((message) => (
//                     <div key={message._id} ref={lastMessageRef}>
//                         <Message message={message} />
//                     </div>
//                 ))}

//             {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
//             {!loading && message.length === 0 && (
//                 <p className='text-center'>Send a message to start the conversation</p>
//             )}
//         </div>
//     );
// };

// export default Messages;

const { useEffect, useRef } = require("react");
const useGetMessages = require("../../../hooks/useGetMessages");
const MessageSkeleton = require("../skeletons/MessageSkeleton");
const Message = require("./Message");
const useListenMessages = require("../../../hooks/useListenMessages");

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
console.log(messages)
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;


// ....................................new changes ..........................

// import { extractTime } from "../../../utils/extractTime";
// import useConversation from "../../../zustand/useConversation";

// const Message = ({ message }) => {
//   const jwt = localStorage.getItem("jwt");
//   const { user } = jwt ? JSON.parse(jwt) : { user: null };
//   const { selectedConversation } = useConversation();

//   if (!message) return null;

//   // **Ensure Messages Are on the Correct Side**
//   const fromMe = message.senderId === user?._id;

//   return (
//     <div className={`flex w-full ${fromMe ? "justify-end" : "justify-start"} my-2`}>
//       <div
//         className={`max-w-[70%] px-4 py-2 rounded-lg text-left ${
//           fromMe ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
//         }`}
//       >
//         {message.message}
//         <div className="text-xs opacity-50 mt-1 text-right">{extractTime(message.createdAt)}</div>
//       </div>
//     </div>
//   );
// };

// export default Message;
