// Sidebar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // React Router kullanıyorsanız

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar'ın açık olup olmadığının durumu

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Sidebar menü öğeleri
  const menuItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Profil', path: '/profil' },
    // Diğer menü öğeleri...
  ];

  return (
    <aside className={isOpen ? "sidebar open" : "sidebar"}>
      <button onClick={toggleSidebar}>Toggle</button>
      <ul>
        {menuItems.map(item => (
          <li key={item.name}>
            <NavLink to={item.path} activeClassName="active">
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
