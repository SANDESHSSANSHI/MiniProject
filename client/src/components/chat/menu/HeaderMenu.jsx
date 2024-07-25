import { useState, useContext } from 'react';
import { MoreVert } from '@mui/icons-material';
import { Menu, MenuItem, styled } from '@mui/material';
import { googleLogout } from '@react-oauth/google';
import { AccountContext } from '../../../context/AccountProvider';
import { UserContext } from '../../../context/UserProvider';
import { clientId } from '../../../constants/data';
import Drawer from '../../drawer/Drawer';

const menuBackgroundColor = '#ffffff';
const menuTextColor = '#333333';
const hoverEffectColor = '#e0e0e0';

const MenuOption = styled(MenuItem)`
  font-size: 16px;
  padding: 12px 24px;
  color: ${menuTextColor};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${hoverEffectColor};
  }
`;

const IconButton = styled(MoreVert)`
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: #000080; /* Navy blue */
    transform: scale(1.1);
  }
`;

const HeaderMenu = () => {
  const [open, setOpen] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { setAccount, setShowloginButton, showlogoutButton, setShowlogoutButton } = useContext(AccountContext);
  const { setPerson } = useContext(UserContext);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const onLogoutSuccess = () => {
    alert('You have been logged out successfully');
    console.clear();
    setShowlogoutButton(false);
    setShowloginButton(true);
    setAccount('');
    setPerson({});
  };

  const handleLogout = () => {
    googleLogout({
      clientId,
      onLogoutSuccess,
    });
  };

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <IconButton onClick={handleClick} />
      <Menu
        anchorEl={open}
        keepMounted
        open={Boolean(open)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            backgroundColor: menuBackgroundColor,
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuOption onClick={handleLogout}>Logout</MenuOption>
        <MenuOption onClick={toggleDrawer}>Profile</MenuOption>
      </Menu>
      <Drawer open={openDrawer} setOpen={setOpenDrawer} profile />
    </>
  );
};

export default HeaderMenu;
