import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/section/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextAnimation from "./components/Welcome_Loader";
import Search_ from "./components/Search_";
import Cart from "./components/Cart";
import Log_in from "./pages/Log_in";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fireBase";
import { store } from "./Store/store";
import { setUser, usernotExist } from "./Store/features/user_Reducer";
import { useDispatch } from "react-redux";
import { getUser } from "./Store/features/Api/user_Api";
// import ThemeToggle from "./components/addThemeToggle";
const Home = lazy(() => import("./components/section/Home"));
const SupportWith = lazy(() => import("./components/SupportWith"));
const Fillter_Product_hero = lazy(() =>
  import("./components/Fillter_Product_hero")
);

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    const visitExpiry = localStorage.getItem("visitExpiry");
    const now = new Date().getTime();

    if (!hasVisited || now > visitExpiry) {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasVisited", "true");
        localStorage.setItem("visitExpiry", now + 24 * 60 * 60 * 1000); // 24 hours expiry
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log(user.uid);
      if (user) {
        const response = await getUser(user.uid);
        const userData = response.data.user;
        console.log(userData);
        dispatch(setUser(userData));
      } else {
        dispatch(usernotExist());
      }
    });
  }, []);

  return (
    <div className="relative dark:bg-black">
      {loading ? (
        <TextAnimation />
      ) : (
        <>
          <Navbar />
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <div className="animate-pulse">
                  <div className="w-12 h-12 mb-4 bg-gray-300 rounded-full"></div>
                  <div className="w-24 h-4 mb-2 bg-gray-300 rounded"></div>
                  <div className="w-20 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            }
          >
            {/* No need in this time if you want to add theme toggle */}
            {/* <ThemeToggle /> */}
            {/* If you want to add theme toggle */}
            <div className="">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search_ />} />
                {/* //Loged In User Only accs */}
                <Route path="/cart" element={<Cart />} />
                {/* //Loged In User Only accs */}
                <Route path="/login" element={<Log_in />} />
              </Routes>
            </div>
          </Suspense>
          <Toaster position="bottom-center" />
          <Footer />
          {/* <ToastContainer /> */}
        </>
      )}
    </div>
  );
}

export default App;
