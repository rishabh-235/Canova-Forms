import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CreatePasswordPage() {
  const handleResetPassword = (e) => {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!password || !confirmPassword) {
      e.preventDefault();
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      e.preventDefault();
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      e.preventDefault();
      toast.error("Passwords do not match");
      return;
    }

    toast.success(
      "Password reset successfully! Please sign in with your new password."
    );
  };

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
        <Link
          to="/signin"
          className="signin-button"
          onClick={handleResetPassword}
        >
          Reset Password
        </Link>
      </div>
    </div>
  );
}
export default CreatePasswordPage;
