import { Link } from "react-router-dom";
function SendEmailPage() {
  return (
    <div className="signin-card-container">
      <div className="signin-card-header">
        <h3>Welcome CANOVA 👋</h3>
        <p>Please enter your registered email ID to </p>
        <p>receive an OTP.</p>
      </div>
      <div className="signin-card-body">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Example@gmail.com" />
        </div>
        <Link to="verify-otp" className="signin-button">Send OTP</Link>
      </div>
    </div>
  );
}
export default SendEmailPage;



