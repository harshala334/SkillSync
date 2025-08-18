import { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import React from "react";
const Chatbot = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [dummyChats, setDummyChats] = useState([
    { sender: 'bot', message: 'Hello! How can I assist you today?' },
    { sender: 'user', message: 'I need help with my account.' },
    { sender: 'bot', message: 'I am happy to help. Can you provide your account details?' },
    { sender: 'user', message: 'Here are my details: [details].' },
    { sender: 'bot', message: 'Thank you. I will look into that for you.' },
  ]);

  const handleClick = () => {
    setChatOpen(!isChatOpen);
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = '#4c51bf'; // Lighter indigo for hover
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.backgroundColor = '#5a67d8'; // Original indigo
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      const newChat = { sender: 'user', message: userMessage };
      setDummyChats([...dummyChats, newChat]);
      setUserMessage('');
      setTimeout(() => {
        const botReply = { sender: 'bot', message: 'Thank you for your message!' };
        setDummyChats((prevChats) => [...prevChats, botReply]);
      }, 1000); // Simulate a bot reply after 1 second
    }
  };

  const chatbotIconStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#5a67d8', // Indigo-600
    color: 'white',
    borderRadius: '50%',
    padding: '15px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    zIndex: '1000',
    transition: 'background-color 0.3s ease',
  };

  const chatWindowStyle = {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    width: '450px',
    height: '600px',
    backgroundColor: 'white', // Indigo-600
    color: 'white', // Text color should be white to contrast with indigo
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    zIndex: '1000',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const chatHeaderStyle = {
    backgroundColor: '#4c51bf', // Lighter indigo for header
    color: 'white',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  };

  const chatContentStyle = {
    flex: 1,
    overflowY: 'auto', // Enable vertical scrolling
    padding: '10px',
    display: 'flex',
    flexDirection: 'column', // Stack the chat bubbles vertically
    alignItems: 'flex-start', // Default to left for bot messages
  };

  const chatBubbleStyle = (sender) => ({
    backgroundColor: sender === 'bot' ? '#4c51bf' : '#2b6cb0', // Different color for bot and user
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '10px',
    maxWidth: '80%',
    alignSelf: sender === 'bot' ? 'flex-start' : 'flex-end', // Align left for bot and right for user
  });

  const sendButtonStyle = {
    backgroundColor: '#5a67d8', // Indigo-600
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px',
    alignSelf: 'center',
  };

  return (
    <>
      <div
        style={chatbotIconStyle}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
      >
        {isChatOpen ? <FaTimes size="2em" /> : <FaComments size="2em" />}
      </div>

      {isChatOpen && (
        <div style={chatWindowStyle}>
          <div style={chatHeaderStyle}>
            <span>Chatbot</span>
            <FaTimes
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
              aria-label="Close chat"
            />
          </div>
          <div style={chatContentStyle}>
            {dummyChats.map((chat, index) => (
              <div key={index} style={chatBubbleStyle(chat.sender)}>
                <p>{chat.message}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px', backgroundColor: '#4c51bf' }}>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                width: '80%',
                padding: '10px',
                borderRadius: '5px',
                marginRight: '10px',
                border: 'none',
              }}
            />
            <button
              onClick={handleSendMessage}
              style={sendButtonStyle}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;