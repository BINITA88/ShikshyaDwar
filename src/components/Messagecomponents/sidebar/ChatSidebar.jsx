import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

const ChatSidebar = () => {
	return (
		<div className='border-r w-96 border-slate-800 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-1'></div>
			<Conversations />

		</div>
	);
};
export default ChatSidebar;

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;
