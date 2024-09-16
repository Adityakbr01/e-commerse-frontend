import React from "react";
import { supportWith } from "../data/supportWith";

function SupportWith() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-[4vh]">
      {supportWith.map((item) => (
        <div
          key={item.id}
          className={`relative cursor-pointer group h-[17vh] border after:w-full after:h-full overflow-hidden after:absolute after:top-0 after:left-0 ${
            item.id === 1
              ? "after:bg-red-100 border-red-300 "
              : item.id === 2
              ? "after:bg-sky-100 border-sky-300"
              : item.id === 3
              ? "after:bg-green-100 border-green-300"
              : "after:bg-yellow-100 border-yellow-400"
          } rounded-lg bg-transparent`}
        >
          <div className="absolute z-10 w-full h-full top-2 left-3">
            <h2 className="text-[1.5em] font-bold">{item.mainHeading}</h2>
            <h2 className="text-[1.2em] -mt-1 font-medium">
              {item.subHeading}
            </h2>
          </div>
          {item.img && (
            <div
              style={{ textAlign: "right" }}
              className="absolute z-10 -bottom-[20%] -right-2 sm:-right-[5%]"
            >
              <img
                className={`w-[8rem] group-hover:rotate-[-10deg] transition-transform duration-300`}
                src={item.img}
                alt={item.mainHeading}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SupportWith;
