import React, { useState, useEffect, useRef } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { HiUserCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { cartSlice } from "../Store/features/Cart/Cart_Store";
import { Link } from "react-router-dom";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  console.log(totalAmount, totalQuantity, cartItems);

  ///Cart

  const [isopen, setIsopen] = useState(false);
  const cartRef = useRef(null);

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsopen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="bg-[#282828] text-white text-[1.1em] py-2 flex justify-between items-center">
        <marquee>
          <h1>Offer 🔥 Valid Till 31st September 2024</h1>
        </marquee>
      </div>
      <div className="z-[999]  w-full border-b border-gray-400 top-12">
        <div className="md:w-[85%] w-[95%] mx-auto text-[1.1em] py-4 text-black flex items-center justify-between">
          <div className="font-semibold uppercase logo">refire🔥</div>
          <div className="menu">
            <ul className="flex items-center gap-6">
              <Link to="/">Home</Link>
              <Link to="/search">Search</Link>
              <Link
                to="/cart"
                className="cart text-[1.4em] cursor-pointer relative"
              >
                <FaCartShopping onClick={() => setIsopen(!isopen)} />
                <div className="absolute top-0 -right-[3px] h-[1.7em] w-[1.7em] text-[0.3em] text-white bg-red-500 rounded-full flex items-center justify-center">
                  <span> {totalQuantity}</span>
                </div>
              </Link>
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
