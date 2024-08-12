"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import SomethingNew from "./SomethingNew";
import BestSeller from "./BestSeller";
import DisplayCategorywisemenu from "./DisplayCategorywisemenu";
import Orderviewer from "./Orderviewer";
import LoadingPage from "../loaders/LoadingPage";
import NotFound from "../not-found";
import OrderSuccess from "./OrderSuccess";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Footer from "../Tip/Footer";


function FetchAllData() {
  const [menuitems, setmenuitems] = useState();
  const searchParams = useSearchParams();
  const [order, setorder] = useState("");
  const [orderstatus, setorderstatus] = useState("null");
  const [openorder, setopenorder] = useState(false);
  const router = useRouter();
  const restaurant_id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const orderId = searchParams.get("orderId");
  const [resname, setresname] = useState("")
  const [ordid, setordid] = useState("")
  useEffect(() => {
    try {

      const getmenu = async () => {
        const res = await axios.post("/api/fetchrestaurantmenu", {
          restaurant_id,
        });

        if (orderId != null) {
          const fetchorder = await axios.post("/api/fetchspecificorder", {
            orderId: orderId,
          });
          setorder(fetchorder.data.data);
          setopenorder(true);
        }
        if (typeof window != undefined) {
          const oid = localStorage.getItem("orderId");
          setordid(oid)
          if (oid != null) {
            const fetchorder = await axios.post("/api/fetchspecificorder", {
              orderId: oid,
            });

            if (fetchorder.data.success) { setorderstatus(fetchorder.data.data[0].order_status) }
          }
        }
        setmenuitems(res.data.data);
        setresname(res.data.data.restaurant_name)
      };
      getmenu();
    }
    catch (e) {
      return (<NotFound />)
    }
  }, []);

  const closeordersuccess = () => {
    setopenorder(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('orderId', null);
    router.replace(`?${newParams.toString()}`);

  }
  if (!menuitems)
    return (
      <>
        <LoadingPage />
      </>
    );

  return (
    <div>

      {menuitems && <div className="bg-gray-100 min-h-screen">
        <Header
          name={menuitems?.restaurant_name}
          restaurant_id={menuitems?.restaurant_id}
          table_number={table_number}
        />
        {/* <What_your_mood /> */}
        {order && openorder && <OrderSuccess orderDetails={order} onClose={closeordersuccess} />}
        <SomethingNew menu={menuitems?.food_items} />
        {/* <BestSeller /> */}
        <DisplayCategorywisemenu menu={menuitems?.food_items} />
        <Orderviewer
          id={menuitems?.restaurant_id}
          table={table_number}
          order_status={orderstatus}
          orderid={ordid}
          name={resname}
        />

        <div className="flex relative justify-center items-center mt-4">
          <button
            type="button"
            onClick={() => { router.push(`/Tip?id=${restaurant_id}&table=${table_number}`) }}
            className="py-3 px-4 inline-flex rounded-md text-white mb-6 bg-indigo-600  justify-center items-center hover:scale-98 "
          >
            <span>Rate & Treat</span>

            <ArrowRightAltIcon />
          </button>
        </div>

      </div>}

      <Footer />
    </div>
  );
}

export default FetchAllData;
