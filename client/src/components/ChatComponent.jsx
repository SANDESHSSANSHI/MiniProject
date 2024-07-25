import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the Socket.IO server running on port 8000
const socket = io('http://localhost:8000');

const ChatComponent = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Listen for users updates
    socket.on('getUsers', (users) => {
      setUsers(users);
    });

    // Listen for incoming messages
    socket.on('getMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Notify server about the current user
    socket.emit('addUser', { sub: currentUser.id });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('getUsers');
      socket.off('getMessage');
    };
  }, [currentUser]);

  const handleSend = () => {
    if (input.trim()) {
      const messageData = {
        senderId: currentUser.id,
        receiverId: 'RECEIVER_ID', // Replace with actual receiver ID
        text: input,
      };
      socket.emit('sendMessage', messageData);
      setInput('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatComponent;
