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

// XP-like fade-in animation
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Example certifications
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

// Format date as DD/MM/YYYY
const getFormattedDate = () => {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll for in-page anchors
  const smoothScroll = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <div
      className="min-h-screen text-black font-['MS_Sans_Serif','Tahoma','Geneva','sans-serif'] flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/bliss.jpg')" }} // Put bliss.jpg in /public
    >
      {/* NAVBAR (All #507ACF) */}
      <div className="w-full bg-[#507ACF] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* XP-like Title */}
          <div className="font-bold text-sm md:text-base">HaziqRazak XP</div>

          {/* Hamburger (mobile) */}
          <button
            className="text-white md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Desktop Nav */}
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

        {/* Mobile Nav (All #507ACF) */}
        {menuOpen && (
          <div className="flex flex-col items-start bg-[#507ACF] text-sm font-bold px-4 py-2 space-y-1 md:hidden">
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

      {/* ABOUT ME WINDOW (Sharp edges, #507ACF border) */}
      <motion.section
        id="about-me"
        className="container mx-auto px-4 py-4 md:py-6 w-full max-w-5xl mt-2 md:mt-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="border-4 border-[#507ACF]">
          <div className="bg-[#507ACF] text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold shadow-md">
            <span>ABOUT ME</span>
            <span className="cursor-pointer text-white">[x]</span>
          </div>
          <div className="bg-[#ECE9D8] shadow-md p-4 md:p-6 text-xs md:text-sm">
            <h1 className="text-base md:text-2xl font-extrabold mb-2 text-black">
              Haziq Razak
            </h1>
            <p className="mb-2 text-gray-800 font-medium text-sm md:text-base">
              I'm studying Information Technology at Ngee Ann Polytechnic in
              Singapore.
            </p>
            <p className="mb-2 text-gray-700 font-light text-sm md:text-base">
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
            <p className="mb-4 text-gray-700 font-light text-sm md:text-base">
              My journey in photography began back in 2018, and since then, I
              have been passionate about capturing moments through my lens.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap space-x-4 mb-2 text-gray-800">
              <a
                href="mailto:haziqrazak14.27@gmail.com"
                className="hover:text-gray-500"
              >
                <FaEnvelope size={20} />
              </a>
              <a
                href="https://github.com/Pofrzyzz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/haziqrazakiscool/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/pofrzcodes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
              >
                <FaInstagram size={20} />
              </a>
            </div>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center space-x-2 px-3 py-1 
                         bg-[#507ACF] hover:bg-[#3B63A8] text-white font-bold text-xs md:text-sm"
            >
              <FaDownload size={14} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* EDUCATION WINDOW (No rounding, consistent #507ACF) */}
      <motion.section
        id="education"
        className="container mx-auto px-4 py-4 md:py-6 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="border-4 border-[#507ACF]">
          <div className="bg-[#507ACF] text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold shadow-md">
            <span>EDUCATION</span>
            <span>[x]</span>
          </div>
          <div className="bg-[#ECE9D8] shadow-md p-4 md:p-6 text-xs md:text-sm">
            <div>
              <div className="border border-gray-300 p-3">
                <h3 className="text-sm md:text-base font-semibold">
                  Ngee Ann Polytechnic
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  2023-2026 | Information Technology
                </p>
                <p className="mt-1 text-gray-700 text-xs md:text-sm">
                  - Participated in ICT Society
                </p>
              </div>
              <div className="border border-gray-300 p-3 mt-3">
                <h3 className="text-sm md:text-base font-semibold">
                  Unity Secondary School
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
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
        <div className="border-4 border-[#507ACF]">
          <div className="bg-[#507ACF] text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold shadow-md">
            <span>EXPERIENCE</span>
            <span>[x]</span>
          </div>
          <div className="bg-[#ECE9D8] shadow-md p-4 md:p-6 text-xs md:text-sm">
            <div>
              <div className="border border-gray-300 p-3">
                <h3 className="text-sm md:text-base font-semibold">
                  OCBC Ignite Internship
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  2025-2026 | Internship
                </p>
                <p className="text-gray-700 mt-1 text-xs md:text-sm">
                  Upcoming Internship at OCBC ignite
                </p>
              </div>
              <div className="border border-gray-300 p-3 mt-3">
                <h3 className="text-sm md:text-base font-semibold">
                  Photography Assistant
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  2021-2022 | Freelance
                </p>
                <p className="text-gray-700 mt-1 text-xs md:text-sm">
                  Helped out at professional photoshoots at Gardens by the Bay and
                  Botanic Gardens
                </p>
              </div>
              <div className="border border-gray-300 p-3 mt-3">
                <h3 className="text-sm md:text-base font-semibold">Bellman</h3>
                <p className="text-xs md:text-sm text-gray-500">
                  2022-2024 | Part-Time
                </p>
                <p className="text-gray-700 mt-1 text-xs md:text-sm">
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
        <div className="border-4 border-[#507ACF]">
          <div className="bg-[#507ACF] text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold shadow-md">
            <span>PROJECTS</span>
            <span>[x]</span>
          </div>
          <div className="bg-[#ECE9D8] shadow-md p-4 md:p-6 text-xs md:text-sm">
            <div>
              <div className="border border-gray-300 p-3">
                <h3 className="text-sm md:text-base font-semibold">
                  Personal Website
                </h3>
                <p className="text-xs text-gray-500">React, Next.js, Vite</p>
                <p className="text-gray-700 mt-1 text-xs md:text-sm">
                  My personal website
                </p>
                <div className="flex flex-wrap space-x-3 mt-2">
                  <a
                    href="https://github.com/Pofrzyzz/haziqrazak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-700 hover:underline text-xs md:text-sm"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://haziqrazak.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-700 hover:underline text-xs md:text-sm"
                  >
                    <FaLink />
                    <span>Website</span>
                  </a>
                </div>
              </div>
              <div className="border border-gray-300 p-3 mt-3">
                <h3 className="text-sm md:text-base font-semibold">MyJams</h3>
                <p className="text-xs text-gray-500">HTML, CSS, JS</p>
                <p className="text-gray-700 mt-1 text-xs md:text-sm">
                  One of my first few projects. I just wanted a place to showcase
                  all my playlists.
                </p>
                <div className="flex flex-wrap space-x-3 mt-2">
                  <a
                    href="https://pofrzyzz.github.io/MyJams/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-700 hover:underline text-xs md:text-sm"
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
        <div className="border-4 border-[#507ACF]">
          <div className="bg-[#507ACF] text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold shadow-md">
            <span>CERTIFICATIONS 📜</span>
            <span>[x]</span>
          </div>
          <div className="bg-[#ECE9D8] shadow-md p-4 md:p-6 text-xs md:text-sm">
            <div>
              {certifications.map((cert, i) => (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className="block border border-gray-300 p-3 hover:bg-[#E1DEC9] mt-3 first:mt-0"
                >
                  <div className="flex items-center space-x-3">
                    <FaCertificate className="text-blue-700" />
                    <div>
                      <p className="font-semibold text-gray-800">{cert.name}</p>
                      <p className="text-xs text-gray-500">{cert.date}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="text-center bg-[#507ACF] text-white py-2 mt-auto">
        <p className="text-xs">
          Last Updated: {getFormattedDate()} | Windows XP Popup Theme
        </p>
      </footer>
    </div>
  );
}
