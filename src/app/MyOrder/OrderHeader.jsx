import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import goldbg from "../assets/goldbg.png";
import maskvector from "../assets/Mask_group.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useRouter } from 'next/navigation';
import { KeyboardBackspace } from '@mui/icons-material';
function OrderHeader({name,id,table}) {
  const router=useRouter();
  return (
    <div><div className="h-[170px] relative w-screen mix-blend-multiply ">
    {/* <Image
      alt="bgbanner"
      src={maskvector}
      className="absolute top-0 left-0"
    /> */}
    <div onClick={()=>router.back()} className="absolute left-4 top-6 "><KeyboardBackspace/></div>
    <h1 className="text-4xl pt-14 text-center font-semibold text-[#3d3d3d] ">
          <span className='border-b-2 poppins-medium border-b-indigo-600'>{name}</span>
        </h1>
        
        <div className="mb-6 w-48 text-center mx-auto h-[2px] "></div>
    
    <div className="flex relative justify-center items-center mt-4">
      <button
      type="button"
        onClick={()=>{router.push(`/Tip?id=${id}&table=${table}`)}}
        className="bg-indigo-600 rounded-full py-1 px-4 text-[#FFF9EA] flex justify-center items-center hover:scale-90 "
      >
        Treat the team
        
        <ArrowRightAltIcon />
      </button>
    </div>
  </div></div>
  )
}

export default OrderHeader