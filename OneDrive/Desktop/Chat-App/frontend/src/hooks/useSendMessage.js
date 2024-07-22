// hooks/useSendMessage.js
import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
// import { useSocketContext } from "../context/SocketContext";
import SendSound from "../assets/sounds/Send.mp3";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  // const { socket } = useSocketContext();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
      // socket.emit("sendMessage", data);
      // message.shouldShake = true;
      const sound = new Audio(SendSound);
      sound.play();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
