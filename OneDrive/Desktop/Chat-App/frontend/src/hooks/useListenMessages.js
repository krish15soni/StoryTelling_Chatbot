// hooks/useListenMessages.js
import { useEffect } from 'react';
import useConversation from '../zustand/useConversation';
import io from 'socket.io-client';

const socket = io(); // Connect to the server

const useListenMessages = () => {
  const { setMessages } = useConversation();

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socket.on('messageDeleted', (data) => {
      // Handle message deletion (e.g., remove from state)
      setMessages(prevMessages => prevMessages.filter(msg => msg._id !== data.messageId));
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('messageDeleted');
    };
  }, [setMessages]);
};

export default useListenMessages;
