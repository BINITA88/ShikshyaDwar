// import { useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";
// import { isAuthenticated } from "../auth";

// const useSendMessage = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();
// 	console.log(selectedConversation._id)
//     const { token } = isAuthenticated();

// 	const sendMessage = async (message) => {
// 		setLoading(true);
// 		try {
		
// 			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
// 				method: "POST",
// 				headers: {
// 					Accept: "application/json",
// 					"Content-Type": "application/json",
// 					Authorization: `Bearer ${token}`

// 				},
// 				body: JSON.stringify({ message }),
// 			});
// 			const data = await res.json();
// 			if (data.error) throw new Error(data.error);

// 			setMessages([...messages, data]);
// 		} catch (error) {
// 			toast.error(error.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return { sendMessage, loading };
// };
// export default useSendMessage;
import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { isAuthenticated } from "../auth";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { token } = isAuthenticated();

  const sendMessage = async (message) => {
    if (!selectedConversation?._id) {
      toast.error("No conversation selected!");
      return;
    }

    if (!message.trim()) {
      toast.error("Message cannot be empty!");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending message:", message);
      console.log("Conversation ID:", selectedConversation._id);

      const response = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: message.trim(), // Ensure message is trimmed and properly formatted
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", data);
        throw new Error(data.error || "Failed to send message");
      }

      console.log("Message Sent Successfully:", data);
      setMessages([...messages, data]);
    } catch (error) {
      console.error("Message Send Error:", error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
