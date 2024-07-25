import { useContext, useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';

import { UserContext } from '../../../context/UserProvider';
import { AccountContext } from '../../../context/AccountProvider';
import { getConversation } from '../../../service/api';

//components
import ChatHeader from './ChatHeader';
import Messages from './Messages';

const ChatBoxWrapper = styled(Box)`
    height: 75%;
    background: #f4f4f4;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;

const ChatBox = () => {
    const { person } = useContext(UserContext);
    const { account } = useContext(AccountContext);

    const [conversation, setConversation] = useState({});

    useEffect(() => {
        const getConversationDetails = async () => {
            if (person.sub && account.sub) {
                let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
                setConversation(data);
            }
        };
        getConversationDetails();
    }, [person.sub, account.sub]);

    return (
        <ChatBoxWrapper>
            {person && <ChatHeader person={person} />}
            <Messages person={person} conversation={conversation} />
        </ChatBoxWrapper>
    );
};

export default ChatBox;
