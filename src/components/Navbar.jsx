import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { HiUserCircle } from "react-icons/hi2";

function Navbar() {
  return (
    <div className="relative">
      <div className="bg-[#282828] text-white text-[1.1em] py-2 flex justify-between items-center">
        <marquee>
          <h1>Offer 🔥 Valid Till 31st September 2024</h1>
        </marquee>
      </div>
      <div className="z-[999] w-full border-b border-gray-400 top-12">
        <div className="md:w-[85%] w-[95%] mx-auto text-[1.1em] py-4 text-black flex items-center justify-between">
          <div className="font-semibold uppercase logo">Logo</div>
          <div className="menu">
            <ul className="flex items-center gap-6">
              <li>Home</li>
              <li>Search</li>
              <li className="cart text-[1.4em]">
                <FaCartShopping />
              </li>
              <li className="avatar text-[1.58em]">
                <HiUserCircle />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
