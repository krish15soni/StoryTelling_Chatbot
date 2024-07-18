import React from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col '>
      <SearchInput />
      <div className="border-b border-slate-300 my-4"></div> {/* Divider using Tailwind CSS */}
      <Conversations />
      <LogoutButton className='cursor-pointer mt-auto' /> {/* Ensure LogoutButton is placed at the bottom */}
    </div>
  );
}

export default Sidebar;
