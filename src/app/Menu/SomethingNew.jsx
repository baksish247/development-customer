// "use client";
// import React from "react";
// import SmallViewItem from "./SmallViewItem";
// import Heading from "./Heading";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function SomethingNew({ menu }) {
//   // Sort menu items by createdAt timestamp in descending order (latest first)
//   const sortedMenu = menu.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//   // Limit the number of items to 5
//   const limitedMenu = sortedMenu.slice(0, 5);

//   return (
//     <>
//       <Heading heading={"Chef's Special"} />
//       <div className="px-4 -mt-0">
//         <section className="flex  noscroll overflow-x-auto space-x-4 p-4">
//           {limitedMenu.map((item) => (
//             <SmallViewItem item={item} key={item._id} />
//           ))}
//         </section>
//       </div>
//     </>
//   );
// }

// export default SomethingNew;
"use client";
import React, { useEffect, useRef } from "react";
import SmallViewItem from "./SmallViewItem";
import Heading from "./Heading";

function SomethingNew({ menu }) {
  // Sort menu items by createdAt timestamp in descending order (latest first)
  const sortedMenu = menu.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Limit the number of items to 5
  const limitedMenu = sortedMenu.slice(0, 5);

  // Reference to the scroll container
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const autoScroll = () => {
      scrollAmount += 1; // Smaller increment for slower scroll
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0; // Reset scroll when reaching the end
      }
      scrollContainer.scrollTo({
        left: scrollAmount,
        behavior: "auto",
      });
    };

    const scrollInterval = setInterval(autoScroll, 30); // Slower scroll speed

    return () => clearInterval(scrollInterval); // Cleanup on unmount
  }, []);

  return (
    <>
      <Heading heading={"Chef's Special"} />
      <div className="px-4 -mt-0">
        <section ref={scrollRef} className="flex noscroll overflow-x-auto space-x-4 ">
          {limitedMenu.map((item) => (
            <SmallViewItem item={item} key={item._id} />
          ))}
        </section>
      </div>
    </>
  );
}

export default SomethingNew;
