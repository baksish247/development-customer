"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQuantity, removeItem } from "../redux/CartSlice";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function SomethingNew({ offers }) {
  // const restaurant_id = localStorage.getItem("restaurantId");
  //const [offers, setoffers] = useState([]);
  const cart = useSelector((state) => state?.cart);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchoffers = async () => {
  //     const { data } = await axios.post("/api/fetchoffersbyid", {
  //       restaurant_id: restaurant_id,
  //     });
  //     setoffers(data.data);
  //   };
  //   fetchoffers();
  // }, [restaurant_id]);

  // Sort offers by createdAt timestamp in descending order (latest first)
  const sortedoffers = offers.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Carousel logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedoffers.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [sortedoffers.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollPosition =
        (carousel.scrollWidth / sortedoffers.length) * currentIndex;
      carousel.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex, sortedoffers.length]);

  const handleAddItem = (item) => {
    console.log(item);
    
    dispatch(
      addItem({
        _id: item.food,
        name: item.itemname,
        price: item.newPrice,
        quantity: 1,
      })
    );
  };

  const handleUpdateQuantity = (item, quantity) => {
    if (quantity < 0) {
      dispatch(removeItem({ _id: item.food }));
    } else if (quantity > 50) {
      toast.error("Quantity cannot be more than 50");
    } else {
      dispatch(updateQuantity({ _id: item.food, quantity }));
    }
  };

  return (
    <>
      <h3 className="text-xl px-2 poppins-semibold">Chef's Special</h3>
      <div className="relative py-2 mt-0 overflow-hidden">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto noscroll space-x-2 lg:space-x-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {sortedoffers.map((item) => {
            const cartItem = cart.items.find(
              (cartItem) => cartItem._id === item.food
            );

            return (
              <div
                key={item._id}
                className="flex-shrink-0 w-full h-[250px] relative"
              >
                <Image
                  src={item.image}
                  alt={item?.itemname || "img"}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-md flex flex-col justify-end p-4">
                  <h2 className="text-left text-lg poppins-bold text-white">
                    {item.itemname}
                  </h2>
                  <div className="flex justify-between items-center ">
                    <div className="flex justify-start items-center">
                      <p className="text-sm poppins-semibold text-white mr-2">
                        ₹{item.newPrice}
                      </p>
                      {item.oldPrice && (
                        <p className="text-xs text-gray-200 line-through">
                          ₹{item.oldPrice}
                        </p>
                      )}
                    </div>
                    <div className="bg-orange-500  text-white rounded-lg px-2 py-1 flex items-center space-x-2">
                    {cartItem?.quantity > 0 ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateQuantity(item, cartItem.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center  rounded-full"
                          >
                            <RemoveIcon fontSize="small" />
                          </button>
                          <span className="text-base">{cartItem?.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item, cartItem.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center  rounded-full"
                          >
                            <AddIcon fontSize="small" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddItem(item)}
                          className="w-20 h-8 bg-orange-500 text-white text-sm font-semibold rounded-lg"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default SomethingNew;
