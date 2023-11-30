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
  ];

  return (

<aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button onClick={toggleSidebar} className="toggle-btn">
        Toggle
      </button>
      <ul>
        {menuItems.map(item => (
          <li key={item.name}>
            <NavLink to={item.path} className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>


//<aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
//  <button onClick={toggleSidebar} className="toggle-btn">Toggle</button>
//  <nav className="menu">
//    {menuItems.map(item => (
//      <li key={item.name}> {/* `li` elemanına `key` prop'u ekleyin */}
//        <NavLink
//          to={item.path}
//          className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
//        >
//          {item.name}
//        </NavLink>
//      </li>
//    ))}
//  </nav>
//</aside>

  );
};

export default Sidebar;
