"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Import the necessary hooks
import { FaLocationArrow } from "react-icons/fa6";
import { MdOutlineSearch } from "react-icons/md";
import Footer from "../Tip/Footer";
import axios from "axios"; // Import axios for API calls

function Allevents() {
  const [showAllEvents, setShowAllEvents] = useState(true); // State to control whether to show all events or only the filtered ones

  const [events, setEvents] = useState([]);
  const [offers, setoffers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const searchParams = useSearchParams(); // Get search params
  const router = useRouter(); // Get router instance
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
    const fetchoffers = async () => {
      const { data } = await axios.post("/api/fetchoffersbyid", {
        restaurant_id: restaurantId,
      });
      console.log(data?.data);
      setoffers(data.data);
    };
    if (showAllEvents) {
      fetchEvents();
    } else {
      fetchoffers();
    }
  }, [restaurantId, showAllEvents]); // Fetch events when restaurantId changes

  //change events to offer and vice versa
  const switchToSection = (sec) => {
    if (sec === "events") setShowAllEvents(true);
    else setShowAllEvents(false);
  };

  // Filter events based on the search query
  const filteredEvents = events.filter((event) =>
    event?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  // Limit the number of events displayed when showAllEvents is false
  const visibleEvents = showAllEvents ? filteredEvents : filteredEvents;

  // Function to handle the click and forward to the same URL with the eventid param
  const handleEventClick = (eventId) => {
    const currentParams = searchParams.toString(); // Get the current query params
    const newUrl = `/Events/EventDetails/?${currentParams}&eventid=${eventId}`; // Append eventid to the URL
    router.push(newUrl); // Navigate to the new URL
  };

  return (
    <>
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
            value={searchQuery} // Bind input value to searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
          />
          <button className="bg-blue-500 text-white p-4 rounded-r-lg">
            <span role="img" aria-label="filter">
              <MdOutlineSearch />
            </span>
          </button>
        </div>

        {/* Event Browsing Card */}
        {/* <div className="p-4 m-4 bg-blue-100 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold capitalize text-blue-600">
              Know what's happening!
            </h2>
            <button className="mt-2.5 bg-blue-500 text-white py-1.5 px-4 rounded-md">
              Subscribe
            </button>
          </div>
          <img
            src="https://images.inc.com/uploaded_files/image/1920x1080/getty_479977238_253066.jpg"
            alt="Restaurant Event"
            className="w-20 h-20 object-cover rounded-md"
          />
        </div> */}
        <div className="flex justify-start items-center m-4">
          <button
            className={`${
              showAllEvents
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 hover:text-white border-10"
            }  px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-100 hover:text-white focus:outlin e-none mr-2`}
            onClick={() => switchToSection("events")}
          >
            Events
          </button>
          <button
            className={`${
              !showAllEvents
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 hover:text-white border-10"
            }  px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-100  hover:text-white focus:outlin e-none mr-2`}
            onClick={() => switchToSection("offers")}
          >
            Offers
          </button>
        </div>

        {/* Popular Events Section */}
        {showAllEvents ? (
          <div className="p-4 pt-0 mb-8">
            <h2 className="text-lg font-semibold mb-4">Popular Events</h2>
            <div className={``}>
              {visibleEvents.length > 0 ? (
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                  {" "}
                  {visibleEvents.map((event) => (
                    <div
                      key={event._id}
                      className="bg-white rounded-lg shadow-sm cursor-pointer"
                      onClick={() => handleEventClick(event._id)} // Call the function on click
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy" // Lazy loading images
                        className="w-full h-52 object-cover rounded-t-lg"
                      />
                      <div className="p-2">
                        <h3 className="text-sm mb-1 font-semibold truncate">
                          {event.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {event.date} | {event.time}
                        </p>
                        <p className="text-xs text-gray-500">
                          {event.location}
                        </p>
                      </div>
                    </div>
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
        ) : (
          <div className="p-4 pt-0 mb-8">
            <h2 className="text-lg font-semibold mb-4">Latest Offers</h2>
            <div>
              {offers.length > 0 ? (
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                  {offers.map((offer) => (
                    <div
                      key={offer._id}
                      className="bg-white rounded-lg shadow-sm cursor-pointer"
                      // onClick={() => handleOfferClick(offer._id)}
                    >
                      <img
                        src={offer.image}
                        alt={offer.itemname}
                        loading="lazy"
                        className="w-full h-52 object-cover rounded-t-lg"
                      />
                      <div className="p-2">
                        <h3 className="text-sm mb-1 font-semibold truncate">
                          {offer.itemname}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                          {offer.itemDescription}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm font-semibold text-green-600">
                            ₹{offer.newPrice}
                          </p>
                          {offer.oldPrice && (
                            <p className="text-xs text-gray-500 line-through">
                              ₹{offer.oldPrice}
                            </p>
                          )}
                        </div>
                        {offer.discount && (
                          <p className="text-xs text-red-500 mt-1">
                            {offer.discount}% off
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="w-full text-center mt-10">
                  No Offers Available Right Now
                  <br />
                  Check Back Later!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Allevents;
