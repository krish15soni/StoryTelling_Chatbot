import React from "react";
import Image from "next/image";
import logo from "./images/logo.png";
import Account from "./images/Ac.png";
// import styles from './css/Navbar.module.css'

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font ">
      <nav className=" mx-auto shadow-md shadow-[#e2d6e0] flex  justify-between p-[20px] bg flex-row items-center ">
        <div className="humburger inline-block p-4 cursor-pointer md:hidden">
          <div className="line h-0.5 w-6 my-1 bg-black"></div>
          <div className="line h-0.5 w-6 my-1 bg-black"></div>
          <div className="line h-0.5 w-6 my-1 bg-black"></div>
        </div>

        <Image
          src={logo}
          className=" cursor-pointer max-w-full  h-[12%] w-[18%]"
          width={5000}
          height={5000}
          alt="Picture of the Logo"
        />

        <div className=" text-black flex gap-6 items-center justify-center max-[650px]:hidden">
          <a className="hover:text-[#353a47] text-[20px] relative after:bg-[#7E4684] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Home</a>
          <a className="hover:text-[#353a47]  text-[20px] relative after:bg-[#7E4684] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">About</a>
          <a className="hover:text-[#353a47]  text-[20px] relative after:bg-[#7E4684] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Contact</a>
        </div>

        <div className="flex flex-row gap-2 items-center ">
            <div className="max-[650px]:hidden flex felx-row gap-1">
            <label for="toggle"  className="hover:border-y-emerald-950 cursor-pointer s">
              Dark 
            </label>
          <div className="flex justify-center items-center ">
            <div className="relative inline-block w-10 mr-3 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer dark:border-gray-800"
              />
              <label
                for="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer dark:bg-gray-800"
              ></label>
            </div>
            </div>
          </div>
          <div className=" cursor-pointer gap-1 max-[650px]:hidden text-[110%]">
            User_Name
          </div>
          <Image
            src={Account}
            className=" cursor-pointer h-[22px] w-[24px] md:h-[32px] md:w-[32px]   "
            width={500}
            height={500}
            alt="Picture of the acount"
          />
        </div>
        {/* <section class="bg-[#0077b6] h-screen w-screen text-white flex items-center justify-center">
  <a class="text-3xl relative after:bg-white after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">Text you want to underline in just one line</a>
</section> */}
      </nav>

    </header>
  );
};

export default Navbar;
