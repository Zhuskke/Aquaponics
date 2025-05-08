import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");
  const [editUsername, setEditUsername] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || "");
        setPreview(user.photoURL || "");
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      let photoURL = user.photoURL;

      if (profilePic) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePics/${user.uid}`);
        await uploadBytes(storageRef, profilePic);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, {
        displayName: username,
        photoURL,
      });

      setMessage("Profile updated successfully!");
      setEditUsername(false);
    } catch (err) {
      setMessage("Error updating profile: " + err.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const goToChangePassword = () => {
    navigate("/changepassword");
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleProfileUpdate}>
        <div>
          <img
            src={preview || "https://via.placeholder.com/150"}
            alt="Profile"
            width={150}
            height={150}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br />

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {editUsername ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          ) : (
            <h3>{username}</h3>
          )}
          <button
            type="button"
            onClick={() => setEditUsername(!editUsername)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            title="Edit Username"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>

        <br />
        <button type="submit">Update Profile</button>
      </form>

      <br />
      <button onClick={goToChangePassword}>Change Password</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
