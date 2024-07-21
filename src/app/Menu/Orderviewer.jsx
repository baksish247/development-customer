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

function Orderviewer({id,table,order_status,orderid,name}) {
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
    console.log(orderid,id,table,name)
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
  
  if(cart.totalQuantity==0){
    return(
      <section>
        <Toaster/>
      <main className="fixed bottom-0 w-full backdrop-blur-md  bg-[#44102987] p-2 text-white z-50">
        <div className="flex justify-center lg:px-10 px-2 relative items-center p-2">
          {(order_status=="new" || order_status=="updated" || order_status=="served") && <button onClick={()=>setisOpen(true)} className=" tracking-[0.5rem] bg-white px-10 py-2 font-extrabold text-xl rounded-md text-[#441029]">
            GENERATE BILL
          </button>}
          {order_status=="waitingforbill" && <h2  className="text-center text-lg text-white ">
            Please wait while we get your bill !!<br/>
            Till then, may be some desserts...
          </h2>}
          {order_status=="null" && <h2  className="text-center text-lg text-white ">
            Welcome! 😊<br/>Explore our variety of menu and place your order.
          </h2>}
          {order_status=="billgenerated" && <h2  className="px-2 py-2 text-center text-lg text-white ">
            Hope you enjoyed your meal !
          </h2>}
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
  
  
  return (
    <section>
      <main className="fixed bottom-[8px] w-full border-t-2 border-[#6C0345] z-50">
        <div className="flex justify-between lg:px-10 px-4 relative items-center h-16 p-2">
          <Image
            src={goldbg}
            alt="bg"
            width={10000}
            priority
            className="-z-10 absolute top-0 left-0"
            height={1000}
          />
          <h2 className="text-[#6C0345] font-bold text-xl mt-2">
            {cart?.totalQuantity} item added <EastIcon />
          </h2>
          <Link href={`/ConfirmOrder?id=${id}&table=${table}`} className="px-6 py-2 mt-2 bg-white border-2 rounded-md text-[#6C0345] border-[#6C0345]">
            Review order
          </Link>
        </div>
      </main>
    </section>
  );
}

export default Orderviewer;
