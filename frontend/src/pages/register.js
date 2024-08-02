import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { registerfunction } from "../services/apis";
import "./style/form.scss";

const Register = () => {
  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    number: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, number } = inputdata;

    if (fname === "") {
      setErrorMessage("Enter Your Name");
    } else if (email === "") {
      setErrorMessage("Enter Your Email");
    } else if (!email.includes("@")) {
      setErrorMessage("Enter Valid Email");
    } else if (number === "") {
      setErrorMessage("Enter Your Phone Number");
    } else if (number.length < 10) {
      setErrorMessage("Phone Number should be at least 10 digits");
    } else {
      const response = await registerfunction(inputdata);
      
      if(response.status === 200){
        setInputdata({ ...inputdata, fname: "", email: "", number: "" });
        navigate("/login");
      } else {
        setErrorMessage(response.response.data.error);
      }
    }
  };

  return (
    <section>
      <div className="form_data">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>Register</label>
          <input
            type="text"
            name="fname"
            placeholder="Enter Name"
            value={inputdata.fname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={inputdata.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="number"
            placeholder="Enter Phone Number"
            value={inputdata.number}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default Register;
