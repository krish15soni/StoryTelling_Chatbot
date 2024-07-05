import React from 'react'
import GenderCheckbox from './GenderCheckbox'

const SingUp = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className=" p-6 shadow-md  backdrop:filter backdrop-blue-lg
        h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
                <h1 className='text-3xl frot-semibold text-center text-gray-300'>
                    Sing Up
                    <span className='text-blue-500'>ChatApp</span>
                </h1>

                <form action="">
                    <div className="">
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input type="text" placeholder='Enter Full Name' className='w-full h-10 input input-bordered' />
                    </div>

                    <div className="">
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input type="text" placeholder='Enter Username' className='w-full h-10 input input-bordered' />
                    </div>

                    <div>
                        <label className="label">
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input type="password" placeholder='Enter Password' className="w-full h-10 input input-bordered" />
                    </div>

                    <div>
                        <label className="label">
                            <span className='text-base label-text'>Conform Password</span>
                        </label>
                        <input type="password" placeholder='Enter Conform Password' className="w-full h-10 input input-bordered" />
                    </div>

                    <GenderCheckbox />

                    <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        Already have an account?
                    </a>

                    <div className="">
                        <button className='btn btn-block btn-sm mt-2'>Sing Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SingUp