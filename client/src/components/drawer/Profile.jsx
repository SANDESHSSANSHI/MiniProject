import React, { useContext } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { AccountContext } from '../../context/AccountProvider';

const ImageContainer = styled(Box)`
    display: flex;
    justify-content: center;
`;

const Image = styled('img')({
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    padding: '25px 0',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
});

const BoxWrapper = styled(Box)`
    background: #FFFFFF;
    padding: 12px 30px 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    & :first-of-type {
        font-size: 16px;
        color: #004d40;
        font-weight: 500;
    }
    & :last-of-type {
        margin: 14px 0;
        color: #4A4A4A;
        font-size: 18px;
        font-weight: bold;
    }
`;

const DescriptionContainer = styled(Box)`
    padding: 15px 20px 28px 30px;
    & > p {
        color: #8696a0;
        font-size: 15px;
    }
`;

const Profile = () => {
    const { account } = useContext(AccountContext);

    return (
        <>
            <ImageContainer>
                <Image src={account.picture} alt="displaypicture" />
            </ImageContainer>
            <BoxWrapper>
                <Typography>Your name</Typography>
                <Typography>{account.name}</Typography>
            </BoxWrapper>
            <DescriptionContainer>
                <Typography>
                    This is not your username or pin. This name will be visible to your Nexus Chat contacts.
                </Typography>
            </DescriptionContainer>
            <BoxWrapper>
                <Typography>About</Typography>
                <Typography>Eat! Sleep! Code! Repeat</Typography>
            </BoxWrapper>
        </>
    );
};

export default Profile;
