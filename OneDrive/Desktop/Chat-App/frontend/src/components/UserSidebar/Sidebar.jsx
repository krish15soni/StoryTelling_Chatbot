import React from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';

const Sidebar = () => {
  return (
    <div className='border-r border-l  border-slate-500 py-4 px-1 flex flex-col '>
      <SearchInput />
      <div className="border-b border-slate-300 my-4"></div> {/* Divider using Tailwind CSS */}
      <Conversations />
   
    </div>
  );
}

export default Sidebar;
