import React, { useEffect } from 'react';
import { Box, Divider, styled, Typography } from "@mui/material";
import { emptyChatImage } from "../../../constants/data";

const Comp = styled(Box)`
  background-color: #6c757d; /* Set background to grey */
  padding: 30px 0;
  text-align: center;
  height: 100vh; /* Full viewport height */
  display: flex;
  align-items: center;
  justify-content: center; /* Center content horizontally */
`;

const Container = styled(Box)`
  padding-left: 200px; /* Keep padding on the left */
  width: 100%; /* Take full width of the viewport */
`;

const Image = styled('img')({
  width: 400,
  marginTop: 100
});

const Title = styled(Typography)`
  font-size: 40px; /* Increased font size */
  margin: 25px 0 10px 0;
  font-family: 'Montserrat', sans-serif; /* Using Montserrat for a bolder look */
  font-weight: 700; /* Increased font weight for boldness */
  color: #fff; /* Set font color to white */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Sub = styled(Typography)`
  font-size: 18px; /* Increased font size for better readability */
  color: #e1e1e1; /* Set font color to light grey */
  font-weight: 300; /* Light font weight for a softer look */
  font-family: 'Open Sans', sans-serif; /* Using Open Sans for a clean appearance */
  line-height: 1.6; /* Increased line height for better readability */
  max-width: 600px;
  margin: 0 auto; /* Centered horizontally */
  padding: 0 20px; /* Added padding for better spacing */
`;

const StyleDivider = styled(Divider)`
  margin: 40px 0;
  opacity: 0.4;
  background-color: #fff; /* Set divider color to white */
`;

const EmptyChat = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@300&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Comp>
      <Container>
        <Image src={emptyChatImage} alt="chat here" />
        <Title>Nexus Chat</Title>
        <Sub>"Stay connected anytime, anywhere. With Nexus Chat, your conversations continue even when your phone is offline."</Sub>
        <StyleDivider />
      </Container>
    </Comp>
  );
};

export default EmptyChat;