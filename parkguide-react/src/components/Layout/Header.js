import React, { useState } from 'react';
import UserDropdown from './UserDropdown';
import './Header.css';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = "Kullanıcı Adı";

  return (
    <header className="header">
      <div className="user-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src="/path/to/template-avatar.png" alt="User" className="user-image" />
        <span className="username">{username}</span>
      </div>
      {dropdownOpen && <UserDropdown />}
    </header>
  );
};

export default Header;
