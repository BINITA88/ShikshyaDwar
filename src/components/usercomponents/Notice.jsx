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




import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = '/api/notifications';

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
    margin: '40px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px',
    padding: '20px 0',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    padding: '20px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  cardHover: {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-2px)',
  },
  newBadge: {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    marginLeft: '8px',
    display: 'inline-block',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    gap: '8px',
  },
  authorAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#e2e8f0',
  },
  authorName: {
    fontSize: '14px',
    color: '#4a5568',
    fontWeight: '500',
  },
  date: {
    fontSize: '14px',
    color: '#718096',
  },
  preview: {
    fontSize: '14px',
    color: '#4a5568',
    lineHeight: '1.5',
    marginBottom: '16px',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  buttonContainer: {
    display: 'flex',
    gap: '12px',
  },
  markAsReadButton: {
    padding: '6px 12px',
    backgroundColor: '#1a202c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  readMoreButton: {
    padding: '6px 12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  }
};

const Notice = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(API_URL);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>News & Announcements</h1>
      <div style={styles.grid}>
        {notifications.map((notification) => (
          <div
            key={notification._id}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
              e.currentTarget.style.transform = styles.cardHover.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={styles.title}>
              {notification.title || 'Notification'}
              {notification.isNew && <span style={styles.newBadge}>New</span>}
            </div>
            <div style={styles.authorInfo}>
              <div style={styles.authorAvatar}></div>
              <span style={styles.authorName}>
                {notification.author || 'System Admin'}
              </span>
              <span style={styles.date}>
                • {new Date(notification.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p style={styles.preview}>{notification.message}</p>
            <div style={styles.buttonContainer}>
              <button style={styles.markAsReadButton}>
                Mark as read
              </button>
              <button 
                style={styles.readMoreButton}
                onClick={() => alert(`Viewing full notice: ${notification.message}`)}
              >
                Read More ↓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;