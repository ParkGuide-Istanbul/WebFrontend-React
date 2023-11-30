// Header.js
import React, { useState } from 'react';
import UserDropdown from './UserDropdown';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = "Kullanıcı Adı"; // Bu bilgiyi duruma veya context'e bağlı olarak alın

  return (
    <header>
      {/* Diğer header içerikleri */}
      <div onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src="/path/to/user-image.png" alt="User" />
        {username}
      </div>
      {dropdownOpen && <UserDropdown />}
    </header>
  );
};

export default Header;
