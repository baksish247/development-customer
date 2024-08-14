"use client"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateQuantity } from "../redux/CartSlice";
import toast, { Toaster } from 'react-hot-toast';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function LongCard({ item }) {
  const cart = useSelector((state) => state?.cart);
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem({ _id: item._id, name: item.name, price: item.price, quantity: 1 }));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem({ _id: item._id }));
  };

  const handleUpdateQuantity = (quantity) => {
    if (quantity < 0) {
      dispatch(updateQuantity({ _id: item._id, quantity: 0 }));
    } else if (quantity > 50) {
      toast.error("Quantity cannot be more than 50");
    } else {
      dispatch(updateQuantity({ _id: item._id, quantity }));
    }
  };

  const cartItem = cart.items.find(cartItem => cartItem._id === item._id);
  

  return (
    <div className="flex bg-white -z-40 items-center space-x-12 p-2 mb-2 rounded-lg space-y-2">
      <div className="flex-grow w-2/5">
        <h2 className="text-lg poppins-semibold capitalize text-[#2f2f2f]">{item?.name}</h2>
        <p>₹ {item?.price}</p>
        <p className="text-[10px] poppins-light text-start text-[#565556]">{item.description}</p>
      </div>
      <div className="w-2/5 flex justify-end relative">
        <img className="h-24 w-40 -z-5 object-cover object-center shadow-md" src={item?.image} alt="item" />
        <div className="absolute rounded-lg w-24 px-[2px] py-[2px] -bottom-2 lg:right-24 lg:left-[60%] -left-4 bg-zinc-50 drop-shadow-md text-amber-600 border-amber-500 border-2 hover:scale-90 duration-200 font-semibold mb-2 flex items-center space-x-2 text-2xl">
          {cartItem?.quantity >0 ? (
            <div className="flex justify-center text-center w-full items-center space-x-2 ">
              <span  onClick={() => handleUpdateQuantity(cartItem?.quantity - 1)} className="cursor-pointer"><RemoveIcon/></span>
              <span className="text-base">{cartItem?.quantity}</span>
              <span onClick={() => handleUpdateQuantity(cartItem?.quantity + 1)} className="cursor-pointer"><AddIcon/></span>
              
            </div>
          ) : (
            <span onClick={handleAddItem} className="cursor-pointer text-xl w-full text-center">Add</span>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default LongCard;
