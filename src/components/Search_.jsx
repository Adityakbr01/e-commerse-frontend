import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCartShopping } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";

function Search_() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        const filteredProducts = res.data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (query) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [query]);

  const handleSearch = () => {
    console.log("Searching for:", query);
  };

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[40vh] bg-gray-100">
      <div className="w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          placeholder="Search..."
        />
        <button
          onClick={handleSearch}
          className="w-full p-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center w-full gap-2 mt-4">
        {products.map((product) => (
          <div className="card px-5 py-2 pb-4 flex flex-col items-center max-w-[18rem] rounded-2xl bg-[#1a1a1a] text-white">
            <div className="img-container max-h-[20%]">
              <img
                className="w-full h-full"
                src="https://www.kickgame.com/cdn/shop/products/air-jordan-1-retro-high-white-university-blue-555088-134_1.png?v=1658232079&width=1024"
                alt=""
              />
            </div>
            <h2 className="text-xl font-bold text-white">
              {product.title.substring(0, 12)}
            </h2>
            <h3 className="">${product.price}</h3>
            <div className="flex flex-col-reverse items-start justify-start w-full pt-3 sm:justify-between sm:flex-row">
              <div className="flex items-center gap-2 mt-6 text-white">
                <button className="p-[0.4rem]  border border-white rounded-full">
                  <BsCart2 />
                </button>
                <button className="px-3 py-[0.34rem] rounded-full bg-slate-200 brutalist-card__button brutalist-card__button--mark">
                  Buy Now
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <h3>Options</h3>
                <div className="flex items-start p-[0.2rem] border border-[#f5f5f5] rounded-full gap-2">
                  <span className="w-4 h-4 bg-white rounded-full"></span>
                  <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                  <span className="w-4 h-4 bg-indigo-500 rounded-full"></span>
                  <span className="w-4 h-4 rounded-full bg-sky-500"></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search_;

{
  /* <div
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
  <p className="text-gray-600">${product.price}</p>
  <button
    className="flex items-center justify-center p-[0.30rem] px-3 mt-4 text-white rounded-md bg-violet-700"
    onClick={() => handleAddToCart(product)}
  >
    <FaCartShopping className="mr-2" /> Add to Cart
  </button>
</div>
</div> */
}
