import { useContext, useEffect, useState } from 'react';
import { styled, Box, Typography } from '@mui/material';
import { UserContext } from '../../../context/UserProvider';
import { AccountContext } from '../../../context/AccountProvider';
import { setConversation, getConversation } from '../../../service/api';
import { emptyProfilePicture } from '../../../constants/data';
import { formatDate } from '../../../utils/common-utils';

const Component = styled(Box)`
  height: 55px;
  display: flex;
  padding: 10px 15px;
  cursor: pointer;
  align-items: center;
  background-color: #ffffff;
  &:hover {
    background-color: #f0f4ff; /* Light blue background on hover */
  }
`;

const Image = styled('img')`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Timestamp = styled(Typography)`
  font-size: 12px;
  color: #00000099;
  margin-left: 20px;
`;

const Text = styled(Typography)`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
`;

const Name = styled(Typography)`
  font-weight: bold;
  &:hover {
    color: #000080; /* Navy blue */
    transform: scale(1.1); /* Slightly enlarge on hover */
  }
`;

const Conversation = ({ user }) => {
  const url = user.picture || emptyProfilePicture;
  const { setPerson } = useContext(UserContext);
  const { account, newMessageFlag } = useContext(AccountContext);
  const [message, setMessage] = useState({});

  useEffect(() => {
    const getConversationMessage = async () => {
      const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
      setMessage({ text: data?.message, timestamp: data?.updatedAt });
    };
    getConversationMessage();
  }, [newMessageFlag]);

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };

  return (
    <Component onClick={getUser}>
      <Image src={url} alt="display picture" />
      <Box style={{ width: '100%' }}>
        <Container>
          <Name>{user.name}</Name>
          {message?.text && <Timestamp>{formatDate(message?.timestamp)}</Timestamp>}
        </Container>
        <Box>
          <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
        </Box>
      </Box>
    </Component>
  );
};

export default Conversation;
