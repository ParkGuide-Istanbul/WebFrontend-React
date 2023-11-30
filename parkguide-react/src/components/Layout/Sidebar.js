import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Profil', path: '/profil' },
    // Diğer menü öğeleri burada listelenebilir
  ];

  return (
<aside className={`sidebar ${isOpen ? "open" : ""}`}>
  <button onClick={toggleSidebar}>Toggle</button>
  <nav className="menu">
    {menuItems.map(item => (
      <li key={item.name}> {/* `li` elemanına `key` prop'u ekleyin */}
        <NavLink
          to={item.path}
          className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
        >
          {item.name}
        </NavLink>
      </li>
    ))}
  </nav>
</aside>

  );
};

export default Sidebar;
