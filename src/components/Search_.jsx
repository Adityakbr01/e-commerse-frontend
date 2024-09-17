import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCartShopping } from "react-icons/fa6";

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

      <div className="flex flex-wrap items-center w-full gap-2 mt-4">
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
              <p className="text-gray-600">${product.price}</p>
              <button
                className="flex items-center justify-center p-[0.30rem] px-3 mt-4 text-white rounded-md bg-violet-700"
                onClick={() => handleAddToCart(product)}
              >
                <FaCartShopping className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search_;
