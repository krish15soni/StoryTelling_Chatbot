import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin'; // Ensure this hook is correctly implemented

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
            <div className="p-6 shadow-md backdrop:filter backdrop-blue-lg h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Username'
                            className='w-full h-10 input input-bordered'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            className="w-full h-10 input input-bordered"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Link to='/signup' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        {"Don't "} have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2' disabled={loading} type="submit">
                            {loading ? 'Login....' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
