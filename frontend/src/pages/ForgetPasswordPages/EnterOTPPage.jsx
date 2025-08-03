import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function EnterOTPPage() {
  const handleConfirmOTP = (e) => {
    const otp = document.getElementById("otp").value;
    if (!otp) {
      e.preventDefault();
      toast.error("Please enter the OTP");
      return;
    }
    if (otp.length !== 6) {
      e.preventDefault();
      toast.error("OTP must be 6 digits");
      return;
    }
    toast.success("OTP verified successfully!");
  };

  return (
    <div className="signin-card-container">
      <div className="signin-card-header">
        <h3>Enter Your OTP</h3>
        <p>We've sent a 6-digit OTP to your registered </p>
        <p>email.</p>
        <p>Please enter it below to sign in.</p>
      </div>
      <div className="signin-card-body">
        <div>
          <label htmlFor="otp">OTP</label>
          <input type="text" id="otp" placeholder="XXXX65" maxLength="6" />
        </div>
        <Link
          to="/forgot-password/create-password"
          className="signin-button"
          onClick={handleConfirmOTP}
        >
          Confirm
        </Link>
      </div>
    </div>
  );
}
export default EnterOTPPage;
