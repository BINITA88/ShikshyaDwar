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
