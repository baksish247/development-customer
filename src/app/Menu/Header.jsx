"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import goldbg from "../assets/goldbg.png";
import maskvector from "../assets/Mask_group.png";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Link from "next/link";
import { useRouter } from "next/navigation";


function Header({name,restaurant_id,table_number}) {

  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    try{
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust this value as needed
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }
  catch(e){
    return(<NotFound/>)
  }
  }, []);

  return (
    <div className="h-[200px] relative w-screen bg-transparent">
      <Image
        alt="bgbanner"
        src={maskvector}
        className="absolute top-0 left-0 h-2"
      />
      <div className="flex justify-between items-center p-6">
        {/* <img
          src="https://tipppz.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbaksish_logo.b18dc14f.png&w=96&q=75" // Replace with actual logo URL
          alt="BakSish"
          className="mb-4"
        /> */}
        <span className=" text-xl border-b-2 poppins-medium border-b-indigo-600">{name}</span>
        <Link href={`/MyOrder?id=${restaurant_id}&table=${table_number}&name=${name}`} className="rounded-md border shadow-md  text-indigo-600 border-indigo-600 text-md py-1 px-4">My Order</Link>
      </div>
     
      <div className={`search px-10 relative`}>
        <div
          onClick={() => {
            router.push(`/SearchItems?id=${restaurant_id}&name=${name}&table=${table_number}`);
          }}
          className="pr-8 pl-10 h-12 focus:ring-0  bg-white border-[0.1px] border-black border-opacity-25 w-full rounded-md shadow-md"
        >
        <SearchIcon className="absolute top-3 text-[#222] opacity-80 h-10 left-14 poppins-regular " />
        <span className="absolute top-[0.8rem] left-24 text-gray-600">Search for Your Favourites</span>
        </div>
      </div>
      <div className="mt-6 h-8 relative">
        
        <p className="text-center poppins-regular p-1 text-[#222] text-[12px] width-full bg-[#FFC011]">
         Now you can review and rate our service !
        </p>
      </div>
    </div>
  );
}

export default Header;
