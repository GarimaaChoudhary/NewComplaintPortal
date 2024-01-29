
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { Route,Routes, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import InboxIcon from '@mui/icons-material/Inbox';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SellIcon from '@mui/icons-material/Sell';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './styles.css'


import Complaints from './Complaints';
import AdminDashboard from './AdminDashboard';

const menu=[
    {name:"Dashboard",path:"/admin",icon:<DashboardIcon/>},
    
    {name:"complaints",path:"/admin/complaints",icon:<ShoppingBagIcon/>},
 
]

const Admin = () => {
    const theme=useTheme();
    //const isLargeScreen=useMediaQuery(theme.breakpoints.up("lg"));
    //const [sideBarVisible,setSideBarVisible]=useState(false);
    const navigate=useNavigate();
    const handleLogout = () => {
        
        localStorage.removeItem('adminToken');
    
      
        navigate('/admin/login');
      };

    const drawer=(
        <Box 
        sx={{
            overflow:"auto",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
           // border:"1px solid blue",
            height:"100%"
        }}
        >
<>
           {/* {isLargeScreen  && <Toolbar/>} */}
         <List>
            {menu.map((item,index)=><ListItem key={item.name} disablePadding onClick={()=>navigate(item.path)}>
                <ListItemButton>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText>{item.name}</ListItemText>
                </ListItemButton>
            </ListItem>)}
         </List>
</>
         <List>
        <ListItem disablePadding onClick={handleLogout}>
                <ListItemButton>
                    <ListItemIcon>
                        <AccountCircleIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Logout
                    </ListItemText>
                </ListItemButton>
            </ListItem>
         </List>
         </Box>
    ) 
   

 return (
    
        <div className="container">

            <CssBaseline/>
            <div className="sidebar">
            {drawer}
            </div>
            
         
          <div className="content">
            <Routes>
            <Route path='/' element={<AdminDashboard />} />
            <Route path='/complaints' element={<Complaints />} />
            </Routes>
          </div>
          </div>
        
    
)
}
export default Admin

