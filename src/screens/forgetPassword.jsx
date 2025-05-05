import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setEmail(""); // Clear input field after sending email
    } catch (err) {
      console.error("Reset Password Error:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
