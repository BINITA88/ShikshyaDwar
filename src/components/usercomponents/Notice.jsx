// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = '/api/notifications'; // Ensure correct API endpoint

// // Inline CSS
// const styles = {
//   container: {
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#f4f4f9',
//     borderRadius: '8px',
//     maxWidth: '800px',
//     margin: '0 auto',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//   },
//   heading: {
//     fontSize: '28px',
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: '20px',
//     textAlign: 'center',
//   },
//   notification: {
//     padding: '20px',
//     marginBottom: '20px',
//     border: '1px solid #ddd',
//     borderRadius: '10px',
//     backgroundColor: '#ffffff',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.2s ease',
//   },
//   notificationHover: {
//     transform: 'translateY(-5px)',
//   },
//   message: {
//     fontSize: '16px',
//     color: '#555',
//     lineHeight: '1.6',
//     marginBottom: '10px',
//   },
//   timestamp: {
//     fontSize: '14px',
//     color: '#888',
//     marginTop: '8px',
//     display: 'block',
//   },
//   button: {
//     padding: '10px 20px',
//     backgroundColor: '#007BFF',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     marginTop: '15px',
//     transition: 'background-color 0.3s ease',
//   },
//   buttonHover: {
//     backgroundColor: '#0056b3',
//   },
// };

// const Notice = () => {
//   const [notifications, setNotifications] = useState([]);

//   // Fetch notifications when the component mounts
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(API_URL);
//         setNotifications(response.data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   // Function to truncate message if too long
//   const truncateMessage = (message) => {
//     return message.length > 150 ? message.substring(0, 150) + '...' : message;
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Notice</h2>
      
//       {/* Display notifications */}
//       {notifications.length === 0 ? (
//         <p style={{ textAlign: 'center', fontSize: '18px' }}>No notifications available</p>
//       ) : (
//         notifications.map((notification) => (
//           <div
//             key={notification._id}
//             style={{ ...styles.notification, ...styles.notificationHover }}
//           >
//             <p style={styles.message}>
//               {truncateMessage(notification.message)}
//             </p>
//             <span style={styles.timestamp}>
//               {new Date(notification.createdAt).toLocaleString()}
//             </span>
            
//             {/* Read More Button */}
//             <div style={{ textAlign: 'right' }}>
//               <button
//                 style={styles.button}
//                 onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
//                 onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
//                 onClick={() => alert(`Viewing full notice: ${notification.message}`)} // Replace with actual functionality
//               >
//                 Read More
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Notice;
// h1 style={styles.header}>
//         <Bell size={32} />
//         News & Announcements
//       </h1>


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { isAuthenticated } from "../../auth";
// import { FaExclamationTriangle, FaBullhorn } from "react-icons/fa"; // Icons

// const API_URL = "/api/notifications";

