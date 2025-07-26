
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

        <button className="signin-button">Send OTP</button>
      </div>
    </div>
  );
}

export default SendEmailPage;
