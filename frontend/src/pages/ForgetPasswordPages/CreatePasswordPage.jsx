import { Link } from "react-router-dom";
function CreatePasswordPage() {
  return (
    <div className="signin-card-container">
      <div className="signin-card-header">
        <h3>Create New Password</h3>
        <p>Today is new day. It's your day. You shape it.</p>
        <p>Create a new password to start managing your projects.</p>
      </div>
      <div className="signin-card-body">
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm new password"
          />
        </div>
        <div>
          <Link to="/forgot-password">Cancel</Link>
        </div>
        <button className="signin-button">Reset Password</button>
      </div>
    </div>
  );
}
export default CreatePasswordPage;



