import React from 'react';

import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-indigo-600 text-[#FFFFFF] text-center py-6 ">
      <div className="max-w-screen  mx-auto">
      
        <div>
        <h2 className="text-sm mb-4">Happy you - Happy us !</h2>
        <p className="mb-4"></p>
        <div className='bg-[#FFF9EA] -mt-[10px] w-fit mx-auto rounded px-4 '>
        <img
          src="https://tipppz.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbaksish_logo.b18dc14f.png&w=96&q=75" // Replace with actual logo URL
          alt="BakSish"
          className="mx-auto w-24 h-8 mb-3 mt-2"
        /></div>
        </div>
        
        <div className='relative w-fit mx-auto '>
        <p className="text-sm"></p>
        <Link className='relative text-sm  z-20' href="https://www.baksish.in" >
          <span className= "underline">Visit us at Baksish </span> 
        </Link ></div>
        </div>
            
    </footer>
  );
}

export default Footer;