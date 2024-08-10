"use client"
import Link from "next/link";
import React, { useState } from "react";

function Page() {
  const [showAllEvents, setShowAllEvents] = useState(false);

  const events = [
    {
      id: 1,
      name: "Italian Cuisine Night",
      participants: 150,
      date: "August 15",
      time: "07:00 PM",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfYpwXgQyx95BGSYBWtGPKBEQNQGwKD97Zw&s",
      location: "Rome, Italy"
    },
    {
      id: 2,
      name: "Sushi Making Workshop",
      participants: 90,
      date: "September 2",
      time: "03:00 PM",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfYpwXgQyx95BGSYBWtGPKBEQNQGwKD97Zw&s",
      location: "Tokyo, Japan"
    },
    {
      id: 3,
      name: "Vegan Food Festival",
      participants: 200,
      date: "September 22",
      time: "11:00 AM",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfYpwXgQyx95BGSYBWtGPKBEQNQGwKD97Zw&s",
      location: "Los Angeles, USA"
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="text-sm text-gray-600">
          <span role="img" aria-label="location">📍</span>
          Abc Restaurant
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
          placeholder="Search Restaurant Events"
          className="flex-1 p-2 border rounded-l-lg focus:outline-none"
        />
        <button className="bg-blue-500 text-white p-2 px-3 rounded-r-lg">
          <span role="img" aria-label="filter">🔍</span>
        </button>
      </div>

      {/* Event Browsing Card */}
      <div className="p-4 m-4 bg-blue-100 rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold capitalize text-blue-600">Get notified about Restaurant Events Near You</h2>
          <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-full">
            Get Started
          </button>
        </div>
        <img
          src="https://images.inc.com/uploaded_files/image/1920x1080/getty_479977238_253066.jpg"
          alt="Restaurant Event"
          className="w-20 h-20 object-cover"
        />
      </div>

      {/* Invitation Notification */}
      <div className="p-4 m-4 bg-white rounded-lg shadow-sm flex items-center">
        <div>
          <p className="text-gray-700">You got an invitation from <span className="text-orange-500">Chef Ryan</span></p>
          <p className="text-sm text-gray-400">August 20 | 06:00 PM</p>
        </div>
        <button className="ml-auto text-gray-500">
          <span role="img" aria-label="more">...</span>
        </button>
      </div>

      {/* Popular Events Section */}
      <div className="p-4 ">
        <h2 className="text-lg font-semibold">Popular Events</h2>
        {showAllEvents ? (
          <div className="grid grid-cols-1 gap-4">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm p-4">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-2">
                  <h3 className="text-sm font-semibold">{event.name}</h3>
                  <p className="text-xs text-gray-500">{event.participants} Participants</p>
                  <p className="text-xs text-gray-500">{event.date} | {event.time}</p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              </div>
            ))}
            <button 
              onClick={() => setShowAllEvents(false)} 
              className="w-full bg-blue-500 text-white py-2 rounded-full mt-4"
            >
              View Less
            </button>
          </div>
        ) : (
          <div className="flex space-x-4 overflow-x-auto noscroll">
            {events.map(event => (
              <Link href={'/Events/'+event.id} key={event.id} className="min-w-[150px] bg-white rounded-lg shadow-sm">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-2">
                  <h3 className="text-sm font-semibold">{event.name}</h3>
                  <p className="text-xs text-gray-500">{event.participants} Participants</p>
                  <p className="text-xs text-gray-500">{event.date} | {event.time}</p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              </Link>
            ))}
            <button 
              onClick={() => setShowAllEvents(true)} 
              className="min-w-[150px] bg-blue-500 text-white  py-1 px-3 rounded-md">
              View All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
