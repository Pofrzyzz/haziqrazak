// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ smoothScroll }) => {
  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-50 p-4 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Makeshift Logo */}
        <h1 className="text-2xl font-bold">HaziqRazak</h1>

        {/* Navigation Items */}
        <ul className="flex space-x-6 text-lg">
          {["About Me", "Education", "Experience", "Projects", "Certifications"].map(
            (item) => (
              <li key={item}>
                <button
                  onClick={() =>
                    smoothScroll &&
                    smoothScroll(`#${item.toLowerCase().replace(/\s+/g, "-")}`)
                  }
                  className="hover:text-gray-300 transition duration-300 focus:outline-none text-gray-100"
                >
                  {item}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
