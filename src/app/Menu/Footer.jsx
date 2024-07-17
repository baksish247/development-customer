// components/Footer.js
import React from 'react';
import vector from '../assets/maskb.png'
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-[#441029] text-[#FFF9EA] text-center  py-10  relative h-80">
      <div className="max-w-screen mx-auto">
        <h2 className="text-lg poppins-medium mb-4">Thank you for Visiting Us!</h2>
        <p className="mb-4 poppins-light">powered by</p>
        <div className='bg-[#FFF9EA] -mt-[10px] w-fit mx-auto rounded px-4 '>
        <img
          src="https://tipppz.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbaksish_logo.b18dc14f.png&w=96&q=75" // Replace with actual logo URL
          alt="BakSish"
          className="mx-auto w-32 h-10 mb-10"
        /></div>
        <div className='relative w-fit mx-auto mt-10'>
        <p className="poppins-light">Wanna get partnered with us?</p>
        <Link className='absolute left-8 z-20' href="https://www.baksish.in" >
          Visit &nbsp;<span className="underline">Baksish Partner</span>
        </Link ></div>
      </div>
      <div className="absolute bottom-0   right-0">
        <Image src={vector} alt="vector" className="w-[17rem] h-52 " />
      


      </div>
    </footer>
  );
}

export default Footer;
