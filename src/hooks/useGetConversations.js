import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isAuthenticated } from "../auth";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { token } = isAuthenticated();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/userlist", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();

        // Handle unexpected API response structure
        if (!Array.isArray(data)) {
          throw new Error("Invalid response format from the server.");
        }

        setConversations(data);
      } catch (error) {
        // Provide fallback and detailed error message
        toast.error(error.message || "Failed to fetch conversations.");
        setConversations([]); // Reset conversations on failure
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [token]); // Include `token` in the dependency array

  return { loading, conversations };
};

export default useGetConversations;
