import { useContext, useState } from 'react';
import { Box, styled } from '@mui/material';
import { Chat as MessageIcon } from '@mui/icons-material';
import { AccountContext } from '../../../context/AccountProvider';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../drawer/Drawer';

const Component = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid #ccc;
`;

const Wrapper = styled(Box)`
    margin-left: auto;
    display: flex;
    align-items: center;

    & > * {
        margin-left: 16px;
        padding: 8px;
        color: #000;
        transition: color 0.3s ease, transform 0.3s ease;
        cursor: pointer;
    }

    & > *:hover {
        color: #1976d2; // Blue color on hover
        transform: scale(1.1); // Slight scale for pop effect
    }
`;

const Image = styled('img')({
    height: 40,
    width: 40,
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)', // Pop effect on hover
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
    },
});

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const { account } = useContext(AccountContext);

    const toggleDrawer = () => {
        setOpenDrawer(true);
    };

    return (
        <>
            <Component>
                <Image src={account.picture} alt="User profile" onClick={toggleDrawer} />
                <Wrapper>
                    <MessageIcon />
                    <HeaderMenu />
                </Wrapper>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
        </>
    );
};

export default Header;
