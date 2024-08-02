import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { sentOtpFunction } from '../services/apis';


const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOtp = async(e) => {
    e.preventDefault();

    if(email === "") {
      alert("Enter Email");
    } else if(!email.includes("@")) {
      alert("Enter Valid Email");
    } else {
      const data = { email };

      const response = await sentOtpFunction(data);

      if(response.status === 200) {
        navigate("/user/otp", { state: email });
      } else {
        alert(response.response.data.error);
      }
    }
  }

  return (
    <section>
      <div className="form_data">
        <div className="form_headling">
          <h1>Welcome Back, Login</h1>
          <p>We are glad you are back. Please login.</p>
        </div>
        <form>
          <div className="form_input">
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
          </div>
          <button className="btn" onClick={sendOtp}>Login</button>
          <p>Don't have an account? <NavLink to="/register">Sign Up</NavLink></p>
        </form>
      </div>
    </section>
  );
}

export default Login;
