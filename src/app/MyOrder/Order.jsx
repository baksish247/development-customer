"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import success from "../assets/success.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LoadingPage from "../loaders/LoadingPage";
import Footer from "../Tip/Footer";
import GenerateBillModal from "./ConfirmGenerateBill";
import OrderHeader from "./OrderHeader";
import NotFound from "../not-found";
import Countdown from "react-countdown";
import PrintIcon from "@mui/icons-material/Print";

function Order() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const [noorderfound, setnoorderfound] = useState(false);
  const [countdown, setCountdown] = useState(10); // Countdown state
  const restaurant_id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const restaurant_name = searchParams.get("name");
  const [isOpen, setisOpen] = useState(false);
  const [orderID, setorderID] = useState("");
  const [buttonclicked, setbuttonclicked] = useState(false);
  const [waitingtime, setwaitingtime] = useState();
  const disablebutton = () => {
    setbuttonclicked(true);
  };

  const billgenerationconfirmed = async () => {
    const res = await axios.post("/api/generatebill", { order_id: orderID });
    if (res.data.success) {
      router.push(
        `/GenerateBill?id=${restaurant_id}&table=${table_number}&name=${restaurant_name}`
      );
    } else {
      toast.error("Failed to generate bill. Please ask the waiter.");
    }
  };

  const checkvalidorderid = async (order_id) => {
    try {
      const resvalid = await axios.post("/api/fetchvalidorder", { order_id });
      //console.log(resvalid.data.valid);
      if (resvalid.data.success) {
        if (!resvalid.data.valid) {
          localStorage.removeItem("orderId");
          return null;
        } else {
          return order_id;
        }
      } else {
        return null;
      }
    } catch (e) {
      return <NotFound />;
    }
  };

  useEffect(() => {
    try {
      const getalldata = async () => {
        try {
          if (typeof window !== "undefined") {
            const orid = localStorage.getItem("orderId");
            const orderId = await checkvalidorderid(orid);
            setorderID(orderId);
            if (orderId != null) {
              const res = await axios.post("/api/fetchspecificorder", {
                orderId: orderId,
              });

              //
              //console.log(res.data.data);

              if (!res.data.success) {
                toast.error(
                  "Failed to fetch your order. Please ask in-person to the waiter"
                );
                setnoorderfound(true);
                setTimeout(() => {
                  router.push(
                    `/Menu?id=${restaurant_id}&table=${table_number}`
                  );
                }, 10000);
              } else {
                setwaitingtime(res.data.data[0].estimated_time_to_serve);
                setOrderDetails(res.data.data);
              }
            } else {
              setnoorderfound(true);
              setTimeout(() => {
                router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
              }, 10000);
            }
          } else {
            toast.error(
              "Failed to fetch your order. Please ask in-person to the waiter"
            );
            setnoorderfound(true);
            setTimeout(() => {
              router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
            }, 10000);
          }
        } catch (error) {
          setnoorderfound(true);
          setTimeout(() => {
            router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
          }, 10000);
        }
      };
      getalldata();
    } catch (e) {
      return <NotFound />;
    }
  }, []);

  useEffect(() => {
    try {
      if (noorderfound) {
        const interval = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(interval);
      }
    } catch (e) {
      return <NotFound />;
    }
  }, [noorderfound]);

  useEffect(() => {
    try {
      if (countdown === 0) {
        router.push(`/Menu?id=${restaurant_id}&table=${table_number}`);
      }
    } catch (e) {
      return <NotFound />;
    }
  }, [countdown, restaurant_id, table_number, router]);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (
      orderDetails[0].order_status == "new" ||
      orderDetails[0].order_status == "updated"
    ) {
      if (completed) {
        return (
          <div className="poppins-light">
            <div className="text-center">Almost ready! 😋</div>
            <div className="text-center">We appreciate your patience!</div>
          </div>
        );
      } else {
        return (
          <div className="poppins-light">
            <span className="">
              Your meal will be ready in{" "}
              <span className="poppins-medium">
                {parseInt(hours) != 0 ? hours : ""}
                {minutes} : {seconds}
              </span>{" "}
              mins 😋.
            </span>
            <div className="text-center">We appreciate your patience!</div>
          </div>
        );
      }
    }
  };

  if (!orderDetails && !noorderfound) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  return (
    <>
      <OrderHeader
        name={restaurant_name}
        id={restaurant_id}
        table={table_number}
      />
      <Toaster />
      {orderDetails && (
        <div className="flex flex-col justify-center items-center bg-transparent px-4 mb-20 mt-4">
          <div className="text-lg flex mt-4 justify-center items-center space-x-4 text-indigo-800 w-full">
            <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-transparent to-indigo-800"></div>
            <p className="lg:text-lg text-[15px] uppercase tracking-widest">
              Current order
            </p>
            <div className="lg:w-40 w-16 h-[2px] bg-gradient-to-r from-indigo-800 to-transparent"></div>
          </div>

          <p className="text-sm text-indigo-800/70 mb-6">
            Happy you! Happy us!
          </p>

          <div className="mx-auto bg-zinc-100 w-full shadow-lg rounded-lg p-4 ">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Order Details:
              </h2>
              <hr className="bg-black my-3" />
              <ul className="list-disc list-inside">
                {orderDetails[0]?.order_items.map((item, i) => (
                  <div key={i}>
                    {item.items.map((item1, j) => (
                      <li
                        key={j}
                        className="text-gray-700 grid grid-cols-10 border-b border-dotted border-gray-400 py-2"
                      >
                        <span className="col-span-7">{item1?.food?.name}</span>{" "}
                        <span>x{item1?.quantity}</span>
                        <span className="col-span-2 text-right">
                          ₹
                          {parseFloat(item1?.food?.price) *
                            parseFloat(item1?.quantity)}
                        </span>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            </div>

            <div className="flex justify-between mb-2 mt-6">
              <span className="font-semibold text-gray-700">Sub Total</span>
              <span className="text-gray-700">
                ₹ {orderDetails[0]?.initial_bill}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-700">Taxes</span>
              <span className="text-gray-700">₹ {orderDetails[0]?.tax}</span>
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between mt-2">
              <span className="font-bold text-gray-700">Grand Total</span>
              <span className="font-bold text-gray-700">
                ₹ {orderDetails[0]?.total_bill}
              </span>
            </div>
          </div>
          <div className="mt-5">
            {waitingtime && (
              <Countdown date={new Date(waitingtime)} renderer={renderer} />
            )}
            {orderDetails[0].order_status == "served" && (
              <div className="poppins-light">
                <div className="text-center">
                  Looks like you are enjoying your meal! 😋
                </div>
                <div className="text-center">
                  You can add more items anytime.
                </div>
              </div>
            )}
            {(orderDetails[0].order_status == "billgenerated" || orderDetails[0].order_status == "waitingforbill") && (
              <div className="poppins-light">
                <div className="text-center">Your bill is being processed.</div>
              </div>
            )}
          </div>
          <button
            onClick={() =>
              router.push(`/Menu?id=${restaurant_id}&table=${table_number}`)
            }
            className="mt-10 px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            + Add more items
          </button>
          <button
            onClick={() => setisOpen(true)}
            className="fixed bottom-3 rounded-full right-4  bg-amber-500 p-4  text-white z-50"
          >
            <PrintIcon />
          </button>
        </div>
      )}
      {!orderDetails && noorderfound && (
        <div className="flex flex-col items-center justify-center mt-32 mb-32">
          <div className="text-center mx-8">
            <h1 className="text-4xl font-bold text-amber-600">Welcome!</h1>
            <p className="text-lg mt-4 text-gray-700">
              Seems like this is your first time here.
            </p>
            <p className="text-lg text-gray-700">
              Order and enjoy your first meal!
            </p>
            <div className="mt-10">
              <p className="text-lg text-[#441029] font-semibold">
                Redirecting you to home page in{" "}
                <span className="font-bold">{countdown}</span> seconds...
              </p>
            </div>
          </div>
        </div>
      )}
      <GenerateBillModal
        buttonclicked={buttonclicked}
        disablebutton={disablebutton}
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
        onConfirm={billgenerationconfirmed}
      />
      <div className="bottom-0">
        <Footer />
      </div>
    </>
  );
}

export default Order;
