"use client";
import Image from "next/image";
import React from "react";
import loadingimg from "../assets/loading.gif";
import BouncingText from "./LandingLoaderText";
function page() {
  return (
    <div className="fixed w-screen h-screen bg-[#fff9ea] flex justify-center flex-col items-center ">
      <Image
        className="mix-blend-multiply lg:w-[50%]"
        src={loadingimg}
        alt="none"
        width={1000}
        height={1000}
      />
      <div><BouncingText/></div>
    </div>
  );
}

export default page;