// const Notice = () => {
//   const { token } = isAuthenticated();
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!token) {
//       console.warn("⚠️ You will not see notices until you have completed the payment.");
//       setLoading(false);
//       return;
//     }

//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(API_URL, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setNotifications(response.data);
//       } catch (error) {
//         setError("❌ Error fetching notifications.");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [token]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
//   };

//   const getInitials = (name) => {
//     if (!name || name === "System Admin") return "SA";
//     return name
//       .split(" ")
//       .map((part) => part.charAt(0))
//       .join("")
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   return (
//     <div style={{ backgroundColor: "#f8faff", minHeight: "100vh", padding: "40px" }}>
//       <h1 style={{ textAlign: "center", color: "#1a3a8f", fontSize: "38px", fontWeight: "800" }}>
//         News & Announcements
//       </h1>
//       <p style={{ textAlign: "center", fontSize: "20px", color: "#5a6b94", marginBottom: "35px" }}>
//         Stay up to date with the latest updates and important information
//       </p>

//       {loading ? (
//         <p style={{ textAlign: "center", fontSize: "20px", color: "#888", fontStyle: "italic" }}>
//           ⏳ Loading notifications...
//         </p>
//       ) : error ? (
//         <p style={{ textAlign: "center", fontSize: "20px", color: "#d9534f", fontStyle: "italic" }}>
//           {error}
//         </p>
//       ) : notifications.length === 0 ? (
//         <p style={{ textAlign: "center", fontSize: "20px", color: "#888", fontStyle: "italic" }}>
//           ⚠️ You will not see notices until you have completed the payment.
//         </p>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "35px",
//             flexWrap: "wrap",
//           }}
//         >
//           {notifications.map((notification) => (
//             <div
//               key={notification._id}
//               style={{
//                 backgroundColor: "#ffffff",
//                 padding: "28px",
//                 borderRadius: "18px",
//                 borderTop: "5px solid #ff4d4f", // Thicker red top border
//                 boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
//                 transition: "all 0.3s ease",
//                 cursor: "pointer",
//                 width: "420px", // Increased card width
//                 position: "relative",
//               }}
//             >
             
//               {/* Title with Notification Icon */}
//               <h3
//                 style={{
//                   fontSize: "22px",
//                   fontWeight: "700",
//                   color: "#1a3a8f",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                 }}
//               >
//                 <FaBullhorn style={{ color: "#ff4d4f" }} />
//                 {notification.title || "Notification"}
//               </h3>

//               {/* Sender Info */}
//               <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
//                 <div
//                   style={{
//                     width: "45px",
//                     height: "45px",
//                     backgroundColor: "#ff4d4f",
//                     color: "white",
//                     fontWeight: "700",
//                     borderRadius: "50%",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     fontSize: "18px",
//                   }}
//                 >
//                   {getInitials("System Admin")}
//                 </div>
//                 <div>
//                   <span style={{ fontWeight: "600", fontSize: "17px", color: "#333" }}>System Admin</span>
//                   <br />
//                   <span style={{ fontSize: "15px", color: "#888" }}>{formatDate(notification.createdAt)}</span>
//                 </div>
//               </div>

//               {/* Notification Message */}
//               <p style={{ fontSize: "18px", color: "#555", marginBottom: "12px" }}>
//                 {notification.message}
//               </p>

//               {/* Buttons */}
//               <div style={{ marginTop: "22px", display: "flex", gap: "12px" }}>
//                 <button
//                   style={{
//                     padding: "12px 20px",
//                     borderRadius: "10px",
//                     border: "none",
//                     backgroundColor: "#d9eaff",
//                     color: "#1a3a8f",
//                     fontWeight: "600",
//                     fontSize: "16px",
//                     cursor: "pointer",
//                     transition: "all 0.2s ease",
//                   }}
//                 >
//                   Mark as read
//                 </button>

//                 <button
//                   style={{
//                     padding: "12px 24px",
//                     borderRadius: "10px",
//                     border: "none",
//                     backgroundColor: "#ff4d4f",
//                     color: "white",
//                     fontWeight: "600",
//                     fontSize: "16px",
//                     cursor: "pointer",
//                     transition: "all 0.2s ease",
//                   }}
//                 >
//                   Read More →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notice;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { isAuthenticated } from "../../auth";
import { FaExclamationTriangle, FaBullhorn, FaCheckCircle, FaTimesCircle, FaArrowRight } from "react-icons/fa";

const API_URL = "/api/notifications";

const Notice = () => {
  const { token } = isAuthenticated();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!token) {
      console.warn("⚠️ You will not see notices until you have completed the payment.");
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNotifications(response.data);
      } catch (error) {
        setError("❌ Error fetching notifications.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const getInitials = (name) => {
    if (!name || name === "System Admin") return "SA";
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Pink-700 color for accents
  const pinkColor = "#be185d";

  const getPriorityColor = (priority) => {
    // Always return pink-700 for all priorities
    return pinkColor;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    if (filter === "read") return notification.read;
    return true;
  });

  return (
    <div style={{ 
      backgroundColor: "#f0f5ff", 
      minHeight: "100vh", 
      padding: "40px",
      // Removed the upward white background
    }}>
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "40px 20px" 
      }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ 
            color: "#1a3a8f", 
            fontSize: "42px", 
            fontWeight: "800",
            marginBottom: "16px",
            background: "linear-gradient(45deg, #1a3a8f, #4169e1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            News & Announcements
          </h1>
          <p style={{ 
            fontSize: "20px", 
            color: "#5a6b94", 
            maxWidth: "700px",
            margin: "0 auto" 
          }}>
            Stay up to date with the latest updates and important information
          </p>
        </div>

        {/* Filter Controls */}
        {!loading && !error && notifications.length > 0 && (
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "15px", 
            marginBottom: "30px" 
          }}>
            <button 
              onClick={() => setFilter("all")}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: filter === "all" ? pinkColor : "#f9e6f0",
                color: filter === "all" ? "white" : pinkColor,
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              All
            </button>
            <button 
              onClick={() => setFilter("unread")}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: filter === "unread" ? pinkColor : "#f9e6f0",
                color: filter === "unread" ? "white" : pinkColor,
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Unread
            </button>
            <button 
              onClick={() => setFilter("read")}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: filter === "read" ? pinkColor : "#f9e6f0",
                color: filter === "read" ? "white" : pinkColor,
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Read
            </button>
          </div>
        )}

        {loading ? (
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            padding: "60px 0" 
          }}>
            <div style={{ 
              width: "50px", 
              height: "50px", 
              border: "5px solid #e6e6e6", 
              borderTopColor: pinkColor, 
              borderRadius: "50%", 
              animation: "spin 1s linear infinite", 
              marginBottom: "20px" 
            }} />
            <p style={{ 
              fontSize: "18px", 
              color: "#5a6b94", 
              fontStyle: "italic" 
            }}>
              Loading notifications...
            </p>
            <style>
              {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
            </style>
          </div>
        ) : error ? (
          <div style={{ 
            backgroundColor: "#fff",
            padding: "20px", 
            borderRadius: "12px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            border: `1px solid ${pinkColor}40`
          }}>
            <FaTimesCircle size={24} color={pinkColor} />
            <p style={{ 
              fontSize: "18px", 
              color: pinkColor, 
              margin: 0 
            }}>
              {error}
            </p>
          </div>
        ) : notifications.length === 0 ? (
          <div style={{ 
            backgroundColor: "#fff",
            padding: "30px", 
            borderRadius: "12px", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: "15px", 
            marginTop: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            border: `1px solid ${pinkColor}40`
          }}>
            <FaExclamationTriangle size={50} color={pinkColor} />
            <p style={{ 
              fontSize: "18px", 
              color: "#86084c", 
              margin: "10px 0", 
              textAlign: "center" 
            }}>
              You will not see notices until you have completed the payment.
            </p>
            <button style={{
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: pinkColor,
              color: "white",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              marginTop: "10px"
            }}>
              Complete Payment
            </button>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "40px 0" 
          }}>
            <p style={{ 
              fontSize: "18px", 
              color: "#5a6b94" 
            }}>
              No notifications found matching your filter.
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: "30px",
          }}>
            {filteredNotifications.map((notification) => {
              // Assign priority color (always pink-700)
              const priorityColor = pinkColor;
              const isRead = notification.read;
              
              return (
                <div
                  key={notification._id}
                  style={{
                    backgroundColor: "#ffffff", // Always white background for cards
                    padding: "28px",
                    borderRadius: "18px",
                    borderTop: `5px solid ${priorityColor}`,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    position: "relative",
                    transform: isRead ? "none" : "translateY(-3px)",
                  }}
                >
                  {/* Unread Indicator */}
                  {!isRead && (
                    <div style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      width: "12px",
                      height: "12px",
                      backgroundColor: priorityColor,
                      borderRadius: "50%"
                    }} />
                  )}
                  
                  {/* Priority Badge */}
                  <div style={{
                    position: "absolute",
                    top: "15px",
                    right: isRead ? "15px" : "35px",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    backgroundColor: `${priorityColor}20`,
                    color: priorityColor,
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase"
                  }}>
                    {notification.priority || "medium"}
                  </div>
                  
                  {/* Title with Notification Icon */}
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#1a3a8f",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "15px",
                      marginRight: "80px" // Make room for the priority badge
                    }}
                  >
                    <FaBullhorn style={{ color: priorityColor }} />
                    {notification.title || "Notification"}
                  </h3>

                  {/* Sender Info */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "18px 0" }}>
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        background: `linear-gradient(135deg, ${priorityColor}, #db2777)`,
                        color: "white",
                        fontWeight: "700",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "18px",
                        boxShadow: `0 4px 10px ${priorityColor}40`
                      }}
                    >
                      {getInitials(notification.sender || "System Admin")}
                    </div>
                    <div>
                      <span style={{ fontWeight: "600", fontSize: "17px", color: "#333" }}>
                        {notification.sender || "System Admin"}
                      </span>
                      <br />
                      <span style={{ fontSize: "15px", color: "#888" }}>
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Notification Message */}
                  <p style={{ 
                    fontSize: "17px", 
                    color: "#444", 
                    lineHeight: "1.6",
                    marginBottom: "20px",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {notification.message}
                  </p>

                  {/* Buttons */}
                  <div style={{ marginTop: "22px", display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      disabled={isRead}
                      style={{
                        padding: "12px 20px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: isRead ? "#f0f0f0" : "#fbecf3",
                        color: isRead ? "#aaa" : pinkColor,
                        fontWeight: "600",
                        fontSize: "15px",
                        cursor: isRead ? "default" : "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      {isRead ? <FaCheckCircle size={14} /> : null}
                      {isRead ? "Read" : "Mark as read"}
                    </button>

                    <button
                      style={{
                        padding: "12px 24px",
                        borderRadius: "10px",
                        border: "none",
                        background: `linear-gradient(45deg, ${priorityColor}, #db2777)`,
                        color: "white",
                        fontWeight: "600",
                        fontSize: "15px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: `0 4px 12px ${priorityColor}40`
                      }}
                    >
                      Read More <FaArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;

































// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { isAuthenticated } from "../../auth";
// import { FaExclamationTriangle, FaBullhorn, FaCheckCircle, FaTimesCircle, FaArrowRight } from "react-icons/fa";

// const API_URL = "/api/notifications";

// const Notice = () => {
//   const { token } = isAuthenticated();
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     if (!token) {
//       console.warn("⚠️ You will not see notices until you have completed the payment.");
//       setLoading(false);
//       return;
//     }

//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(API_URL, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setNotifications(response.data);
//       } catch (error) {
//         setError("❌ Error fetching notifications.");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [token]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
//   };

//   const getInitials = (name) => {
//     if (!name || name === "System Admin") return "SA";
//     return name
//       .split(" ")
//       .map((part) => part.charAt(0))
//       .join("")
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   const handleMarkAsRead = (id) => {
//     setNotifications(prevNotifications =>
//       prevNotifications.map(notification =>
//         notification._id === id ? { ...notification, read: true } : notification
//       )
//     );
//   };

//   // Pink-700 color for accents
//   const pinkColor = "#be185d";

//   const getPriorityColor = (priority) => {
//     // Always return pink-700 for all priorities
//     return pinkColor;
//   };

//   const filteredNotifications = notifications.filter(notification => {
//     if (filter === "all") return true;
//     if (filter === "unread") return !notification.read;
//     if (filter === "read") return notification.read;
//     return true;
//   });

//   return (
//     <div style={{ 
//       backgroundColor: "#f0f5ff", 
//       minHeight: "100vh", 
//       padding: "40px",
//       // Removed the upward white background
//     }}>
//       <div style={{ 
//         maxWidth: "1200px", 
//         margin: "0 auto", 
//         padding: "40px 20px" 
//       }}>
//         <div style={{ textAlign: "center", marginBottom: "40px" }}>
//           <h1 style={{ 
//             color: "#1a3a8f", 
//             fontSize: "42px", 
//             fontWeight: "800",
//             marginBottom: "16px",
//             background: "linear-gradient(45deg, #1a3a8f, #4169e1)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent"
//           }}>
//             News & Announcements
//           </h1>
//           <p style={{ 
//             fontSize: "20px", 
//             color: "#5a6b94", 
//             maxWidth: "700px",
//             margin: "0 auto" 
//           }}>
//             Stay up to date with the latest updates and important information
//           </p>
//         </div>

//         {/* Filter Controls */}
//         {!loading && !error && notifications.length > 0 && (
//           <div style={{ 
//             display: "flex", 
//             justifyContent: "center", 
//             gap: "15px", 
//             marginBottom: "30px" 
//           }}>
//             <button 
//               onClick={() => setFilter("all")}
//               style={{
//                 padding: "10px 20px",
//                 borderRadius: "10px",
//                 border: "none",
//                 backgroundColor: filter === "all" ? pinkColor : "#f9e6f0",
//                 color: filter === "all" ? "white" : pinkColor,
//                 fontWeight: "600",
//                 cursor: "pointer",
//                 transition: "all 0.2s ease",
//               }}
//             >
//               All
//             </button>
//             <button 
//               onClick={() => setFilter("unread")}
//               style={{
//                 padding: "10px 20px",
//                 borderRadius: "10px",
//                 border: "none",
//                 backgroundColor: filter === "unread" ? pinkColor : "#f9e6f0",
//                 color: filter === "unread" ? "white" : pinkColor,
//                 fontWeight: "600",
//                 cursor: "pointer",
//                 transition: "all 0.2s ease",
//               }}
//             >
//               Unread
//             </button>
//             <button 
//               onClick={() => setFilter("read")}
//               style={{
//                 padding: "10px 20px",
//                 borderRadius: "10px",
//                 border: "none",
//                 backgroundColor: filter === "read" ? pinkColor : "#f9e6f0",
//                 color: filter === "read" ? "white" : pinkColor,
//                 fontWeight: "600",
//                 cursor: "pointer",
//                 transition: "all 0.2s ease",
//               }}
//             >
//               Read
//             </button>
//           </div>
//         )}

//         {loading ? (
//           <div style={{ 
//             display: "flex", 
//             flexDirection: "column", 
//             alignItems: "center", 
//             justifyContent: "center", 
//             padding: "60px 0" 
//           }}>
//             <div style={{ 
//               width: "50px", 
//               height: "50px", 
//               border: "5px solid #e6e6e6", 
//               borderTopColor: pinkColor, 
//               borderRadius: "50%", 
//               animation: "spin 1s linear infinite", 
//               marginBottom: "20px" 
//             }} />
//             <p style={{ 
//               fontSize: "18px", 
//               color: "#5a6b94", 
//               fontStyle: "italic" 
//             }}>
//               Loading notifications...
//             </p>
//             <style>
//               {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
//             </style>
//           </div>
//         ) : error ? (
//           <div style={{ 
//             backgroundColor: "#fff",
//             padding: "20px", 
//             borderRadius: "12px", 
//             display: "flex", 
//             alignItems: "center", 
//             justifyContent: "center", 
//             gap: "15px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//             border: `1px solid ${pinkColor}40`
//           }}>
//             <FaTimesCircle size={24} color={pinkColor} />
//             <p style={{ 
//               fontSize: "18px", 
//               color: pinkColor, 
//               margin: 0 
//             }}>
//               {error}
//             </p>
//           </div>
//         ) : notifications.length === 0 ? (
//           <div style={{ 
//             backgroundColor: "#fff",
//             padding: "30px", 
//             borderRadius: "12px", 
//             display: "flex", 
//             flexDirection: "column", 
//             alignItems: "center", 
//             justifyContent: "center", 
//             gap: "15px", 
//             marginTop: "20px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//             border: `1px solid ${pinkColor}40`
//           }}>
//             <FaExclamationTriangle size={50} color={pinkColor} />
//             <p style={{ 
//               fontSize: "18px", 
//               color: "#86084c", 
//               margin: "10px 0", 
//               textAlign: "center" 
//             }}>
//               You will not see notices until you have completed the payment.
//             </p>
//             <button style={{
//               padding: "12px 24px",
//               borderRadius: "10px",
//               border: "none",
//               backgroundColor: pinkColor,
//               color: "white",
//               fontWeight: "600",
//               fontSize: "16px",
//               cursor: "pointer",
//               transition: "all 0.2s ease",
//               marginTop: "10px"
//             }}>
//               Complete Payment
//             </button>
//           </div>
//         ) : filteredNotifications.length === 0 ? (
//           <div style={{ 
//             textAlign: "center", 
//             padding: "40px 0" 
//           }}>
//             <p style={{ 
//               fontSize: "18px", 
//               color: "#5a6b94" 
//             }}>
//               No notifications found matching your filter.
//             </p>
//           </div>
//         ) : (
//           /* Changed to a horizontal layout for the first 3 cards */
//           <div>
//             {/* Display first 3 cards horizontally */}
//             <div style={{
//               display: "flex",
//               justifyContent: "center",
//               flexWrap: "wrap",
//               gap: "30px",
//               marginBottom: "30px"
//             }}>
//               {filteredNotifications.slice(0, 3).map((notification) => {
//                 // Assign priority color (always pink-700)
//                 const priorityColor = pinkColor;
//                 const isRead = notification.read;
                
//                 return (
//                   <div
//                     key={notification._id}
//                     style={{
//                       backgroundColor: "#ffffff", // Always white background for cards
//                       padding: "28px",
//                       borderRadius: "18px",
//                       borderTop: `5px solid ${priorityColor}`,
//                       boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//                       transition: "all 0.3s ease",
//                       cursor: "pointer",
//                       position: "relative",
//                       transform: isRead ? "none" : "translateY(-3px)",
//                       width: "calc(33.333% - 20px)",
//                       minWidth: "300px",
//                       maxWidth: "380px",
//                       flex: "1 1 300px"
//                     }}
//                   >
//                     {/* Unread Indicator */}
//                     {!isRead && (
//                       <div style={{
//                         position: "absolute",
//                         top: "15px",
//                         right: "15px",
//                         width: "12px",
//                         height: "12px",
//                         backgroundColor: priorityColor,
//                         borderRadius: "50%"
//                       }} />
//                     )}
                    
//                     {/* Priority Badge */}
//                     <div style={{
//                       position: "absolute",
//                       top: "15px",
//                       right: isRead ? "15px" : "35px",
//                       padding: "4px 10px",
//                       borderRadius: "12px",
//                       backgroundColor: `${priorityColor}20`,
//                       color: priorityColor,
//                       fontSize: "12px",
//                       fontWeight: "bold",
//                       textTransform: "uppercase"
//                     }}>
//                       {notification.priority || "medium"}
//                     </div>
                    
//                     {/* Title with Notification Icon */}
//                     <h3
//                       style={{
//                         fontSize: "22px",
//                         fontWeight: "700",
//                         color: "#1a3a8f",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "10px",
//                         marginTop: "15px",
//                         marginRight: "80px" // Make room for the priority badge
//                       }}
//                     >
//                       <FaBullhorn style={{ color: priorityColor }} />
//                       {notification.title || "Notification"}
//                     </h3>

//                     {/* Sender Info */}
//                     <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "18px 0" }}>
//                       <div
//                         style={{
//                           width: "45px",
//                           height: "45px",
//                           background: `linear-gradient(135deg, ${priorityColor}, #db2777)`,
//                           color: "white",
//                           fontWeight: "700",
//                           borderRadius: "50%",
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           fontSize: "18px",
//                           boxShadow: `0 4px 10px ${priorityColor}40`
//                         }}
//                       >
//                         {getInitials(notification.sender || "System Admin")}
//                       </div>
//                       <div>
//                         <span style={{ fontWeight: "600", fontSize: "17px", color: "#333" }}>
//                           {notification.sender || "System Admin"}
//                         </span>
//                         <br />
//                         <span style={{ fontSize: "15px", color: "#888" }}>
//                           {formatDate(notification.createdAt)}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Notification Message */}
//                     <p style={{ 
//                       fontSize: "17px", 
//                       color: "#444", 
//                       lineHeight: "1.6",
//                       marginBottom: "20px",
//                       display: "-webkit-box",
//                       WebkitLineClamp: "3",
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis"
//                     }}>
//                       {notification.message}
//                     </p>

//                     {/* Buttons */}
//                     <div style={{ marginTop: "22px", display: "flex", gap: "12px" }}>
//                       <button
//                         onClick={() => handleMarkAsRead(notification._id)}
//                         disabled={isRead}
//                         style={{
//                           padding: "12px 20px",
//                           borderRadius: "10px",
//                           border: "none",
//                           backgroundColor: isRead ? "#f0f0f0" : "#fbecf3",
//                           color: isRead ? "#aaa" : pinkColor,
//                           fontWeight: "600",
//                           fontSize: "15px",
//                           cursor: isRead ? "default" : "pointer",
//                           transition: "all 0.2s ease",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "8px"
//                         }}
//                       >
//                         {isRead ? <FaCheckCircle size={14} /> : null}
//                         {isRead ? "Read" : "Mark as read"}
//                       </button>

//                       <button
//                         style={{
//                           padding: "12px 24px",
//                           borderRadius: "10px",
//                           border: "none",
//                           background: `linear-gradient(45deg, ${priorityColor}, #db2777)`,
//                           color: "white",
//                           fontWeight: "600",
//                           fontSize: "15px",
//                           cursor: "pointer",
//                           transition: "all 0.2s ease",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "8px",
//                           boxShadow: `0 4px 12px ${priorityColor}40`
//                         }}
//                       >
//                         Read More <FaArrowRight size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Display remaining cards in grid layout like original */}
//             {filteredNotifications.length > 3 && (
//               <div style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
//                 gap: "30px",
//                 marginTop: "30px"
//               }}>
//                 {filteredNotifications.slice(3).map((notification) => {
//                   // Assign priority color (always pink-700)
//                   const priorityColor = pinkColor;
//                   const isRead = notification.read;
                  
//                   return (
//                     <div
//                       key={notification._id}
//                       style={{
//                         backgroundColor: "#ffffff", // Always white background for cards
//                         padding: "28px",
//                         borderRadius: "18px",
//                         borderTop: `5px solid ${priorityColor}`,
//                         boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//                         transition: "all 0.3s ease",
//                         cursor: "pointer",
//                         position: "relative",
//                         transform: isRead ? "none" : "translateY(-3px)",
//                       }}
//                     >
//                       {/* Unread Indicator */}
//                       {!isRead && (
//                         <div style={{
//                           position: "absolute",
//                           top: "15px",
//                           right: "15px",
//                           width: "12px",
//                           height: "12px",
//                           backgroundColor: priorityColor,
//                           borderRadius: "50%"
//                         }} />
//                       )}
                      
//                       {/* Priority Badge */}
//                       <div style={{
//                         position: "absolute",
//                         top: "15px",
//                         right: isRead ? "15px" : "35px",
//                         padding: "4px 10px",
//                         borderRadius: "12px",
//                         backgroundColor: `${priorityColor}20`,
//                         color: priorityColor,
//                         fontSize: "12px",
//                         fontWeight: "bold",
//                         textTransform: "uppercase"
//                       }}>
//                         {notification.priority || "medium"}
//                       </div>
                      
//                       {/* Title with Notification Icon */}
//                       <h3
//                         style={{
//                           fontSize: "22px",
//                           fontWeight: "700",
//                           color: "#1a3a8f",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "10px",
//                           marginTop: "15px",
//                           marginRight: "80px" // Make room for the priority badge
//                         }}
//                       >
//                         <FaBullhorn style={{ color: priorityColor }} />
//                         {notification.title || "Notification"}
//                       </h3>

//                       {/* Sender Info */}
//                       <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "18px 0" }}>
//                         <div
//                           style={{
//                             width: "45px",
//                             height: "45px",
//                             background: `linear-gradient(135deg, ${priorityColor}, #db2777)`,
//                             color: "white",
//                             fontWeight: "700",
//                             borderRadius: "50%",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             fontSize: "18px",
//                             boxShadow: `0 4px 10px ${priorityColor}40`
//                           }}
//                         >
//                           {getInitials(notification.sender || "System Admin")}
//                         </div>
//                         <div>
//                           <span style={{ fontWeight: "600", fontSize: "17px", color: "#333" }}>
//                             {notification.sender || "System Admin"}
//                           </span>
//                           <br />
//                           <span style={{ fontSize: "15px", color: "#888" }}>
//                             {formatDate(notification.createdAt)}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Notification Message */}
//                       <p style={{ 
//                         fontSize: "17px", 
//                         color: "#444", 
//                         lineHeight: "1.6",
//                         marginBottom: "20px",
//                         display: "-webkit-box",
//                         WebkitLineClamp: "3",
//                         WebkitBoxOrient: "vertical",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis"
//                       }}>
//                         {notification.message}
//                       </p>

//                       {/* Buttons */}
//                       <div style={{ marginTop: "22px", display: "flex", gap: "12px" }}>
//                         <button
//                           onClick={() => handleMarkAsRead(notification._id)}
//                           disabled={isRead}
//                           style={{
//                             padding: "12px 20px",
//                             borderRadius: "10px",
//                             border: "none",
//                             backgroundColor: isRead ? "#f0f0f0" : "#fbecf3",
//                             color: isRead ? "#aaa" : pinkColor,
//                             fontWeight: "600",
//                             fontSize: "15px",
//                             cursor: isRead ? "default" : "pointer",
//                             transition: "all 0.2s ease",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "8px"
//                           }}
//                         >
//                           {isRead ? <FaCheckCircle size={14} /> : null}
//                           {isRead ? "Read" : "Mark as read"}
//                         </button>

//                         <button
//                           style={{
//                             padding: "12px 24px",
//                             borderRadius: "10px",
//                             border: "none",
//                             background: `linear-gradient(45deg, ${priorityColor}, #db2777)`,
//                             color: "white",
//                             fontWeight: "600",
//                             fontSize: "15px",
//                             cursor: "pointer",
//                             transition: "all 0.2s ease",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "8px",
//                             boxShadow: `0 4px 12px ${priorityColor}40`
//                           }}
//                         >
//                           Read More <FaArrowRight size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Notice;