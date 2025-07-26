import React from 'react'
import '../style/profilepagestyle.css';

function ProfilePage() {
  return (
    <div className="homepage-container">
      <div className="homepage-title">My Profile</div>
      <div className="homepage-content">
        <section className='avatar-section'>
          <div className='avatar'>RG</div>
          <div className='avatar-text'>
            <p>Rishabh Gupta</p>
            <p>rishabh@gmail.com</p>
          </div>
        </section>

        <section className='profile-details-section'>
          <div><span>Name: </span> <input type="text" placeholder='Enter your name'/></div>
          <div><span>Email: </span> <input type="email" placeholder='Enter your email'/></div>
          <div><span>Mobile number: </span> <input type="tel" placeholder='Enter your mobile number'/></div>
          <div><span>Location: </span> <input type="text" placeholder='Enter your location'/></div>
        </section>

        <section className='profile-actions-section'>
          <button className='profile-save-button'>Save Changes</button>
          <button className='profile-discard-button'>Discard Changes</button>
        </section>
      </div>
    </div>
  )
}

export default ProfilePage