"use client";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import maskvector from "../assets/Mask_group.png";
import LongCard from "../Menu/LongCard";
import Orderviewer from "../Menu/Orderviewer";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingPage from "../loaders/LoadingPage";
import NotFound from "../not-found";


function SearchPage() {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial fetch
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Flag for initial render

  const searchParams = useSearchParams();
  const restaurant_id = searchParams.get("id");
  const table_number = searchParams.get("table");
  const name = searchParams.get("name");

  // Fetch menu data only after initial render
  useEffect(() => {
    try{
    const getMenu = async () => {
      try {
        const res = await axios.post("/api/fetchrestaurantmenu", {
          restaurant_id,
        });
        setFoodItems(res.data.data.food_items);
        setFilteredItems(res.data.data.food_items);
      } catch (e) {
        console.error(e); // Log error if data fetching fails
      } finally {
        setIsLoading(false); // Set loading state to false after data fetch
      }
    };
    
    if (!isInitialLoad) {
      getMenu();
    } else {
      setIsInitialLoad(false);
    }
  }
  catch(e){
    return (<NotFound/>)
  }
  }, [restaurant_id, isInitialLoad]);

  // Filter food items when the query changes
  useEffect(() => {
    try{
    if (foodItems.length > 0) {
      const filtered = foodItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }catch(e){
    return (<NotFound/>)
  }
  }, [query, foodItems]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  if (isLoading && isInitialLoad) {
    return (
      <LoadingPage/>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <div className="h-[180px] mb-6 relative w-screen bg-gradient-to-b from-[#FFF9EA] mix-blend-multiply to-[#F5EC02]/30">
        <Image
          alt="bgbanner"
          src={maskvector}
          className="absolute top-0 left-0 object-cover"
        />
        <div className="flex justify-between items-center p-6">
          <span className=" text-2xl border-b-2 border-b-[#4E0433]">{name}</span>
        </div>
        <h2 className="text-center mb-2 font-semibold italic text-[#4E0433]">
          Search your food
        </h2>
        <div className="search px-10 relative">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Type 'butter naan'"
            className="pr-8 pl-10 h-10 focus:ring-0 shadow-md bg-[#FFF9EA] w-full rounded-full"
          />
          <SearchIcon className="absolute top-[10px] text-[#4E0433] h-6 left-12" />
        </div>
      </div>
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 shadow-md">
          {filteredItems?.map((item, i) => (
            <LongCard key={i} item={item} />
          ))}
        </div>
      </div>
      <div className="bottom-0 max-w-screen">
        <Orderviewer id={restaurant_id} table={table_number} />
      </div>
    </div>
  );
}

export default SearchPage;
