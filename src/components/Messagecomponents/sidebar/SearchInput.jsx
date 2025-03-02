import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../../zustand/useConversation";
import useGetConversations from "../../../hooks/useGetConversations"; // Ensure this hook fetches conversations
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations(); // Fetch conversations

  useEffect(() => {
    // Reset search input when user selects a conversation
    if (!search) return;
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    // Search for a conversation (case-insensitive)
    const conversation = conversations.find((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      toast.success(`Chat with ${conversation.name} found!`);
      setSearch(""); // Reset search after selection
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full px-4 py-2 text-gray-700"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
