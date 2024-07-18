import { create } from 'zustand';

// Create a Zustand store for managing conversations and messages
const useConversation = create((set) => ({
    // Initial state: no conversation selected
    selectedConversation: null,
    
    // Function to set the selected conversation
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    
    // Initial state: empty array for messages
    messages: [],
    
    // Function to set the messages array
    setMessages: (messages) => set({ messages }),
}));

export default useConversation;
