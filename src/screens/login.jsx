import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 import this
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // 👈 initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (user.emailVerified) {
        alert("Login successful!");
        navigate("/dashboard"); // 👈 redirect to dashboard here
      } else {
        setError("Please verify your email before logging in.");
        await auth.signOut();
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.message);
    }
  };
  
  
  const goToForgotPassword = () => {
    navigate("/forgetpassword"); // 👈 where ForgotPassword component is routed
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <button onClick={goToForgotPassword} style={{ marginTop: "10px" }}>
        Forgot Password?
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
