import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLoginFunction } from '../services/apis'; // Ensure path is correct

const Admin = () => {
  const [adminID, setAdminID] = useState("");
  const [uniqID, setUniqID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!adminID || !uniqID || !password) {
      alert("Please fill all fields");
      return;
    }

    const data = { adminID, uniqID, password };

    try {
      const response = await adminLoginFunction(data);
      if (response.status === 200) {
        localStorage.setItem("admindbtoken", response.data.adminToken);
        console.log(response);
        alert(response.data.message);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        alert(response.response.data.error);
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_headling">
          <h1>Admin Login</h1>
        </div>
        <form onSubmit={handleAdminLogin}>
          <div className="form_input">
            <input type="text" name="adminID" placeholder="Enter AdminID" value={adminID} onChange={(e) => setAdminID(e.target.value)} />
            <input type="text" name="uniqID" placeholder="Enter uniqID" value={uniqID} onChange={(e) => setUniqID(e.target.value)} />
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Admin;
