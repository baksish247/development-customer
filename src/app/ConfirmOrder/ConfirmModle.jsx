"use client";
import React, { useState } from "react";
import {VscClose } from 'react-icons/vsc'

function ConfirmModle({cart,handleplaceorder,handleclose}) {
    //console.log(cart);
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <VscClose onClick={handleclose} className="absolute right-4 top-4 size-5 cursor-pointer"/>
        <h2 className="text-2xl font-bold text-zinc-700 mb-4">
          Confirm Your Order
        </h2>
        <div className="mb-4">
          <p className="text-lg font-medium text-zinc-700">
            Total Quantity: {cart.totalQuantity}
          </p>
          <p className="text-lg font-medium text-zinc-700">
            Total Price: ${cart.totalPrice}
          </p>
        </div>
        <div className="mb-4">
          <label
            className="block text-zinc-700 font-medium mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            onChange={(e)=>setname(e.target.value)}
            id="name"
            className="w-full px-3 py-2 border border-indigo-600 rounded focus:outline-none focus:ring focus:ring-indigo-600"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-zinc-700 font-medium mb-2"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            onChange={(e)=>setphone(e.target.value)}
            className="w-full px-3 py-2 border border-indigo-600 rounded focus:outline-none focus:ring focus:ring-indigo-600"
            placeholder="Enter your phone number"
          />
        </div>
        <button
          onClick={()=>handleplaceorder(name,phone)}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmModle;
