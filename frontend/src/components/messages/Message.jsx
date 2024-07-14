import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic || 'defaultProfilePic.png'; // Fallback profile pic
  const bubbleBgColor = fromMe ? 'bg-blue-500' : "bg-gray-500";
  const shakeClass = message.shouldShake ? 'shake' : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Profile" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 break-words overflow-hidden w-auto`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs gap-1 items-center">{formattedTime}</div>
    </div>
  );
};

export default Message;
