import React, { useState } from 'react'
import Image from "next/image";
import success from "../assets/ordersuccess.gif";
import { KeyboardDoubleArrowUp } from '@mui/icons-material';

function OrderSuccess({orderDetails,onClose}) {
    console.log(orderDetails);
  return (
    <div className='absolute backdrop-blur-sm  z-10 top-20 w-full p-4 pb-1'>
    {orderDetails && <div className="w-full -mb-3 flex bg-[#ffffffee]  shadow-lg shadow-[#c4b48b] flex-col rounded-2xl justify-center items-center">
      <Image height={100} width={100} alt="success" src={success} className='mix-blend-multiply w-48'/>
      <h1 className="text-2xl poppins-medium text-[#441029] mb-2">
        Order Placed!
      </h1>
      
      <div className=" w-full mx-auto bg-[#ffffffee] shadow-lg rounded-lg pb-3  ">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 px-4">
            Order Details:
          </h2>
          <hr className="bg-black my-3"/>
          <ul className="list-disc max-h-64 overflow-y-auto list-inside px-4">
            {orderDetails[0]?.order_items?.map((item, i) => (
              <div key={i}>
                {item?.items?.map((item1, j) => (
                  <li key={j} className="text-gray-700 flex justify-between border-b border-dotted border-gray-400 py-2">
                    <span>{item1?.food?.name} &nbsp;&nbsp;x{item1?.quantity}</span><span> ₹ {parseFloat(item1?.food?.price)*parseFloat(item1?.quantity)} </span>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
        <div className="flex justify-between mb-2 mt-2 px-4">
          <span className="font-semibold text-gray-700">Sub Total</span>
          <span className="text-gray-700">
            ₹ {orderDetails[0]?.initial_bill}
          </span>
        </div>
        <div className="flex justify-between mb-2 px-4">
          <span className="font-semibold text-gray-700">Taxes</span>
          <span className="text-gray-700">₹ {orderDetails[0]?.tax}</span>
        </div>
        <div className="flex justify-between mt-2 mb-2 px-4">
          <span className="font-bold text-gray-700">Grand Total</span>
          <span className="font-bold text-gray-700">
            ₹ {orderDetails[0]?.total_bill}
          </span>
        </div>
        
      </div>
      </div>
    }
    <div className='flex justify-center items-center mt-'><div className='relative -bottom-8 w-12 bg-[#441029d3] animate-bounce duration-1000 p-3 rounded-full' onClick={onClose}><KeyboardDoubleArrowUp className='text-white'/></div></div>
    </div>
  )
}

export default OrderSuccess