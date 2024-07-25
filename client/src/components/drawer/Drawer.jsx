import { styled, Drawer, Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Profile from './Profile';

// Define colors and styles
const headerBackgroundColor = 'black'; // Dark teal for header background
const headerTextColor = '#ffffff'; // White text color
const componentBackgroundColor = '#ffffff'; // Light grey for content area
const hoverEffectColor = '#000080'; // Navy blue for hover effects
const borderColor = '#004d40';

const Header = styled(Box)`
  background: ${headerBackgroundColor};
  height: 60px; // Adjusted for a more compact look
  color: ${headerTextColor};
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
  border-bottom: 1px solid ${borderColor}; // Subtle border
`;

const Component = styled(Box)`
  background: ${componentBackgroundColor};
  height: calc(100% - 60px); // Adjusted to account for header height
  padding: 16px;
  overflow-y: auto;
  border-radius: 0 0 12px 12px; // Rounded corners at the bottom
`;

const Text = styled(Typography)`
  font-size: 22px;
  font-weight: 700;
  margin-left: 16px;
`;

const IconButton = styled(Box)`
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: ${hoverEffectColor};
    transform: scale(1.2); 
  }
`;

const drawerStyle = {
  height: '95%',
  width: '30%',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  borderRadius: '12px',
  overflow: 'hidden',
};

const InfoDrawer = ({ open, setOpen, profile }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: drawerStyle }}
            style={{ zIndex: 1500 }}
        >
            <Header>
                <IconButton onClick={handleClose}>
                    <ArrowBack style={{ fontSize: 28 }} />
                </IconButton>
                <Text>Profile</Text>
            </Header>
            <Component>
                {profile && <Profile />}
            </Component>
        </Drawer>
    );
}

export default InfoDrawer;
