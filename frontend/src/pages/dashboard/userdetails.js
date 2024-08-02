import React, { useState, useEffect } from 'react';
import './style/userdetails.scss';

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Fetch users from the backend and set state
    // setUsers(response.data);
  };

  return (
    <section className="user-details">
      <h2>User Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserDetails;
