"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Heading from "./Heading";

function SomethingNew({ menu }) {
  //console.log(menu);
  
  // Sort menu items by createdAt timestamp in descending order (latest first)
  const sortedMenu = menu.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Limit the number of items to 5
  const limitedMenu = sortedMenu.slice(0, 5);

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
          className="flex overflow-x-auto noscroll space-x-2 lg:space-x-4"
          style={{ scrollBehavior: "smooth" }} // Enable smooth scrolling
        >
          {limitedMenu.map((item) => (
            <div
              key={item._id}
              className="flex-shrink-0 w-[calc(100%_-_6rem)] lg:w-[calc(25%_-_2rem)] h-[250px] relative"
              style={{ minWidth: "calc(100% - 6rem)" }}
            >
              <Image
                src={item.image} // Assuming 'image' is the field for the image path
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="w-full h-full" // Ensure the image covers the container
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md flex flex-col justify-end p-4">
                <div className="flex justify-between items-center w-full text-white">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <Image
                    src={`${
                      item.subcategory === "Veg"
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAIwdpGyHat_Ca7H8KRaa2zx4ZJNlz4y0aCQ&s"
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjiz6WIVSYKbILJ-x6kygxSFHXo3aXfY7azw&s"
                    }`}
                    alt={item.type}
                    width={24}
                    height={24}
                    className="ml-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SomethingNew;
