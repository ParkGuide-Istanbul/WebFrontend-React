// Layout.js
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>{children}</main> {/* Bu kısım dinamik içerik için */}
    </div>
  );
};

export default Layout;
