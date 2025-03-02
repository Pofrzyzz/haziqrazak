import React from "react";

const Navbar = ({ smoothScroll }) => {
  return (
    <nav className="fixed top-0 w-full bg-transparent backdrop-blur-md p-4 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-100">HaziqRazak</h1>
        <ul className="flex space-x-6 text-lg">
          {["About Me", "Education", "Experience", "Projects", "Certifications"].map(
            (item) => (
              <li key={item}>
                <button
                  onClick={() =>
                    smoothScroll &&
                    smoothScroll(`#${item.toLowerCase().replace(/\s+/g, "-")}`)
                  }
                  className="hover:text-yellow-300 transition duration-300 focus:outline-none text-gray-100"
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
