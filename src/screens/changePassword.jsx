import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const user = auth.currentUser;

    if (!user) {
      setError("No user is currently logged in.");
      return;
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      oldPassword
    );

    try {
      // Step 1: Reauthenticate the user with their old password
      await reauthenticateWithCredential(user, credential);

      // Step 2: Update to the new password
      await updatePassword(user, newPassword);

      setMessage("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Password Change Error:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Change Password</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default ChangePassword;
