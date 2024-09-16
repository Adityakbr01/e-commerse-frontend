import React, { useState } from "react";
import { Images } from "../../data/banner";
import Hero_Banner from "../Hero_Banner";
import ProductCard from "../ProductCard";

function Home() {
  console.log(Images);

  return (
    <div className="w-full h-full">
      <div className="">
        <Hero_Banner />

        <div className="pb-10 border-b border-gray-300 mb-11">
          <h1 className="mt-8 mb-4 text-[1.4em] md:text-[1.7em] font-bold">
            🛍️ Top-notch Quality Guaranteed! 🏆
          </h1>
          <ProductCard scroll={"scroll"} />
        </div>
      </div>
    </div>
  );
}
export default Home;
