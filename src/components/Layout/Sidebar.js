import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import './Sidebar.css';
import {ProSidebar , Menu , MenuItem} from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css"
import {Box , IconButton , Typography , useTheme} from "@mui/material"
import { tokens } from '../Theme/theme';
import userAvatar from '../../assets/useravatarazkucuk.png';


import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import MapOutlinedIcon from "@mui/icons-material/MapOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {

  
  const [username, setUsername] = useState(''); 
  const [name, setName] = useState(''); 
  const [surname, setSurname] = useState(''); 
  const [roles, setRoles] = useState(''); 
  const [combinedName, setCombinedName] = useState('');
  const [mostpowerful, setMostpowerful] = useState('');

  useEffect(() => {
    // Component mount olduğunda localStorage'dan kullanıcı adını çek
    const storedUsername = localStorage.getItem('username');
    const storedName = localStorage.getItem('name');
    const storedSurname = localStorage.getItem('surname');
    const storedRoles = localStorage.getItem('roles');
    if (storedRoles.includes("Admin")) {
      setMostpowerful("Admin");
    } else {
      setMostpowerful("ParkingSystemAdmin");
    }
    setCombinedName(storedName + " " + storedSurname);
    if (storedUsername) {
      setUsername(storedUsername); // State'i güncelle
    }
  }, []); // Boş dependency array ile sadece component mount edildiğinde çalışır
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");


  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="20px"
              >
               
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="50px"
                  height="50px"
                  src={userAvatar}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {combinedName || "Kullanıcı Adı"}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {mostpowerful || "Kullanıcı Rolü"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

           
            <Item
              title="Manage Users"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
         
          

           
            {/* <Item
              title="Profile Form"
              to="/profile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          
            
          <Item
              title="Manage Parks"
              to="/parks"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
           
           
          
           
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;