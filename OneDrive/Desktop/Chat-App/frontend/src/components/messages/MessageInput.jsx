// components/MessageInput.js
import { useState, useEffect } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  useEffect(() => {
    if (message && selectedConversation) {
      socket.emit('typing', { conversationId: selectedConversation._id });
    } else if (!message && selectedConversation) {
      socket.emit('stop typing', { conversationId: selectedConversation._id });
    }
  }, [message, socket, selectedConversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
    if (selectedConversation) {
      socket.emit('stop typing', { conversationId: selectedConversation._id });
    }
  };

  return (
    <form action="" className="px-4 py-2" onSubmit={handleSubmit}>
      <div className="relative flex items-center">
        <input
          type="text"
          className="border cursor-text text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white focus:ring-sky-500 focus:border-sky-500"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => {
            if (selectedConversation) {
              socket.emit('stop typing', { conversationId: selectedConversation._id });
            }
          }}
        />
        <button type="submit" className={`absolute inset-y-0 right-0 flex items-center pr-3 ${loading ? 'text-gray-500' : 'text-white'}`}>
          {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
