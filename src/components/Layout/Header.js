import React, { useState } from 'react';
import { useContext } from 'react';
import UserDropdown from './UserDropdown';
import {Box , Icon, IconButton , useTheme} from '@mui/material'
import { ColorModeContext , tokens } from '../Theme/theme';
import InputBase from '@mui/material'
import  LightModeOutlinedIcon  from '@mui/icons-material/LightModeOutlined';
import  DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';
import  PersonOutlinedIcon  from '@mui/icons-material/PersonOutlined';
import './Header.css';
import logo from '../../assets/logoaraba.png';
import userAvatar from '../../assets/useravatarazkucuk.png';
 
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const username = "Kullanıcı Adı";

  return (
    <Box className="header" display = "flex"  justifyContent = "space-between" p = {2}>
      <img src={logo} alt="Logo" className="logo" />
      <h1>ParkGuide Istanbul Admin Panel</h1>
      <div className="user-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src={userAvatar} alt="User" className="user-image" />
        <span className="username">Emir Kerem Boğa</span>
      </div>
      {dropdownOpen && <UserDropdown />}
      <Box display = "flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ?
          <DarkModeOutlinedIcon />
        : <LightModeOutlinedIcon /> }

        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
