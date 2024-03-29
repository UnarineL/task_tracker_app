import './Header.css';
import React, { useState } from 'react';
import defaultProfileImage from './image/profile.png';

const Header = () => {
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || defaultProfileImage);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profileImage', reader.result); // Save the profile image to localStorage
        setShowUploadPopup(false); // Close the upload popup after selecting a new image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfile = () => {
    setProfileImage(defaultProfileImage);
    localStorage.removeItem('profileImage'); // Remove the profile image from localStorage
    setShowUploadPopup(false); // Close the upload popup after removing the profile image
  };

  return (
    <div className="header">
      <h1>Task Board</h1>
      <div className="profile-container">
        <img src={profileImage} alt="Profile" onClick={() => setShowUploadPopup(true)} />
      </div>

      {/* Upload Popup */}
      {showUploadPopup && (
        <div className="upload-popup">
          <h2>Change Profile Picture</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button onClick={handleRemoveProfile}>Remove Profile Picture</button>
          <button onClick={() => setShowUploadPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Header;
