import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyToken = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/verify-token/${token}`);
        if (response.status === 200) {
          setMessage("Token valid. Redirecting to reset password...");
          setLoading(false);
          setTimeout(() => navigate(`/reset-password/${token}`), 3000);
        } else {
          setMessage("Invalid or expired token.");
          setLoading(false);
        }
      } catch (error) {
        setMessage("Error verifying token.");
        setLoading(false);
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>{message}</p>}
    </div>
  );
};

export default VerifyToken;
