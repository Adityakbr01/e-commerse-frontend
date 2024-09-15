import React, { useRef } from "react";
import { Images } from "../data/banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

function Hero_Banner() {
  const swiperRef = useRef(null);

  return (
    <div>
      <h1 className="mt-4 font-semibold text-black text-[1em] md:text-[1.4em]">
        🛍️ Shop Now, Why You Waiting? 🛒
      </h1>

      <div className="w-full text-[1.1em] relative">
        <Swiper
          spaceBetween={10}
          slidesPerView={"auto"}
          freeMode={true}
          loop={true}
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{
            pauseOnMouseEnter: true,
            reverseDirection: true,
          }}
          onMouseEnter={() => swiperRef.current?.autoplay.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay.start()}
        >
          {Images.map((image, index) => (
            <SwiperSlide key={index} style={{ width: "7.6em" }}>
              <img
                className="w-full h-auto cursor-grab"
                src={image}
                alt={`Banner ${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="p-2 cursor-pointer hidden md:flex text-black bg-[#f0f0f0] absolute top-[50%] -translate-y-1/2 -left-[5%] z-[2] rounded-full"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <IoIosArrowRoundBack size={20} />
        </div>
        <div
          className={`p-2 cursor-pointer hidden md:flex text-black absolute top-[50%] -translate-y-1/2 -right-[5%] z-[2] rounded-full ${
            swiperRef.current?.isEnd ? "bg-red-500" : "bg-[#f0f0f0]"
          }`}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <IoIosArrowRoundForward size={20} />
        </div>
      </div>
    </div>
  );
}

export default Hero_Banner;
