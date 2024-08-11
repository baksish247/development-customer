"use client";
import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation"; // Import the useSearchParams hook
import { FaLocationArrow } from "react-icons/fa6";
import { MdOutlineSearch } from "react-icons/md";
import Footer from "../Tip/Footer";
import axios from "axios"; // Import axios for API calls

function Page() {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [events, setEvents] = useState([]);
  const searchParams = useSearchParams(); // Get search params
  const restaurantId = searchParams.get("id"); // Get the id parameter from the URL

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (restaurantId) {
          // Make the API call to fetch events using the restaurantId
          const response = await axios.get("/api/getallevents", {
            params: { restaurant_id: restaurantId },
          });
          console.log(restaurantId, response.data);

          if (response.data.success) {
            setEvents(response.data.events);
          } else {
            console.error("Error fetching events:", response.data.message);
          }
        } else {
          console.error("No restaurant_id found in URL");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [restaurantId]); // Fetch events when restaurantId changes

  // Limit the number of events displayed when showAllEvents is false
  const visibleEvents = showAllEvents ? events : events;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white shadow-sm">
          <div className="text-md flex justify-center space-x-2 text-gray-800">
            <span
              role="img"
              className="mt-1.5 item-center"
              aria-label="location"
            >
              <FaLocationArrow />
            </span>
            <div className="items-center text-lg">Abc Restaurant</div>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="https://w7.pngwing.com/pngs/238/658/png-transparent-man-avatar-male-business-avatar-icon.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 flex items-center bg-white shadow-sm">
          <input
            type="text"
            placeholder="Search about Restaurant Events"
            className="flex-1 p-3 border rounded-l-lg focus:outline-none"
          />
          <button className="bg-blue-500 text-white p-4 rounded-r-lg">
            <span role="img" aria-label="filter">
              <MdOutlineSearch />
            </span>
          </button>
        </div>

        {/* Event Browsing Card */}
        <div className="p-4 m-4 bg-blue-100 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold capitalize text-blue-600">
              Know what's happening !
            </h2>
            <button className="mt-2.5 bg-blue-500 text-white py-1.5 px-4 rounded-md">
              Get Started
            </button>
          </div>
          <img
            src="https://images.inc.com/uploaded_files/image/1920x1080/getty_479977238_253066.jpg"
            alt="Restaurant Event"
            className="w-20 h-20 object-cover rounded-md"
          />
        </div>

        {/* Invitation Notification */}
        <div className="p-4 m-4 bg-white rounded-lg shadow-sm flex items-center">
          <div>
            <p className="text-gray-700">
              You got an invitation from{" "}
              <span className="text-orange-500">Chef Ryan</span>
            </p>
            <p className="text-sm text-gray-400">August 20 | 06:00 PM</p>
          </div>
          <button className="ml-auto text-gray-500">
            <span role="img" aria-label="more">
              ...
            </span>
          </button>
        </div>

        {/* Popular Events Section */}
        <div className="p-4 mb-8">
          <h2 className="text-lg font-semibold mb-4">Popular Events</h2>
          <div className={``}>
            {visibleEvents.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {" "}
                {visibleEvents.map((event) => (
                  <Link
                    href={"/Events/" + event._id}
                    key={event._id}
                    className="bg-white rounded-lg shadow-sm"
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      loading="lazy" // Lazy loading images
                      className="w-full h-52 object-cover rounded-t-lg"
                    />
                    <div className="p-2">
                      <h3 className="text-sm mb-1 font-semibold truncate">
                        {event.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {event.date} | {event.time}
                      </p>
                      <p className="text-xs text-gray-500">{event.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="w-full text-center mt-10">
                No Events are Happening Now
                <br />
                keep in touch!
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}

export default Page;
