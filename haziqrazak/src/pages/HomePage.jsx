import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaDownload,
  FaLink,
  FaCertificate,
  FaBars,
  FaTimes,
} from "react-icons/fa";

// For the section fade-in animation
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Example certifications (fill in as needed)
const certifications = [
  {
    name: "Professional Scrum Master™ I (PSM I)",
    date: "May 2024",
    link: "https://www.credly.com/badges/19628356-d1c2-4f2f-9383-4c0139acc829/linked_in_profile",
  },
  {
    name: "Go (Basic)",
    date: "HackerRank",
    link: "https://www.hackerrank.com/certificates/9b49f85d5336",
  },
  {
    name: "SQL (Basic)",
    date: "HackerRank",
    link: "https://www.hackerrank.com/certificates/iframe/f1e17d3784cf",
  },
  {
    name: "SQL (Intermediate)",
    date: "HackerRank",
    link: "https://www.hackerrank.com/certificates/iframe/b6787b9fb5a0",
  },
  {
    name: "Python (Basic)",
    date: "HackerRank",
    link: "https://www.hackerrank.com/certificates/508683d4132a",
  },
  {
    name: "C# (Basic)",
    date: "HackerRank",
    link: "https://www.hackerrank.com/certificates/f856ffdf6442",
  },
];

// Helper for formatting date as DD/MM/YYYY
const getFormattedDate = () => {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
};

