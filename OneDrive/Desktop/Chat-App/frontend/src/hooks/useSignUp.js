import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();  // Correct way to destructure setAuthUser

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;
    
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            });

            if (!res.ok) {
                const errorData = await res.json();  // To get the error message from the response
                throw new Error(errorData.error || 'Signup failed');
            }
    
            const data = await res.json();
            
            // localstorage
            localStorage.setItem("chat-user", JSON.stringify(data));
            // context
            setAuthUser(data);

            toast.success('Signup successful!');
        } catch (error) {
            toast.error(error.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };
    
    return { loading, signup };
};

export default useSignUp;

const handleInputErrors = ({ fullName, username, password, confirmPassword, gender }) => {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields');
        return false;
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    }
    return true;
};
