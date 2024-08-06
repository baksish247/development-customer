"use client";
import Image from "next/image";
import logo from "../assets/baksish1.png";
import group from "../assets/Group.svg";
import chefHat from "../assets/Chef Hat Icon.svg";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import border from "../assets/Group_32.png";
import chef from "../assets/iconfood.png";
import heading from "../assets/heading.png";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  CurrencyRupee,
  EditNote,
  History,
  ReceiptLong,
} from "@mui/icons-material";
import LoadingPage from "../loaders/LoadingPage";
import GenerateBillModal from "./ConfirmGenerateBill";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "../not-found";
import { clearCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import LandingLoader from "./LandingLoader";
import chefhat from "../assets/chefhat.png";

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const [name, setname] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const [orderID, setorderID] = useState("");
  const router = useRouter();
  const [isterminated, setisterminated] = useState(false);
  const dispatch = useDispatch();
  const [buttonclicked, setbuttonclicked] = useState(false);

  const disablebutton = () => {
    setbuttonclicked(true);
  };
  const billgenerationconfirmed = async () => {
    if (orderID != "" || orderID != null) {
      const res = await axios.post("/api/generatebill", { order_id: orderID });
      if (res.data.success) {
        router.push(
          `/GenerateBill?id=${id}&table=${table_number}&name=${name}`
        );
      } else {
        setisOpen(false);
        toast.error("You haven't placed any order yet.");
      }
    } else {
      toast.error("Failed to generate bill. Please ask the waiter.");
    }
    setbuttonclicked(false);
  };

  useEffect(() => {
    const fetchdetails = async () => {
      const res = await axios.post("/api/fetchrestaurantmenu", {
        restaurant_id: id,
      });
      //console.log(res.data.data)
      if (res.data.success) {
        dispatch(clearCart());
        setname(res.data.data.restaurant_name);
        const order_id = localStorage.getItem("orderId");
        //console.log(order_id);
        if (order_id) {
          const resvalid = await axios.post("/api/fetchvalidorder", {
            order_id,
          });
          //
          console.log(resvalid.data.valid);
          if (resvalid.data.success) {
            if (!resvalid.data.valid) {
              localStorage.removeItem("orderId");
            } else {
              setorderID(order_id);
              router.push(
                `/Menu?id=${id}&table=${table_number}&name=${res.data.data.restaurant_name}`
              );
            }
          }
        }
      } else {
        setname("notfoundpage");
      }
      setisterminated(true);
    };
    fetchdetails();
  }, [id]);

  if (!name || !isterminated) {
    return (
      <div>
        <LandingLoader />
      </div>
    );
  }

  return (
    <div>
     
      <div className="bg-white h-[90vh] py-10 relative overflow-hidden">
        <Toaster />
        <div
          style={{
            position: "absolute",
            top: "-12%",
            left: "-20%",
            width: "200px",
            height: "200px",
            backgroundColor: "#4F46E5",
            borderRadius: "50%",
            zIndex: 0, // Ensure these are behind all other content
            opacity: 0.2, // Soothing effect
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "40%",
            right: "-30%",
            width: "200px",
            height: "200px",
            backgroundColor: "#4F46E5",
            borderRadius: "50%",
            transform: "rotate(70deg)",
            zIndex: 0, // Ensure these are behind all other content
            opacity: 0.2, // Soothing effect
          }}
        ></div>
        {name && name != "notfoundpage" && (
          <div className="w-screen max-h-screen  ">
            <div className="relative max-w-screen overflow-x-hidden flex justify-center flex-col items-center ">
              <Image src={chefhat} width={150} height={150} alt="chefhat" />
              <h1 className=" tracking-widest mb-16   text-center  poppins-medium uppercase text-black text-2xl ">
                {name}
              </h1>
            </div>
            <div className="flex justify-center items-center lg:flex-row  flex-col lg:space-y-0 lg:space-x-4 space-y-[16px] ">
              <button
                disabled={!isterminated}
                onClick={() =>
                  (window.location = `/Menu?id=${id}&table=${table_number}&name=${name}`)
                }
                className="border-2 text-[18px] text-center poppins-light w-64  border-white z-50 bg-indigo-600 px-4 rounded-md text-[#FFF9EA] py-3"
              >
                <EditNote /> Place an Order
              </button>
              <button
                disabled={!isterminated}
                onClick={() =>
                  (window.location = `/PreviousOrders?id=${id}&table=${table_number}&name=${name}`)
                }
                className="border-2 poppins-light text-center w-64 z-50 border-indigo-600 bg-transparent px-4 rounded-md text-indigo-600 py-3"
              >
                <History /> Previous Orders
              </button>
             
             
            </div>

            
            <GenerateBillModal
              buttonclicked={buttonclicked}
              disablebutton={disablebutton}
              isOpen={isOpen}
              onClose={() => setisOpen(false)}
              onConfirm={billgenerationconfirmed}
            />
          </div>
        )}
        {name && name == "notfoundpage" && (
          <div>
            <NotFound />
          </div>
        )}
        
      </div>
      <div className=" text-zinc-500 absolute bottom-32 w-full text-center ">
                powered by BakSISH
              </div>
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
          transform: "rotate(180deg)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{
            position: "relative",
            display: "block",
            width: "calc(131% + 1px)",
            height: "120px",
          }}
        >
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            style={{ fill: "#4F46E5" }}
          />
        </svg>
      </div>
    </div>
  );
};

export default page;
