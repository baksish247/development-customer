import React from "react";
import { PiBuildingApartmentFill } from "react-icons/pi";

const EventDetail = () => {
  return (
    <div className="bg-white min-h-screen p-4">
      {/* Top Section with Image and Organizer Info */}
      <div className="relative">
        <img
          src="https://media1.thrillophilia.com/filestore/upzxe7mh06h655o90mi8lp6gspnv_1645512040_facebook.com_imgworld.jpg?w=400&dpr=2" // Add your image path here
          alt="Cycling Event"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white bg-opacity-70 p-2 rounded-full shadow-md">
          <PiBuildingApartmentFill size={20} />
          <div>
            <h3 className="text-sm font-semibold text-gray-800">James Brond</h3>
            <p className="text-xs text-gray-500">Organizer</p>
          </div>
        </div>
      </div>

      {/* Event Information */}
      <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800">Bicycle Gowes</h2>
          <div className="flex items-center space-x-1 text-gray-500">
            <span>3.7k</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          by <span className="text-indigo-600 font-semibold">James Brond</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Are you a bike lover? Great! Because now we have held a cycling event
          together which will certainly be very{" "}
          <span className="text-indigo-600 cursor-pointer">Read more</span>
        </p>

        {/* Participants */}
        <div className="flex items-center space-x-2 mt-4">
          <div className="flex -space-x-2"></div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Location</span>
            <span className="text-sm text-gray-800">Society Area</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Time</span>
            <span className="text-sm text-gray-800">07:00 AM</span>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white mt-4 rounded-lg shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123456789012!2d-122.0842499846819!3d37.42199977982471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba2ba7f5baf1%3A0x789abcde12345678!2sGoogleplex!5e0!3m2!1sen!2sus!4v1625852298822!5m2!1sen!2sus" // Replace with your Google Map embed URL
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          className="w-full h-72 rounded-lg"
        ></iframe>
      </div>

      {/* Buy Ticket Button */}
      <div className="fixed bottom-4 left-0 w-full px-4">
        <button className="w-full bg-orange-500 text-white py-3 rounded-md shadow-md hover:bg-orange-600 transition-colors">
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
