import React, { useState } from 'react';
import UserDropdown from './UserDropdown';
import './Header.css';
import logo from '../../assets/logoaraba.png';
import userAvatar from '../../assets/useravatarazkucuk.png';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = "Kullanıcı Adı";

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>ParkGuide Istanbul Admin Panel</h1>
      <div className="user-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src={userAvatar} alt="User" className="user-image" />
        <span className="username">Barış Beydemir</span>
      </div>
      {dropdownOpen && <UserDropdown />}
    </header>
  );
};

export default Header;