export default function HomePage() {
  // State for the mobile hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll helper
  const smoothScroll = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false); // close menu after navigation
  };

  return (
    <div
      className="min-h-screen text-black font-['Tahoma','Geneva','sans-serif'] flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/bliss.jpg')" }}
    >
      {/* NAVBAR (Windows XP–style, with hamburger on mobile) */}
      <div className="w-full bg-blue-500 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Title / Mini Logo */}
          <div className="font-bold text-sm md:text-base">
            HaziqRazak (XP Edition)
          </div>

          {/* Hamburger Icon (mobile) */}
          <button
            className="text-white md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Horizontal Nav (desktop) */}
          <div className="hidden md:flex space-x-4 text-sm font-bold">
            <a
              href="#about-me"
              onClick={(e) => smoothScroll(e, "#about-me")}
              className="hover:text-yellow-200"
            >
              About Me
            </a>
            <a
              href="#education"
              onClick={(e) => smoothScroll(e, "#education")}
              className="hover:text-yellow-200"
            >
              Education
            </a>
            <a
              href="#experience"
              onClick={(e) => smoothScroll(e, "#experience")}
              className="hover:text-yellow-200"
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => smoothScroll(e, "#projects")}
              className="hover:text-yellow-200"
            >
              Projects
            </a>
            <a
              href="#certifications"
              onClick={(e) => smoothScroll(e, "#certifications")}
              className="hover:text-yellow-200"
            >
              Certifications
            </a>
          </div>
        </div>

        {/* Dropdown Nav (mobile only) */}
        {menuOpen && (
          <div className="flex flex-col items-start bg-blue-600 text-sm font-bold px-4 py-2 space-y-1 md:hidden">
            <a
              href="#about-me"
              onClick={(e) => smoothScroll(e, "#about-me")}
              className="hover:text-yellow-200"
            >
              About Me
            </a>
            <a
              href="#education"
              onClick={(e) => smoothScroll(e, "#education")}
              className="hover:text-yellow-200"
            >
              Education
            </a>
            <a
              href="#experience"
              onClick={(e) => smoothScroll(e, "#experience")}
              className="hover:text-yellow-200"
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => smoothScroll(e, "#projects")}
              className="hover:text-yellow-200"
            >
              Projects
            </a>
            <a
              href="#certifications"
              onClick={(e) => smoothScroll(e, "#certifications")}
              className="hover:text-yellow-200"
            >
              Certifications
            </a>
          </div>
        )}
      </div>

      {/* ABOUT ME WINDOW */}
      <motion.section
        id="about-me"
        className="container mx-auto px-4 py-4 md:py-6 w-full max-w-5xl mt-2 md:mt-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="border-4 border-gray-400">
          <div className="bg-blue-500 text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold rounded-t-md shadow-md">
            <span>ABOUT ME</span>
            <span className="text-white cursor-pointer">[x]</span>
          </div>
          <div className="bg-gray-200 rounded-b-md shadow-md p-4 md:p-6 text-xs md:text-sm">
            <h1 className="text-xl md:text-3xl font-extrabold mb-2 text-black">
              Haziq Razak
            </h1>
            <p className="mb-2 text-gray-800 font-medium">
              I'm studying Information Technology at Ngee Ann Polytechnic in
              Singapore.
            </p>
            <p className="mb-2 text-gray-700 font-light">
              I love watching movies and taking photos in my spare time. Some of
              my favorite entertainment includes Star Wars, Spider-Man, and{" "}
              <Link
                to="/secret"
                className="font-normal text-gray-700 no-underline hover:underline"
              >
                How I Met Your Mother
              </Link>
              .
            </p>
            <p className="mb-4 text-gray-700 font-light">
              My journey in photography began back in 2018, and since then, I
              have been passionate about capturing moments through my lens.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap space-x-4 mb-2 text-gray-800">
              <a
                href="mailto:haziqrazak14.27@gmail.com"
                className="hover:text-gray-500"
              >
                <FaEnvelope size={22} />
              </a>
              <a
                href="https://github.com/Pofrzyzz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/haziqrazakiscool/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href="https://www.instagram.com/pofrzcodes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
              >
                <FaInstagram size={22} />
              </a>
            </div>

            {/* Resume Download */}
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 
                         hover:bg-blue-600 text-white font-bold rounded mt-2"
            >
              <FaDownload size={16} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* EDUCATION WINDOW */}
      <motion.section
        id="education"
        className="container mx-auto px-4 py-4 md:py-6 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="border-4 border-gray-400">
          <div className="bg-blue-500 text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold rounded-t-md shadow-md">
            <span>EDUCATION</span>
            <span>[x]</span>
          </div>
          <div className="bg-gray-200 rounded-b-md shadow-md p-4 md:p-6 text-xs md:text-sm">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md border border-gray-300">
                <h3 className="text-sm md:text-lg font-semibold">
                  Ngee Ann Polytechnic
                </h3>
                <p className="text-gray-500 text-xs md:text-sm">
                  2023-2026 | Information Technology
                </p>
                <p className="mt-1 text-gray-700">
                  - Participated in ICT Society
                </p>
              </div>
              <div className="bg-white p-4 rounded-md border border-gray-300">
                <h3 className="text-sm md:text-lg font-semibold">
                  Unity Secondary School
                </h3>
                <p className="text-gray-500 text-xs md:text-sm">
                  2019-2022 | O-levels
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-1 text-xs md:text-sm">
                  <li>Vice-President of Unique Media Productions</li>
                  <li>OSOS Participation Award (2019-2022)</li>
                  <li>Winner of Intraschool Photography Competition</li>
                  <li>Student Role Model Award</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* EXPERIENCE WINDOW */}
      <motion.section
        id="experience"
        className="container mx-auto px-4 py-4 md:py-6 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="border-4 border-gray-400">
          <div className="bg-blue-500 text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold rounded-t-md shadow-md">
            <span>EXPERIENCE</span>
            <span>[x]</span>
          </div>
          <div className="bg-gray-200 rounded-b-md shadow-md p-4 md:p-6 text-xs md:text-sm">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md border border-gray-300">
                <h3 className="text-sm md:text-lg font-semibold">
                  OCBC Ignite Internship
                </h3>
                <p className="text-gray-500 text-xs md:text-sm">
                  2025-2026 | Internship
                </p>
                <p className="text-gray-700 mt-1">
                  Upcoming Internship at OCBC ignite
                </p>
              </div>
              <div className="bg-white p-4 rounded-md border border-gray-300">
                <h3 className="text-sm md:text-lg font-semibold">
                  Photography Assistant
                </h3>
                <p className="text-gray-500 text-xs md:text-sm">
                  2021-2022 | Freelance
                </p>
                <p className="text-gray-700 mt-1">
                  Helped out at professional photoshoots at Gardens by the Bay
                  and Botanic Gardens
                </p>
              </div>
              <div className="bg-white p-4 rounded-md border border-gray-300">
                <h3 className="text-sm md:text-lg font-semibold">Bellman</h3>
                <p className="text-gray-500 text-xs md:text-sm">
                  2022-2024 | Part-Time
                </p>
                <p className="text-gray-700 mt-1">
                  Worked as a bellman/concierge at Marriott Tangs Plaza Hotel
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* PROJECTS WINDOW */}
      <motion.section
        id="projects"
        className="container mx-auto px-4 py-4 md:py-6 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="border-4 border-gray-400">
          <div className="bg-blue-500 text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold rounded-t-md shadow-md">
            <span>PROJECTS</span>
            <span>[x]</span>
          </div>
          <div className="bg-gray-200 rounded-b-md shadow-md p-4 md:p-6 text-xs md:text-sm">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md border border-gray-300">
                <h3 className="text-sm md:text-lg font-semibold">
                  Personal Website
                </h3>
                <p className="text-xs text-gray-500">React, Next.js, Vite</p>
                <p className="text-gray-700 mt-1">My personal website</p>
                <div className="flex flex-wrap space-x-4 mt-3">
                  <a
                    href="https://github.com/Pofrzyzz/haziqrazak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:underline text-xs md:text-sm"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://haziqrazak.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:underline text-xs md:text-sm"
                  >
                    <FaLink />
                    <span>Website</span>
                  </a>
                </div>
              </div>
              <div className="bg-white p-4 rounded-md border border-gray-300">
                <h3 className="text-sm md:text-lg font-semibold">MyJams</h3>
                <p className="text-xs text-gray-500">HTML, CSS, JS</p>
                <p className="text-gray-700 mt-1">
                  One of my first few projects. I just wanted a place to showcase
                  all my playlists.
                </p>
                <div className="flex flex-wrap space-x-4 mt-3">
                  <a
                    href="https://pofrzyzz.github.io/MyJams/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:underline text-xs md:text-sm"
                  >
                    <FaLink />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CERTIFICATIONS WINDOW */}
      <motion.section
        id="certifications"
        className="container mx-auto px-4 py-4 md:py-6 w-full max-w-5xl mb-4 md:mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="border-4 border-gray-400">
          <div className="bg-blue-500 text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold rounded-t-md shadow-md">
            <span>CERTIFICATIONS 📜</span>
            <span>[x]</span>
          </div>
          <div className="bg-gray-200 rounded-b-md shadow-md p-4 md:p-6 text-xs md:text-sm">
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className="block bg-white p-3 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center space-x-3"
                >
                  <FaCertificate className="text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">{cert.name}</p>
                    <p className="text-xs text-gray-500">{cert.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="text-center bg-[#16213E] text-white py-2 mt-auto">
        <p className="text-xs">
          Last Updated: {getFormattedDate()} | Windows XP Theme
        </p>
      </footer>
    </div>
  );
}
