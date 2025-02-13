import React from "react";
import { Route, Routes} from "react-router-dom";
import ticz_logo from "./assets/ticz-logo.png";

import Events from "./screens/events";
import About from "./screens/about";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    // <div>
    <div className="min-h-screen bg-[#02191D] text-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="w-full">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-between rounded-2xl p-4 m-8 bg-[#052F35] border border-[#197686] text-white">
            <div className="flex items-center space-x-2">
              <img src={ticz_logo} alt="Logo" className="w-24 h-auto" />
            </div>

            <div className="flex items-center space-x-8">
              {/* <Link to="/" className="hover:text-gray-300">
                Home
              </Link> */}
              <Link to="/" className="hover:text-gray-300">
                Events
              </Link>
              <Link to="/my-tickets" className="hover:text-gray-300">
                My Tickets
              </Link>
              <Link to="/about" className="hover:text-gray-300">
                About Project
              </Link>
            </div>

            <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
              MY TICKETS →
            </button>
          </nav>

          {/* Mobile Navigation */}
          <nav className="md:hidden bg-[#0A1A1F] text-white">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 border-2 border-white rounded"></div>
                <span className="text-xl font-semibold">tiez</span>
              </div>

              <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
                MY TICKETS →
              </button>
            </div>
          </nav>
        </div>
      </div>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/selection" />} /> */}
        <Route path="/" element={<Events />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
