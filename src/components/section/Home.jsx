import React, { useState } from "react";
import { Images } from "../../data/banner";
import Hero_Banner from "../Hero_Banner";
import ProductCard from "../ProductCard";
import SupportWith from "../SupportWith";
import Fillter_Product_hero from "../Fillter_Product_hero";

function Home() {
  // console.log(Images);

  return (
    <div className="w-[85%] mx-auto">
      <div className="">
        <Hero_Banner />

        <div className="pb-10 border-b border-gray-300 mb-11">
          <h1 className="mt-8 mb-4 text-[1em] md:text-[1.7em] font-bold">
            🛍️ Top-notch Quality Guaranteed! 🏆
          </h1>
          <ProductCard />
          <SupportWith />
          <Fillter_Product_hero />
        </div>
      </div>
    </div>
  );
}
export default Home;
