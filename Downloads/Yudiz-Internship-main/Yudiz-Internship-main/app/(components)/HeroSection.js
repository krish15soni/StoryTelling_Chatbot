"use client";

import Link from "next/link";
import React from "react";
import uuid from "react-uuid";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DC from "./images/R.png"
import DC2 from "./images/'R'.png"
const HeroSection = () => {
  const router = useRouter();
  const createForm = () => {
    const id = uuid();
    router.push(`/create-form/${id}`);
  };
  return (
    <>
    <div class="flex flex-col mt-10 items-center justify-center space-y-10">
        <div class="flex max-[480px]:text-[100%] text-center">
          <h1 class="flex flex-row animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-black pr-5 text-[300%] text-black font-bold max-[700px]:text-[200%]">
            Welcome to <div className="text-[#7D4686] ">Yudiz Forms</div>
          </h1>
        </div>
  
      <div className="justify-between max-[700px]:w-[75%] max-[700px]:text-[90%] text-[110%] w-[55%] font-bold flex text-center text-[#1c395f]    ">
        <p><b>"</b>Welcome to our Form Generator Company, where simplicity meets sophistication. We specialize in crafting user-friendly, customizable forms that effortlessly collect and organize data. Our intuitive platform empowers you to create surveys, feedback forms, and more, all with a seamless user experience. With sleek designs and robust functionalities, we transform your ideas into interactive forms that drive engagement and capture invaluable insights. Experience the ease of data collection and the power of informed decision-making with our Form Generator Company.<b>"</b></p>
        {/* <div className="absolute ">
        <Image
          src={DC}
          className=" left-[15%] top-[25%]"
          width={5000}
          height={5000}
          alt="Picture of the DC"
        />
        <Image
          src={DC2}
          className=" bottom-32 right-[105%]"
          width={5000}
          height={5000}
          alt="Picture of the DC2"
        />
        </div> */}
      </div>
      </div>
        <div className="px-3 w-full  mt-12 ">
      <button
        className="w-max drop-shadow-lg	btn-primary  text-white bg-[#358bc5] hover:bg-[#1d577d] px-3 py-2 rounded-full block m-auto animate-bounce"
        onClick={createForm}
      >
        Create Form <b>+</b>
      </button>
    </div>
    </>
  );
};

export default HeroSection;
