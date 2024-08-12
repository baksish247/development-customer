"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Heading from "./Heading";

function SomethingNew({ menu }) {
  // Sort menu items by createdAt timestamp in descending order (latest first)
  const sortedMenu = menu.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Limit the number of items to 5
  const limitedMenu = sortedMenu.slice(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % limitedMenu.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [limitedMenu.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollPosition =
        (carousel.scrollWidth / limitedMenu.length) * currentIndex;
      carousel.scrollTo({
        left: scrollPosition,
        behavior: "smooth", // Smooth scroll transition
      });
    }
  }, [currentIndex, limitedMenu.length]);

  return (
    <>
      <Heading heading={"Chef's Special"} />
      <div className="relative px-4 mt-0 overflow-hidden">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto noscroll  space-x-2 lg:space-x-4"
          style={{ scrollBehavior: "smooth" }} // Enable smooth scrolling
        >
          {limitedMenu.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === limitedMenu.length - 1;
            const widthClass =
              isFirst || isLast
                ? "w-[calc(100%_-_3rem)]"
                : "w-[calc(100%_-_6rem)]";

            return (
              <div
                key={item._id}
                className={` ${widthClass} lg:w-[calc(100%_/4)] h-[300px] relative`}
                style={{ minWidth: "calc(100% - 6rem)" }}
              >
                <Image
                  src={item.image} // Assuming 'image' is the field for the image path
                  alt={item.name}
                  height={100}
                  width={100}
                  className="w-full h-full object-cover" // Adjusted to maintain aspect ratio
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md flex flex-col justify-end p-4">
                  <div className="flex justify-between items-center w-full text-white">
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <span>{item.type === "veg" ? "🥦" : "🍗"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Navigation buttons */}
        <button
          className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={() =>
            setCurrentIndex(
              (currentIndex - 1 + limitedMenu.length) % limitedMenu.length
            )
          }
        >
          &lt;
        </button>
        <button
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={() =>
            setCurrentIndex((currentIndex + 1) % limitedMenu.length)
          }
        >
          &gt;
        </button>
      </div>
    </>
  );
}

export default SomethingNew;
