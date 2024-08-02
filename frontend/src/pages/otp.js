import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userVerify } from "../services/apis";

const Otp = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      alert("Enter Your OTP");
    } else if (!/^\d+$/.test(otp)) {
      alert("Enter Valid OTP (only numbers)");
    } else if (otp.length < 6) {
      alert("OTP length minimum 6 digits");
    } else {
      const data = {
        otp,
        email: location.state,
      };

      const response = await userVerify(data);
      if (response.status === 200) {
        localStorage.setItem("userdbtoken", response.data.userToken);
        alert(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        alert(response.response.data.error);
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_headling">
            <h1>Please Enter Your OTP Here</h1>
          </div>
          <form>
            <div className="form_input">
              <input
                type="text"
                name="otp"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Your OTP"
              />
            </div>
            <button className="btn" onClick={LoginUser}>
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Otp;
