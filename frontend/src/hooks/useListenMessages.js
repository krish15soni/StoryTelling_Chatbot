// hooks/useListenMessages.js
import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage)=>{
      newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
      setMessages([...messages, newMessage])
  });

  return () => socket?.off("newMessage");

}, [socket, setMessages, messages]);
};
//   useEffect(() => {
//     const handleNewMessage = (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };

//     socket?.on("newMessage", handleNewMessage);

//     return () => {
//       socket?.off("newMessage", handleNewMessage);
//     };
//   }, [socket, setMessages]);
// };

export default useListenMessages;
