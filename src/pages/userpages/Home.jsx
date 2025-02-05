import React from "react";
import MessageContainer from "../../components/Messagecomponents/messages/MessageContainer";
import ChatSidebar from "../../components/Messagecomponents/sidebar/ChatSidebar";

const Home = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
		<ChatSidebar />
			<MessageContainer /> 
			
		</div>
	);
};

export default Home; 

