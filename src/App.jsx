import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/section/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextAnimation from "./components/Welcome_Loader";
import Search_ from "./components/Search_";
import Cart from "./components/Cart";
// import ThemeToggle from "./components/addThemeToggle";
const Home = lazy(() => import("./components/section/Home"));
const SupportWith = lazy(() => import("./components/SupportWith"));
const Fillter_Product_hero = lazy(() =>
  import("./components/Fillter_Product_hero")
);

function App() {
  const [loading, setLoading] = useState(true);

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
            <div className="w-[85%] mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search_ />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
          </Suspense>
          <Footer />
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
