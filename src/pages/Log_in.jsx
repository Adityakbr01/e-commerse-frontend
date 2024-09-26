import React, { useState } from "react";
import { auth } from "../fireBase";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useLoginMutation } from "../Store/features/Api/user_Api";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Log_in() {
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const loginHandler = async () => {
    if (isPopupOpen) return; // Prevent multiple popups
    if (!gender || !dob) {
      toast.error("Please fill all the fields");
      return;
    }
    setIsPopupOpen(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const result = await login({
        name: user.displayName,
        email: user.email,
        password: user.uid,
        photo: user.photoURL,
        gender: gender,
        role: "user",
        dob: dob,
        _id: user.uid,
      });
      console.log(result);

      if ("data" in result) {
        toast.success(`Welcome ${result.data.message}`);
      } else {
        const error = result.error;
        toast.error(error.data.message);
      }
      navigate("/");
    } catch (error) {
      if (error.code !== "auth/cancelled-popup-request") {
        toast.error(error.message);
      }
    } finally {
      setIsPopupOpen(false);
    }
  };
  const { user } = useSelector((state) => state.user);
  console.log(user);

  return user ? (
    navigate("/")
  ) : (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Log In</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            loginHandler();
          }}
        >
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              placeholder="Male/Female"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date Of Birth
            </label>
            <input
              type="text"
              id="dob"
              name="dob"
              placeholder="DD/MM/YYYY"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between"></div>
          <div>
            <button
              type="submit"
              onClick={loginHandler}
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Log In
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Log_in;
