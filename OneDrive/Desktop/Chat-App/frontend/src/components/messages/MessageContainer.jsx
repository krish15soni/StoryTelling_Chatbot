import { useEffect, useState } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { useSocketContext } from '../../context/SocketContext'; // Import the SocketContext
import ProfileR from './profileR'; // Update the import path accordingly
import { IoClose } from 'react-icons/io5';

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext(); // Get online users from SocketContext
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    const profilePic = selectedConversation?.profilePic || 'defaultProfilePic.png';
    const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id); // Determine if the selected conversation user is online

    const handleProfileClick = () => {
        setIsProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

    return (
        <div className='flex flex-col w-full md:min-w-[450px]'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className="bg-[#647080b8] px-4 py-2 mb-2 flex items-center gap-2 cursor-pointer" onClick={handleProfileClick}>
                        <div className={`chat-image avatar flex-shrink-0 ${isOnline ? 'online' : ''}`}>
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img src={profilePic} alt="Profile" className="object-cover w-full h-full" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <span className="text-gray-900 font-bold text-lg">{selectedConversation.fullName}</span>
                            <div className={`text-sm ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
                                {isOnline ? 'Online' : 'Offline'}
                            </div>
                        </div>
                    </div>
                    <Messages />
                    <MessageInput />
                    {isProfileModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-3xl bg-[#01090f82] z-50" onClick={handleCloseProfileModal}>
                            <div className="relative bg-[#647080] p-4 rounded-lg shadow-sm max-w-sm" onClick={(e) => e.stopPropagation()}>
                                {/* Close Button */}
                                <button
                                    className="absolute top-2 right-2 p-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300 z-10 cursor-pointer"
                                    onClick={handleCloseProfileModal}
                                >
                                    <IoClose className="text-gray-700 text-xl cursor-pointer" />
                                </button>
                                <ProfileR selectedConversation={selectedConversation} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 {authUser.fullName} ❄️ </p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};
