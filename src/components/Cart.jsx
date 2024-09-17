import React from "react";
import { useSelector } from "react-redux";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  console.log(totalAmount, totalQuantity, cartItems);

  return (
    <div className="w-full h-full">
      <div className="w-full min-h-screen p-4 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Your Cart</h2>
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-16 h-16 rounded-md"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              <p className="text-lg font-semibold">
                Total: ${totalAmount.toFixed(2)}
              </p>
              <button className="w-full py-2 mt-4 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600">
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-[60vh] items-center justify-center ">
            <p className="text-4xl text-gray-600">Your cart is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
