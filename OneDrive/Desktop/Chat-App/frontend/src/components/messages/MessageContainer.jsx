import { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from 'react-icons/ti'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation()
    useEffect(() => {
        return () => setSelectedConversation(null)
    }, [setSelectedConversation]);
    const profilePic = selectedConversation?.profilePic || 'defaultProfilePic.png';
    return (
        <div className='flex flex-col md:min-w-[450px] '>
            {!selectedConversation ? (<NoChatSelected />) : (
                <>
                    {/* <div className="flex"> */}

                    <div className="bg-slate-500 px-4 py-2 mb-2 flex gap-2 items-center ">

                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={profilePic} alt="Profile" />
                            </div>
                        </div>
                        <div className="">
                            {/* <span className="label-text">To:</span>  */}
                            <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
                        </div>

                        {/* </div> */}
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}

        </div>
    )
}

export default MessageContainer

const NoChatSelected = () => {
    const { authUser } = useAuthContext()
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 {authUser.fullName} ❄️ </p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    )
}