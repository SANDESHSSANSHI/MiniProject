import { useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';

import { AccountContext } from '../../../context/AccountProvider';
import { defaultProfilePicture } from '../../../constants/data';

const Header = styled(Box)`
    height: 60px;
    background: grey;
    color: #fff;
    display: flex;
    padding: 10px 20px;
    align-items: center;
    border-radius: 12px 12px 0 0;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    border: '2px solid #fff',
});

const Name = styled(Typography)`
    margin-left: 15px;
    font-weight: bold;
    font-size: 18px;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    display: flex;
    align-items: center;
    & > svg {
        padding: 10px;
        font-size: 24px;
        color: #fff;
        transition: color 0.3s;
        cursor: pointer;
    }
    & > svg:hover {
        color: #f0f0f0;
    }
`;

const ChatHeader = ({ person }) => {
    const url = person?.picture || defaultProfilePicture;

    return (
        <Header>
            <Image src={url} alt="display picture" />
            <Box>
                <Name>{person?.name || 'Unknown User'}</Name>
            </Box>
            <RightContainer>
                <Search />
                <MoreVert />
            </RightContainer>
        </Header>
    );
};

export default ChatHeader;
