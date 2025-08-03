import React from "react";
import "../style/settingspagestyle.css";
function SettingsPage() {
  return (
    <div className="homepage-container">
      <div className="homepage-title">Settings</div>
      <div className="homepage-content">
        <section className="settings-section">
          <h5>Preferences</h5>
          <div className="settings-preferences">
            <div>
              <span>Theme</span>
              <select>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div>
              <span>Language</span>
              <select>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default SettingsPage;



