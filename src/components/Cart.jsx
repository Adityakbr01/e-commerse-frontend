import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  console.log(totalAmount, totalQuantity, cartItems);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // <div className="w-full h-full">
  //   <div className="w-full min-h-screen p-4 bg-white rounded-lg shadow-lg">
  //     {cartItems.length > 0 && (
  //       <h2 className="mb-4 text-xl font-semibold">Your Cart</h2>
  //     )}
  //     {cartItems.length > 0 ? (
  //       <div>
  //         <div className="flex flex-col gap-4">
  //           {cartItems.map((item) => (
  //             <div
  //               key={item.id}
  //               className="flex items-center justify-between mb-4"
  //             >
  //               <img
  //                 src={item.image}
  //                 alt={item.title}
  //                 className="object-cover w-16 h-16 rounded-md"
  //               />
  //               <div className="flex-1 ml-4">
  //                 <h3 className="text-lg font-medium">{item.title}</h3>
  //                 <p className="text-gray-600">Quantity: {item.quantity}</p>
  //                 <p className="text-gray-600">${item.price}</p>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //         <div className="pt-4 border-t">
  //           <p className="text-lg font-semibold">
  //             Total: ${totalAmount.toFixed(2)}
  //           </p>
  //           <button className="w-full py-2 mt-4 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600">
  //             Checkout
  //           </button>
  //         </div>
  //       </div>
  //     ) : (
  //       <div className="flex h-[60vh] items-center justify-center ">
  //         <p className="text-4xl text-gray-600">Your cart is empty.</p>
  //       </div>
  //     )}
  //   </div>
  // </div>
  return user ? (
    <div className="w-full h-full">
      <div className="w-full min-h-screen p-4 bg-white rounded-lg shadow-lg">
        {cartItems.length > 0 && (
          <h2 className="mb-4 text-xl font-semibold">Your Cart</h2>
        )}
        {cartItems.length > 0 ? (
          <div className="flex flex-col justify-between h-full lg:flex-row">
            <div className="flex-1">
              <div className="flex flex-col gap-4">
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
                      <div className="flex items-center">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="px-2 py-1 text-white bg-red-500 rounded-md"
                        >
                          -
                        </button>
                        <p className="mx-2 text-gray-600">{item.quantity}</p>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="px-2 py-1 text-white bg-green-500 rounded-md"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[60vh] min-h-[60vh] lg:w-1/4">
              <div className="p-4 rounded-lg">
                <p className="text-lg font-semibold">
                  Subtotal: ${totalAmount.toFixed(2)}
                </p>
                <p className="text-lg font-semibold">
                  Discount: ${(totalAmount * 0.1).toFixed(2)}
                </p>
                <p className="text-lg font-semibold">
                  Tax: ${(totalAmount * 0.07).toFixed(2)}
                </p>
                <p className="text-lg font-semibold">Shipping Charges: $5.00</p>
                <p className="text-lg font-semibold">
                  Total: $
                  {(
                    totalAmount -
                    totalAmount * 0.1 +
                    totalAmount * 0.07 +
                    5
                  ).toFixed(2)}
                </p>
                <input
                  type="text"
                  placeholder="Enter discount coupon code"
                  className="w-full p-2 mt-4 border rounded-md"
                />
                <button className="w-full py-2 mt-4 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-[60vh] items-center justify-center ">
            <p className="text-4xl text-gray-600">Your cart is empty.</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    navigate("/login")
  );
}

export default Cart;
