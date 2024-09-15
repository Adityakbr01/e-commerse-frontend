import React, { Suspense, lazy, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

import "./App.css";
import Navbar from "./components/Navbar";
const Home = lazy(() => import("./components/section/Home"));

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
    <div className="relative">
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
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
