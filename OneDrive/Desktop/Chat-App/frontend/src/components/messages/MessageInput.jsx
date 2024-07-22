// components/MessageInput.js
import  { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
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
        />
        <button type="submit" className={`absolute inset-y-0 right-0 flex items-center pr-3 ${loading ? 'text-gray-500' : 'text-white'}`}>
          {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};


export default MessageInput;
