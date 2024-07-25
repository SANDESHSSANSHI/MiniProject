import React, { useState, useEffect, useContext } from 'react';
import { Box, styled, Divider } from '@mui/material';
import { AccountContext } from '../../../context/AccountProvider';
import Conversation from './Conversation';
import { getUsers } from '../../../service/api';

const Component = styled(Box)`
  overflow-y: auto;
  height: 81vh;
  background-color: #ffffff;

  &:hover .profile-pic {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: 0.6;
`;

const Conversations = ({ text }) => {
  const [users, setUsers] = useState([]);
  const { account, socket, setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getUsers();
      let filteredData = data.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
      setUsers(filteredData);
    };
    fetchData();
  }, [text]);

  useEffect(() => {
    socket.current.emit('addUser', account);
    socket.current.on('getUsers', (users) => {
      setActiveUsers(users);
    });
  }, [account]);

  return (
    <Component>
      {users &&
        users.map((user, index) => (
          user.sub !== account.sub && (
            <div key={user.sub}>
              <Conversation user={user} />
              {users.length !== index + 1 && <StyledDivider />}
            </div>
          )
        ))}
    </Component>
  );
};

export default Conversations;
