// src/components/ChatBox.js
import React, { useState } from 'react';
import { FaRegCommentDots, FaTimes } from 'react-icons/fa'; // Message and cancel icons

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat box visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, fromUser: true };
      setMessages([...messages, userMessage]);
      setInput('');

      // Simulate a response from the chatbot
      try {
        const response = await fetch('https://api.example.com/chat', { // Replace with actual API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();

        // Simulate multiple responses from the chatbot
        const botMessages = data.responses.map((text) => ({
          text,
          fromUser: false,
        }));

        setMessages([...messages, userMessage, ...botMessages]);
      } catch (error) {
        console.error('Error fetching chatbot response:', error);
        setMessages([
          ...messages,
          userMessage,
          { text: 'Sorry, I am unable to process your request at the moment.', fromUser: false },
        ]);
      }
    }
  };

  return (
    <>
      <div
       onClick={() => setIsOpen(!isOpen)} // Toggle chat box visibility on icon click
       style={{
         position: 'fixed',
         bottom: '20px',
         right: '20px',
         width: '60px',
         height: '60px',
         borderRadius: '50%',
         backgroundColor: '#075A6A', // Fixed: Added closing quote
         color: '#fff',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
         cursor: 'pointer',
         transition: 'background-color 0.3s ease',
       }}
       
      >
        <FaRegCommentDots size={28} />
      </div>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '350px',
            border: '1px solid #8c0000', // Dark red border
            borderRadius: '10px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            background: '#f2f2f2', // Light background for the chatbox
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #8c0000', // Dark red border for header
              background: '#b30000', // Dark red background for header
              color: '#fff',
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Chat with Us</span>
            <FaTimes
              onClick={() => {
                setIsOpen(false);
                setMessages([]);
              }} // Clear messages and close chatbox
              style={{ cursor: 'pointer', fontSize: '18px', color: '#fff' }} // White color for cancel icon
            />
          </div>
          <div
            style={{
              padding: '10px',
              height: '300px',
              overflowY: 'auto',
              flexGrow: 1,
            }}
          >
            {messages.map((message, index) => (
              <div key={index} style={{ padding: '8px', textAlign: message.fromUser ? 'right' : 'left' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '10px',
                    borderRadius: '12px',
                    background: message.fromUser ? '#b30000' : '#e6e6e6', // Dark red for user messages
                    color: message.fromUser ? '#fff' : '#333',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', borderTop: '1px solid #8c0000', padding: '10px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: '1',
                padding: '10px',
                border: '1px solid #8c0000', // Dark red border for input
                borderRadius: '20px',
                outline: 'none',
                fontSize: '14px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px',
                border: 'none',
                backgroundColor: '#8c0000', // Adjusted color value here
                color: '#fff',
                borderRadius: '20px',
                marginLeft: '10px',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbox;


// import React from 'react';

// const Chatbot = () => {
//   return (
//     <>
//       <button
//         className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
//         type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
//         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
//           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
//           className="text-white block border-gray-200 align-middle">
//           <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200">
//           </path>
//         </svg>
//       </button>

//       <div style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
//         className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">
//         <div className="flex flex-col space-y-1.5 pb-6">
//           <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
//           <p className="text-sm text-[#6b7280] leading-3">Powered by Mendable and Vercel</p>
//         </div>

//         <div className="pr-4 h-[474px]" style={{ minWidth: '100%', display: 'table' }}>
//           <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
//             <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
//               <div className="rounded-full bg-gray-100 border p-1">
//                 <svg stroke="none" fill="black" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
//                   <path stroke-linecap="round" stroke-linejoin="round"
//                     d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
//                   </path>
//                 </svg>
//               </div>
//             </span>
//             <p className="leading-relaxed"><span className="block font-bold text-gray-700">AI </span>Hi, how can I help you today?
//             </p>
//           </div>

//           <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
//             <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
//               <div className="rounded-full bg-gray-100 border p-1">
//                 <svg stroke="none" fill="black" stroke-width="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
//                   <path
//                     d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z">
//                   </path>
//                 </svg>
//               </div>
//             </span>
//             <p className="leading-relaxed"><span className="block font-bold text-gray-700">You </span>fewafef</p>
//           </div>

//           <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
//             <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
//               <div className="rounded-full bg-gray-100 border p-1">
//                 <svg stroke="none" fill="black" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
//                   <path stroke-linecap="round" stroke-linejoin="round"
//                     d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
//                   </path>
//                 </svg>
//               </div>
//             </span>
//             <p className="leading-relaxed"><span className="block font-bold text-gray-700">AI </span>Sorry, I couldn't find any
//               information in the documentation about that. Expect answer to be less accurate. I could not find the answer to
//               this in the verified sources.</p>
//           </div>
//         </div>

//         <div className="flex items-center pt-0">
//           <form className="flex items-center justify-center w-full space-x-2">
//             <input
//               className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
//               placeholder="Type your message" value=""/>
//             <button
//               className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2">
//               Send</button>
//           </form>
//         </div>

//       </div>
//     </>
//   );
// }

// export default Chatbot;
