import { useContext } from 'react';
import { Dialog, Typography, Box, styled } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { addUser } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: #F4F6F8; // Light grey for a professional look
`;

const Title = styled(Typography)`
    font-size: 24px;
    margin: 20px 0;
    color: #333; // Dark grey for better readability
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    text-align: center;
    transition: color 0.3s ease-in-out;
    &:hover {
        color: #00796B; // Change color on hover
    }
`;

const Subtitle = styled(Typography)`
    font-size: 16px;
    color: #555; // Medium grey for subtitle
    text-align: center;
    margin-bottom: 30px;
    font-family: 'Roboto', sans-serif;
`;

const GoogleLoginWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
`;

const dialogStyle = {
    marginTop: '10%',
    height: '300px',
    width: '500px', // Increased width for a larger dialog
    maxWidth: '90%',
    maxHeight: '80%',
    borderRadius: 5, // Reduced border radius for a subtler curve
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', // Enhanced shadow for depth
    overflow: 'hidden',
    backgroundColor: '#FFFFFF', // White background for a clean look
};

const LoginDialog = () => {
    const { setAccount, showloginButton, setShowloginButton, setShowlogoutButton } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        try {
            const decoded = jwt_decode(res.credential);
            setAccount(decoded);
            setShowloginButton(false);
            setShowlogoutButton(true);
            await addUser(decoded); // Make sure addUser is properly defined in your api.js
        } catch (error) {
            console.error('Login Success Error:', error);
        }
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    return (
        <Dialog
            open={true}
            BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }} // Darker backdrop for contrast
            PaperProps={{ sx: dialogStyle }}
        >
            <Container>
                <Title>Welcome to Nexus Chat</Title>
                <Subtitle>Sign in with your Google account to connect with friends and family.</Subtitle>
                <GoogleLoginWrapper>
                    {showloginButton ? (
                        <GoogleLogin
                            onSuccess={onLoginSuccess}
                            onError={onLoginFailure}
                            style={{ width: '100%' }}
                        />
                    ) : null}
                </GoogleLoginWrapper>
            </Container>
        </Dialog>
    );
};

export default LoginDialog;
