import { useContext } from 'react';
import { AppBar, Box, Toolbar, styled, Typography } from '@mui/material';
import React from 'react';
import NexusLogo from './imgs/chat.png';
import { AccountContext } from '../context/AccountProvider'; // Adjust path if necessary

// Components
import LoginDialog from "./account/LoginDialog";
import ChatDialog from './chat/ChatDialog'; // Correct import path

const Container = styled(Box)`
    height: 100vh;
    background-color: #f5f5f5; // Light grey background for a softer look
`;

const Header = styled(AppBar)`
    height: 80px; // Reduced height for a more compact header
    background-color: #333; // Dark green color for the header
    box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
    height: 200px;
    background-color: #333; // Dark background for the login screen
    box-shadow: none;
`;

const LogoImage = styled('img')`
    height: 80px; // Consistent logo size
    transition: transform 0.3s ease-in-out; // Smooth hover effect
    &:hover {
        transform: scale(1.1); // Slightly enlarge logo on hover
    }
`;

const Title = styled(Typography)`
    color: #ffffff;
    font-weight: 700;
    margin-left: 20px;
    font-size: 28px;
    transition: color 0.3s ease-in-out; // Smooth color transition on hover
    &:hover {
        color: #80CBC4; // Change title color on hover
    }
`;

const Messenger = () => {
    const { account } = useContext(AccountContext);

    return (
        <Container>
            {account ? (
                <>
                    <Header>
                        <Toolbar>
                           
                        </Toolbar>
                    </Header>
                    <ChatDialog />
                </>
            ) : (
                <>
                    <LoginHeader>
                        <Toolbar style={{ justifyContent: 'center', paddingTop: '50px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <LogoImage src={NexusLogo} alt="Nexus Logo" />
                                <Title variant="h2">NEXUS CHAT</Title>
                            </div>
                        </Toolbar>
                    </LoginHeader>
                    <LoginDialog />
                </>
            )}
        </Container>
    );
};

export default Messenger;
