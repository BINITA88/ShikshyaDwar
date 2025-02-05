// import { useState } from "react";
// import useGetConversations from "../../../hooks/useGetConversations";
// import { getRandomEmoji } from "../../../utils/emojis";
// import Conversation from "./Conversation";

// const Conversations = () => {
//     const { loading, conversations } = useGetConversations();
//     const [selectedUserId, setSelectedUserId] = useState(null);

//     const handleUserClick = (userId) => {
//         setSelectedUserId(userId); // Update selected user ID
//     };

//     return (
//         <div className='chat-container'>
//             {/* Display selected user ID */}
//             <div className='selected-user-id'>
//                 {selectedUserId ? (
//                     <h2 className='text-lg font-bold'>User ID: {selectedUserId}</h2>
//                 ) : (
//                     <h2 className='text-lg font-bold'>Select a user to chat</h2>
//                 )}
//             </div>

//             {/* Conversation list */}
//             <div className='py-2 flex flex-col overflow-auto'>
//                 {conversations.map((conversation, idx) => (
//                     <Conversation
//                         key={conversation._id}
//                         conversation={conversation}
//                         emoji={getRandomEmoji()}
//                         lastIdx={idx === conversations.length - 1}
//                         onClick={() => handleUserClick(conversation._id)} // Pass click handler
//                     />
//                 ))}

//                 {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
//             </div>
//         </div>
//     );
// };

// export default Conversations;


import useGetConversations from "../../../hooks/useGetConversations";
import { getRandomEmoji } from "../../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;
