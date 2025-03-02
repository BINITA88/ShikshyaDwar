import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = param.token;

    // If no token is present, redirect to login immediately
    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`/api/confirmation/${token}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Verification failed:", data.error);
        }
        
        // Whether success or failure, navigate to login immediately
        navigate('/login');
      })
      .catch((err) => {
        console.error("Error verifying email:", err);
        navigate('/login'); // Navigate to login even in case of errors
      });

  }, [param.token, navigate]);

  // Optional: Show loading message before redirection
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-gray-700">Verifying email... Redirecting to login...</p>
    </div>
  );
};

export default EmailVerify;
