"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import goldbg from "../assets/gbg.png";
import EastIcon from '@mui/icons-material/East';
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateQuantity, hydrate } from "../redux/CartSlice";
import Link from "next/link";
import GenerateBillModal from "./ConfirmGenerateBill";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import PrintIcon from '@mui/icons-material/Print';

function  Orderviewer({id,table,order_status,orderid,name}) {
  const router=useRouter();
  const [isOpen, setisOpen] = useState(false);
  const cart = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try{
    if(typeof window !== 'undefined'){
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = JSON.parse(localStorage.getItem('totalQuantity')) || 0;
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;
    
    // Dispatch an action to hydrate the cart state
    if (items.length > 0 || totalQuantity > 0 || totalPrice > 0) {
      dispatch(hydrate({ items, totalQuantity, totalPrice }));
    }
    setIsHydrated(true);
   } // Mark as hydrated after initial load
  }
  catch(e){
    return(<NotFound/>)
  }
  }, [dispatch]);

  const billgenerationconfirmed=async()=>{
   // console.log(orderid,id,table,name)
    toast.loading("Generating bill");
    const res=await axios.post('/api/generatebill',{order_id:orderid})
    if(res.data.success){
      toast.dismiss();
    router.push(
      `/GenerateBill?id=${id}&table=${table}&name=${name}`
    )
  }
  else{
    toast.dismiss();
    toast.error("Failed to generate bill. Please ask the waiter.")
  }
  }

  if (!isHydrated) {
    return null; // Don't render the component if not hydrated or cart is empty
  }
  //console.log(cart.totalQuantity);
  if(cart.totalQuantity==0){
    return(
      <section>
        <Toaster/>
      <main className="fixed bottom-5 rounded-full right-4  bg-amber-500   text-white z-50">
        <div className="flex justify-center  relative items-center ">
        {(order_status=="new" || order_status=="updated" || order_status=="served") && <button onClick={()=>setisOpen(true)} className=" tracking-[0.5rem] p-3 px-[0.85rem] font-extrabold text-xl rounded-md text-white">
            <PrintIcon/>
          </button>}
        </div>
      </main>
      <GenerateBillModal
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onConfirm={billgenerationconfirmed}
      />
    </section>
    )
  }

  else if(cart.totalQuantity>0){
  return (
    <section>
      <main className="fixed bottom-[0px] w-full border-t-2 border-white z-50">
        <div className="flex justify-between bg-indigo-600 lg:px-10 px-4 relative items-center h-16 p-2">
          {/* <Image
            src={goldbg}
            alt="bg"
            width={10000}
            priority
            className="-z-10 absolute top-0 left-0"
            height={1000}
          /> */}
          <h2 className="text-white poppins-medium text-xl">
            {cart?.totalQuantity} {cart?.totalQuantity>1?"items":"item"} added <EastIcon />
          </h2>
          <Link href={`/ConfirmOrder?id=${id}&table=${table}`} className="px-6 py-2 bg-white border-2 rounded-md text-black border-white poppins-medium">
            Review order
          </Link>
        </div>
      </main>
    </section>
  );
}
}


export default Orderviewer;
