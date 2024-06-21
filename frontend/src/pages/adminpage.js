// frontend/src/pages/adminpage.js

import React from 'react';
import { useAuth } from '../contexts/authcontext'; // Ensure correct path to authcontext

const AdminPage = () => {
  const { currentUser, signOut } = useAuth(); // Example usage of useAuth

  return (
    <div>
      <h1>Welcome, {currentUser ? currentUser.username : 'Guest'}</h1>
      <button onClick={signOut}>Sign Out</button>
      {/* Your admin page content */}
    </div>
  );
};

export default AdminPage;
