import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // For navigation

const TestAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null); // No user is logged in
      }
    });

    // Cleanup the subscription on component unmount
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      console.log('User logged out');
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed', error.message);
    }
  };

  return (
    <div>
      <h2>{user ? `Welcome, ${user.email}` : 'No user is logged in'}</h2>

      {/* If user is logged in, show logout button */}
      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default TestAuth;
