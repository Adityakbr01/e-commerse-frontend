import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { TOP_Brand_Products } from "../data/TOP_Brand_Products";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Fillter_Product_hero() {
  const [selectedColors, setSelectedColors] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All 🛒");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

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

  const handleColorClick = (productId, color) => {
    setSelectedColors((prevSelectedColors) => ({
      ...prevSelectedColors,
      [productId]: color,
    }));
  };

  const handleAddToCart = (product) => {
    toast.success(`${product.title.substring(0, 10)} added to cart!`);
  };

  return (
    <div>
      <h2 className="text-[1.2em] font-bold mb-2">Filter by category :</h2>
      <div className="flex flex-wrap items-center gap-3 rounded-lg">
        {[
          "All 🛒",
          "Electronics 📱",
          "Clothing 👗",
          "Home & Kitchen 🏠",
          "Beauty 💄",
          "Sports 🏅",
        ].map((category) => (
          <button
            key={category}
            className={`p-2 px-6 font-medium border rounded-full hover:bg-gray-100 hover:border-sky-200 ${
              selectedCategory === category ? "border-sky-300" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-[1.2em] font-bold mb-2">Filter by Price :</h2>
        <div className="flex flex-wrap items-center gap-3">
          {["$0 - $50", "$50 - $100", "$100 - $200", "$200+"].map(
            (priceRange) => (
              <button
                key={priceRange}
                className={`p-2 px-4 font-medium border rounded-full hover:bg-gray-100 hover:border-sky-200 ${
                  selectedPriceRange === priceRange ? "border-sky-300" : ""
                }`}
                onClick={() => setSelectedPriceRange(priceRange)}
              >
                {priceRange}
              </button>
            )
          )}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-[1.2em] font-bold mb-11 uppercase"></h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden bg-[#f3f3f3] rounded-lg shadow-md"
            >
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
                  <label
                    htmlFor="color"
                    className="font-semibold text-gray-800"
                  >
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
                          } ${
                            selectedColors[product.id] === color
                              ? "border-sky-300"
                              : ""
                          }`}
                          onClick={() => handleColorClick(product.id, color)}
                        ></button>
                      )
                    )}
                  </div>
                </div>
                <button
                  className="flex items-center justify-center p-[0.30rem] px-3 mt-4 text-white rounded-md bg-violet-700 hover:bg-violet-800 transition-colors duration-300"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaCartShopping className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fillter_Product_hero;
