import { useState } from "react";
import "../style/profilepagestyle.css";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../redux/slices/api/user.api";
import { toast } from "react-toastify";
function ProfilePage() {
  const { user } = useSelector((state) => state.user);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    location: user?.location || "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleUpdateProfile = (e) => {
    e?.preventDefault();

    if (!formData.fullname.trim()) {
      toast.error("Name is required");
      return;
    }

    updateUser(formData)
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Failed to update profile. Please try again.";
        toast.error(errorMessage);
      });
  };
  const discardChanges = () => {
    setFormData({
      fullname: user?.fullname || "",
      email: user?.email || "",
      mobileNumber: user?.mobileNumber || "",
      location: user?.location || "",
    });
    toast.info("Changes discarded");
  };
  return (
    <div className="homepage-container">
      <div className="homepage-title">My Profile</div>
      <div className="homepage-content">
        <section className="avatar-section">
          <div className="avatar">
            {user?.fullname
              ? user.fullname
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")
              : ""}
          </div>
          <div className="avatar-text">
            <p>{user?.fullname}</p>
            <p>{user?.email}</p>
          </div>
        </section>
        <form
          onSubmit={handleUpdateProfile}
          className="profile-details-section"
        >
          <div>
            <span>Name: </span>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Enter your name"
              value={formData.fullname}
              name="fullname"
            />
          </div>
          <div>
            <span>Email: </span>{" "}
            <input
              onChange={handleInputChange}
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              name="email"
              disabled
            />
          </div>
          <div>
            <span>Mobile number: </span>
            <input
              onChange={handleInputChange}
              type="tel"
              placeholder="Enter your mobile number"
              value={formData.mobileNumber}
              name="mobileNumber"
            />
          </div>
          <div>
            <span>Location: </span>
            <input
              onChange={handleInputChange}
              name="location"
              type="text"
              placeholder="Enter your location"
              value={formData?.location}
            />
          </div>
        </form>
        <section className="profile-actions-section">
          <button
            onClick={handleUpdateProfile}
            className="profile-save-button"
            disabled={isLoading}
          >
            Save Changes
          </button>
          <button onClick={discardChanges} className="profile-discard-button">
            Discard Changes
          </button>
        </section>
      </div>
    </div>
  );
}
export default ProfilePage;
