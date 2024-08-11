// import React from "react";
// import veg from '../assets/veg.svg';
// import nonveg from '../assets/nonveg.svg';
// import Image from "next/image";

// function SmallViewItem({ item }) {
//   return (
//     <div className="relative ">
//       <Image src={item.subcategory==='Veg'?veg:nonveg} alt="veg" width={20} height={20} className="absolute bottom-[10.5px] left-2" />
//       <div className="lg:w-52 w-[10.5rem] h-48  border-[#f1d58f5a] p-2 border-[2px] shadow-md rounded flex flex-col ">
//         <img
//           src={item?.image}
//           className=" object-cover h-36 rounded-lg w-full"
//           alt="itembanner"
//         />
//         <p className="text-left poppins-regular ml-6 text-[0.75rem] lg:text-sm mt-2">{(item?.name).slice(0,18)}</p>
//       </div>
//     </div>
//   );
// }

// export default SmallViewItem;
import React from "react";
import veg from '../assets/veg.svg';
import nonveg from '../assets/nonveg.svg';
import Image from "next/image";

function SmallViewItem({ item }) {
  return (
    <div className="relative">
      <Image src={item.subcategory === 'Veg' ? veg : nonveg} alt="veg" width={20} height={20} className="absolute bottom-[10.5px] left-2" />
      <div className="lg:w-52 w-[10.5rem] h-48 overflow-hidden border-[#f1d58f5a] p-2 border-[2px] shadow-md rounded flex flex-col">
        <img
          src={item?.image}
          className="object-cover h-36  rounded-lg w-full"
          alt="itembanner"
        />
        <p className="text-left poppins-regular ml-6 text-[0.75rem] lg:text-sm mt-2">
          {(item?.name).slice(0, 18)}
        </p>
      </div>
    </div>
  );
}

export default SmallViewItem;
