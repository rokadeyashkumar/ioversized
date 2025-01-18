import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/userdetails.scss';

const UserDetails = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        // Fetch user data from backend
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users/get');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUpdate = async (id) => {
        try {
            await axios.put(`http://localhost:5000/users/update/${id}`, editUser);
            // Refresh user list after update
            const response = await axios.get('http://localhost:5000/users/get');
            setUsers(response.data);
            setEditUser(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/delete/${id}`);
            // Refresh user list after deletion
            const response = await axios.get('http://localhost:5000/users/get');
            setUsers(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-details">
            <h1>User Details</h1>
            {users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>
                                    {editUser?._id === user._id ? (
                                        <input
                                            type="text"
                                            value={editUser.fname}
                                            onChange={(e) => setEditUser({ ...editUser, fname: e.target.value })}
                                        />
                                    ) : (
                                        user.fname
                                    )}
                                </td>
                                <td>
                                    {editUser?._id === user._id ? (
                                        <input
                                            type="text"
                                            value={editUser.email}
                                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td>
                                    {editUser?._id === user._id ? (
                                        <input
                                            type="text"
                                            value={editUser.number}
                                            onChange={(e) => setEditUser({ ...editUser, number: e.target.value })}
                                        />
                                    ) : (
                                        user.number
                                    )}
                                </td>
                                <td>
                                    {editUser?._id === user._id ? (
                                        <>
                                            <button onClick={() => handleUpdate(user._id)}>Save</button>
                                            <button onClick={() => setEditUser(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => setEditUser(user)}>Edit</button>
                                            <button onClick={() => handleDelete(user._id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default UserDetails;
