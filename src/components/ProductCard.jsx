import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { TOP_Brand_Products } from "../data/TOP_Brand_Products";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/css";
import "swiper/css/navigation";
import SwiperCore from "swiper";

import { Navigation, Autoplay, Pagination } from "swiper/modules";

SwiperCore.use([Navigation, Pagination]);

function ProductCard({ scroll, noScroll }) {
  const [selectedColors, setSelectedColors] = useState({});

  const handleColorClick = (productId, color) => {
    setSelectedColors((prevSelectedColors) => ({
      ...prevSelectedColors,
      [productId]: color,
    }));
  };

  const [products, setProducts] = useState([]);
  console.log(scroll);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const productsWithDefaultColor = res.data.map((product) => {
          const defaultColor =
            TOP_Brand_Products[Math.floor(Math.random() * 3)].colorVariants[0];
          const oldPrice = (product.price * (1 + Math.random() * 0.5)).toFixed(
            2
          );
          const discount =
            ((1 - product.price / oldPrice) * 100).toFixed(2) + "%";
          return {
            ...product,
            selectedColor: defaultColor,
            oldPrice,
            discount,
          };
        });
        setProducts(productsWithDefaultColor);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleAddToCart = (product) => {
    toast.success(`${product.title.substring(0, 10)} added to cart!`);
  };

  console.log(products);

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="overflow-hidden bg-[#f3f3f3] rounded-lg shadow-md">
            <img
              src={product.image}
              alt="Product"
              className="object-cover w-full max-h-[10rem]"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">
                {product.title.substring(0, 10)}
              </h2>
              <p className="text-gray-600">
                <span className="line-through">${product.oldPrice}</span> $
                {product.price}
                <span className="text-red-500">({product.discount})</span>
              </p>
              <div className="mt-2">
                <label htmlFor="color" className="font-semibold text-gray-800">
                  Color
                </label>
                <div className="flex items-center gap-2">
                  {TOP_Brand_Products[0].colorVariants.map(
                    (color, colorIndex) => (
                      <button
                        style={{ backgroundColor: color }}
                        key={colorIndex}
                        className={`p-2 text-white rounded-full ${color} ml-${
                          colorIndex === 0 ? 0 : 2
                        } ${
                          selectedColors[product.id] === color ||
                          (selectedColors[product.id] === undefined &&
                            product.selectedColor === color)
                            ? "border-[3px] border-sky-700 border-opacity-90"
                            : ""
                        }`}
                        onClick={() => handleColorClick(product.id, color)}
                      ></button>
                    )
                  )}
                </div>
              </div>
              <button
                className="flex items-center justify-center p-[0.30rem] px-3 mt-4 text-white rounded-md bg-violet-700"
                onClick={() => handleAddToCart(product)}
              >
                <FaCartShopping className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ProductCard;
