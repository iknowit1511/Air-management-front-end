import React from 'react';

// import Logo from '../../assets/logo.png';
import { TiSocialFacebook } from "react-icons/ti";
import { RiTwitterXFill } from "react-icons/ri";
import { AiFillYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">

        {/* Logo and Social Icons */}
        <div>
          <div className="mb-4">
            {/* <img src={Logo} alt="Logo" className="w-32" /> */}
          </div>
          <p className="mb-4 text-gray-400">Your mind should be stronger than your feelings, fly!</p>
          <div className="flex space-x-4">
            <TiSocialFacebook className="text-2xl cursor-pointer hover:text-blue-500" />
            <RiTwitterXFill className="text-2xl cursor-pointer hover:text-blue-400" />
            <AiFillYoutube className="text-2xl cursor-pointer hover:text-red-500" />
            <FaPinterestP className="text-2xl cursor-pointer hover:text-red-400" />
          </div>
        </div>

        {/* Information Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Information</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Explore</a></li>
            <li><a href="#" className="hover:text-white">Flight status</a></li>
            <li><a href="#" className="hover:text-white">Travel</a></li>
            <li><a href="#" className="hover:text-white">Check-in</a></li>
            <li><a href="#" className="hover:text-white">Manage your booking</a></li>
          </ul>
        </div>

        {/* Quick Guide Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Guide</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">How to</a></li>
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Baggage</a></li>
            <li><a href="#" className="hover:text-white">Route map</a></li>
            <li><a href="#" className="hover:text-white">Our communities</a></li>
          </ul>
        </div>

        {/* Additional Information Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">More Information</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Chauffeur</a></li>
            <li><a href="#" className="hover:text-white">Our partners</a></li>
            <li><a href="#" className="hover:text-white">Destination</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Transportation</a></li>
            <li><a href="#" className="hover:text-white">Programme rules</a></li>
          </ul>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="mt-10 text-center text-gray-500">
        <p>JK Travel @ 2025. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;