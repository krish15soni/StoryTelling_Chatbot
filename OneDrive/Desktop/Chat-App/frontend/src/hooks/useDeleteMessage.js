import { useState } from 'react';
import toast from 'react-hot-toast';

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);

  const deleteMessage = async (messageId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

    //   if (!res.ok) {
    //     throw new Error('Failed to delete message');
    //   }

    //   toast.success('Message deleted successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteMessage };
};

export default useDeleteMessage;
