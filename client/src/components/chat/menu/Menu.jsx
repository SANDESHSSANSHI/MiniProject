import { useState } from 'react';
import { Box, styled } from '@mui/material';
import Header from './Header';
import Search from './Search';
import Conversations from './Conversations';

const Container = styled(Box)`
  background-color: #f7f9fc; /* Light blue background */
`;

const Menu = () => {
  const [text, setText] = useState('');

  return (
    <Container>
      <Header />
      <Search setText={setText} />
      <Conversations text={text} />
    </Container>
  );
};

export default Menu;
