import React, { Suspense, lazy, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/section/Footer";
// import ThemeToggle from "./components/addThemeToggle";
const Home = lazy(() => import("./components/section/Home"));
const SupportWith = lazy(() => import("./components/SupportWith"));
const Fillter_Product_hero = lazy(() =>
  import("./components/Fillter_Product_hero")
);

function App() {
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
  return (
    <div className="relative dark:bg-black">
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
          <Home />
          <SupportWith />
          <Fillter_Product_hero />
        </div>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
