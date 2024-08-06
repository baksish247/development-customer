"use client";
import React, { useEffect, useState } from "react";
import OrderCart from "./OrderCart";
import image from "../assets/Mask_group.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingPage from "../loaders/LoadingPage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "../not-found";

function Orders() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurant_id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const restaurant_name = searchParams.get("name");
  const [pastorders, setpastorders] = useState();
  const [responsecome, setresponsecome] = useState(false);
  const [responsefalse, setresponsefalse] = useState(false);
  const [countdown, setCountdown] = useState(10); // Countdown state
  
  useEffect(() => {
    try{
    if (typeof window !== "undefined") {
      var customer_id = localStorage.getItem("customerId");
    }
    const fetchallorders = async () => {
      //console.log(customer_id, restaurant_id);

      const res = await axios.post("/api/fetchcustomerorders", {
        restaurant_id,
        customer_id,
      });
      //console.log(res.data);
      setresponsecome(true);
      if (!res.data.success) {
        setresponsefalse(true);
        setTimeout(() => {
          router.push(`/?id=${restaurant_id}&table=${table_number}`);
        }, 20000);
      } else {
        setpastorders(res.data.data);
      }
    };
    fetchallorders();
    }catch(e){
      return(<NotFound/>)
    }
  }, []);

  useEffect(() => {
    if (responsefalse) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [responsefalse]);

  useEffect(() => {
    if (countdown === 0) {
      router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
    }
  }, [countdown, restaurant_id, table_number, router]);

  if (!responsecome) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen relative">
      <Toaster />
      <Image src={image} alt="topvector" className="absolute top-0 left-0" />
      {/* <Heading heading={"Previously Ordered Items"} /> */}
      <h1 className="text-4xl pt-14 text-center font-semibold text-[#3d3d3d] ">
        {restaurant_name}
      </h1>
      <div className="mb-6 w-48 text-center mx-auto h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
      {/* <div className="mb-6 w-48 text-center mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#a09fa0] to-transparent"></div> */}
      <div className="flex relative justify-center items-center mt-4">
        <Link
          href={`/Menu?id=${restaurant_id}&table=${table_number}`}
          className="bg-indigo-600 rounded-full py-2 px-4 text-[#FFF9EA] flex justify-center items-center hover:scale-90 duration-700"
        >
          Create a new order
        </Link>
      </div>
      <div className="text-base flex mt-4 px-2 mb-6 justify-center items-center space-x-2 text-[#565556] w-full">
        <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-transparent to-indigo-600"></div>
        <p className="lg:text-lg text-[15px] text-indigo-600 uppercase tracking-widest">
          Previous Orders
        </p>
        <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-indigo-600 to-transparent"></div>
      </div>
      {pastorders?.length > 0 &&
        pastorders.map((order, i) => (
          <>
            <div key={i} className="px-2 mt-3">
              <div className="flex justify-between">
                <p className="text-stone-600 px-2">
                  {new Date(order.createdAt).toISOString().split("T")[0]}
                </p>

                <p className="text-right mr-3">₹ {order.total_bill}</p>
              </div>
              {/* <section className="flex noscroll overflow-x-auto space-x-2 p-2">
              {order.order_items.map((orderitems, j) => (
                <div key={j}>
                  {orderitems.items.map((itemss,k)=>(<div key={k}  className="flex-shrink-0"><OrderCart item={itemss}/></div>))}
                </div>
              ))}
            </section> */}
              <section className="flex noscroll overflow-x-auto space-x-2 p-2">
                {order.order_items.flatMap((orderItem, j) =>
                  orderItem.items.map((item, k) => (
                    <div key={`${j}-${k}`} className="flex-shrink-0">
                      <OrderCart item={item} />
                    </div>
                  ))
                )}
              </section>
            </div>
            <hr className="my-6 border-[1px] border-zinc-400 border-dashed mx-4" />
          </>
        ))}
      {responsefalse && (
        <div className="flex flex-col items-center justify-center mt-32 mb-32">
        <div className="text-center poppins-regular mx-8">
          <h1 className="text-4xl poppins-bold text-indigo-600">
            Welcome!
          </h1>
          <p className="text-lg mt-4 text-gray-700">
            Seems like this is your first time here.
          </p>
          <p className="text-lg text-gray-700">
            Order and enjoy your first meal!
          </p>
          <div className="mt-10">
            <p className="text-lg text-zinc-800 font-semibold">
              Redirecting you to home page in{" "}
              <span className="font-bold">{countdown}</span> seconds...
            </p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Orders;
