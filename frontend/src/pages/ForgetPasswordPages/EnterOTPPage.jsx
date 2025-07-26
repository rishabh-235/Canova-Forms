import React from "react";

function EnterOTPPage() {
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
          <input type="text" id="otp" placeholder="XXXX65" />
        </div>

        <button className="signin-button">Confirm</button>
      </div>
    </div>
  );
}

export default EnterOTPPage;
