import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    if (!selectedConversation) {
      toast.error("No conversation selected");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ message })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await res.json();
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
