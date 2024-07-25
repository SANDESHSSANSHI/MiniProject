import { useContext } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { GetApp as GetAppIcon } from '@mui/icons-material';

import { AccountContext } from '../../../context/AccountProvider';
import { downloadMedia, formatDate } from '../../../utils/common-utils';
import { iconPDF } from '../../../constants/data';

const Wrapper = styled(Box)`
    background: #ffffff;
    padding: 10px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    border-radius: 12px;
    word-break: break-word;
    margin-bottom: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Own = styled(Box)`
    background: #dcf8c6;
    padding: 10px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto;
    display: flex;
    border-radius: 12px;
    word-break: break-word;
    margin-bottom: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 10px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #888;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: auto;
`;

const ImageContainer = styled(Box)`
    position: relative;
    display: inline-block;
`;

const PDFIcon = styled('img')({
    width: 80,
    marginRight: 8,
});

const ImageMessage = ({ message }) => {
    const hasText = message.text || '';

    return (
        <ImageContainer>
            {hasText.includes('.pdf') ? (
                <Box display="flex" alignItems="center">
                    <PDFIcon src={iconPDF} alt="pdf-icon" />
                    <Typography style={{ fontSize: '14px' }}>{hasText.split('/').pop()}</Typography>
                </Box>
            ) : (
                <img
                    style={{
                        width: '100%',
                        maxWidth: 300,
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '10px',
                    }}
                    src={hasText}
                    alt={hasText}
                />
            )}
            <Time>
                <GetAppIcon
                    onClick={(e) => downloadMedia(e, hasText)}
                    fontSize="small"
                    style={{
                        marginRight: 10,
                        cursor: 'pointer',
                        color: '#007bff',
                        transition: 'color 0.3s, transform 0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#0056b3')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#007bff')}
                />
                {formatDate(message.createdAt)}
            </Time>
        </ImageContainer>
    );
};

const Message = ({ message }) => {
    const { account } = useContext(AccountContext);

    return account.sub === message.senderId ? (
        <Own>
            {message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />}
        </Own>
    ) : (
        <Wrapper>
            {message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />}
        </Wrapper>
    );
};

const TextMessage = ({ message }) => (
    <>
        <Text>{message.text}</Text>
        <Time>{formatDate(message.createdAt)}</Time>
    </>
);

export default Message;
