// import { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";
// import { isAuthenticated } from "../auth";

// const useGetMessages = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedConversation } = useConversation();
//   const { token } = isAuthenticated();

//   useEffect(() => {
//     const getMessages = async () => {
//       setLoading(true);
//       if (!selectedConversation?._id) {
//         console.error("Selected conversation ID is missing");
//         return;
//       }
      
//       if (!token) {
//         toast.error("Authentication token is missing or invalid.");
//         return;
//       }

//       try {
//         // Log token and selected conversation ID for debugging
//         console.log("Token:", token);
//         console.log("Selected Conversation ID:", selectedConversation._id);

//         const res = await fetch(`http://localhost:9000/api/messages/${selectedConversation._id}`, {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//        if(res.success){
//         console.log(res);
        
//        }
        

//         // Check if the response is successful
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         if (data.error) throw new Error(data.error);
        
//         // Update messages if successful
//         setMessages(data);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//         toast.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Call getMessages if conversation ID exists
//     if (selectedConversation?._id) {
//       getMessages();
//     }

//   }, [selectedConversation?._id, setMessages, token]);

//   return { messages, loading };
// };

// export default useGetMessages;




// import { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";
// import { isAuthenticated } from "../auth";

// const useGetMessages = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedUserId } = useConversation();
//   const { token, userId: senderId } = isAuthenticated();

//   useEffect(() => {
//     const getMessages = async () => {
//       if (!selectedUserId) {
//         console.error("Receiver ID is missing. Please select a user.");
//         return;
//       }

//       setLoading(true);
//       try {
//         const res = await fetch(
//           `/api/messages?senderId=${senderId}&receiverId=${selectedUserId}`,
//           {
//             method: "GET",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         if (data.error) throw new Error(data.error);

//         setMessages(data);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//         toast.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (selectedUserId) {
//       getMessages();
//     }
//   }, [selectedUserId, setMessages, token, senderId]);

//   return { messages, loading };
// };

// export default useGetMessages;






import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { isAuthenticated } from "../auth";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const [getData,setData]=useState();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { token } = isAuthenticated();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      if (!selectedConversation?._id) {
        console.error("Selected conversation ID is missing");
        setLoading(false);
        return;
      }

      if (!token) {
        toast.error("Authentication token is missing or invalid.");
        setLoading(false);
        return;
      }

      // try {
        console.log("Fetching messages with Token:", token);
        console.log("Selected Conversation ID:", selectedConversation._id);
        console.log("Ready to get messages")
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

          console.log(res)
      
        // Parse the response
        const data = await res.json();
        console.log(data)
        // if (!res.ok) {
        //   // Log and notify errors based on response status
        //   console.error("Fetch Error:", data);
        //   toast.error(data.message || `Error fetching messages: ${res.status}`);
        //   throw new Error(data.message || "Failed to fetch messages.");
        // }

        // Log and set the messages if the response is successful
        console.log("Messages fetched successfully:", data);
        setData(data || []); // Assuming `data.messages` contains the message array
      // } catch (error) {
      //   console.error("Error fetching messages:", error);
      //   toast.error(error.message || "An error occurred while fetching messages.");
      // } finally {
      //   setLoading(false);
      // }
    };

    // Trigger getMessages only if conversation ID changes and is valid
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages, token]);

  return { messages:getData, loading };
};

export default useGetMessages;
