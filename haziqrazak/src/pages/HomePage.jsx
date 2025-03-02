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
  FaAws,
  FaHtml5,
  FaCss3,
} from "react-icons/fa";
import {
  SiGoland,
  SiAdobephotoshop,
  SiFlask,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiVite,
  SiPython,
  SiFirebase,
  SiMongodb,
} from "react-icons/si";

// Fade-in animation for sections
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

// Proficiencies data (name + icon)
const proficiencies = [
  { name: "Golang", icon: <SiGoland /> },
  { name: "Adobe Photoshop", icon: <SiAdobephotoshop /> },
  { name: "Flask", icon: <SiFlask /> },
  { name: "SQL", icon: <FaCertificate /> },
  { name: "AWS", icon: <FaAws /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Node", icon: <SiNodedotjs /> },
  { name: "React", icon: <SiReact /> },
  { name: "Vite", icon: <SiVite /> },
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3 /> },
  { name: "C#", icon: <span className="font-bold text-lg text-blue-500">C#</span> },
  { name: "Python", icon: <SiPython /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "SQL Server Management Studio", icon: <span className="font-bold text-lg text-yellow-500">SSMS</span> },
];

// Helper: Format date as DD/MM/YYYY
const getFormattedDate = () => {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll
  const smoothScroll = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  // Modern design variables
  const containerBG = "bg-gradient-to-br from-gray-800 to-blue-900";
  const navbarBG = "bg-transparent backdrop-blur-md";
  const mobileDropBG = "bg-blue-900";
  const titleBarBG = "bg-blue-800";
  const windowBodyBG = "bg-gray-900";
  const containerFrame = "border border-blue-700 shadow-lg rounded-lg";
  const containerText = "text-gray-100";
  const titleBarTextColor = "text-gray-100";
  const certHover = "hover:bg-blue-700";

  return (
    <div className={`min-h-screen font-sans flex flex-col ${containerBG}`}>
      {/* NAVBAR */}
      <div className={`${navbarBG} sticky top-0 z-50`}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-xl text-gray-100">HaziqRazak</div>
          <button
            className="text-gray-100 md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="hidden md:flex space-x-6 text-lg">
            <a
              href="#about-me"
              onClick={(e) => smoothScroll(e, "#about-me")}
              className="hover:text-yellow-300 transition"
            >
              About Me
            </a>
            <a
              href="#education"
              onClick={(e) => smoothScroll(e, "#education")}
              className="hover:text-yellow-300 transition"
            >
              Education
            </a>
            <a
              href="#experience"
              onClick={(e) => smoothScroll(e, "#experience")}
              className="hover:text-yellow-300 transition"
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => smoothScroll(e, "#projects")}
              className="hover:text-yellow-300 transition"
            >
              Projects
            </a>
            <a
              href="#proficiencies"
              onClick={(e) => smoothScroll(e, "#proficiencies")}
              className="hover:text-yellow-300 transition"
            >
              Proficiencies
            </a>
            <a
              href="#certifications"
              onClick={(e) => smoothScroll(e, "#certifications")}
              className="hover:text-yellow-300 transition"
            >
              Certifications
            </a>
          </div>
        </div>
        {menuOpen && (
          <div className={`flex flex-col items-start text-lg font-semibold px-4 py-2 space-y-2 ${mobileDropBG}`}>
            <a
              href="#about-me"
              onClick={(e) => smoothScroll(e, "#about-me")}
              className="hover:text-yellow-300 transition"
            >
              About Me
            </a>
            <a
              href="#education"
              onClick={(e) => smoothScroll(e, "#education")}
              className="hover:text-yellow-300 transition"
            >
              Education
            </a>
            <a
              href="#experience"
              onClick={(e) => smoothScroll(e, "#experience")}
              className="hover:text-yellow-300 transition"
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => smoothScroll(e, "#projects")}
              className="hover:text-yellow-300 transition"
            >
              Projects
            </a>
            <a
              href="#proficiencies"
              onClick={(e) => smoothScroll(e, "#proficiencies")}
              className="hover:text-yellow-300 transition"
            >
              Proficiencies
            </a>
            <a
              href="#certifications"
              onClick={(e) => smoothScroll(e, "#certifications")}
              className="hover:text-yellow-300 transition"
            >
              Certifications
            </a>
          </div>
        )}
      </div>

      {/* ABOUT ME */}
      <motion.section
        id="about-me"
        className="container mx-auto px-4 py-8 w-full max-w-5xl mt-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-4 py-3 flex items-center justify-between`}>
            <span className="text-lg font-bold">ABOUT ME</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6`}>
            <h1 className="text-3xl font-extrabold mb-4">Haziq Razak</h1>
            <p className="mb-4 text-lg">
              I'm a 19-year-old software engineer and web developer with expertise in cloud architecture and cloud computing based in Singapore. I specialize in creating modern, interactive, and engaging web experiences.
            </p>
            <p className="mb-4 text-lg">
              Currently, I study Information Technology at Ngee Ann Polytechnic, Singapore. I enjoy blending creativity with technology to build sleek and playful interfaces.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="mailto:haziqrazak14.27@gmail.com" className="hover:opacity-75">
                <FaEnvelope size={24} />
              </a>
              <a href="https://github.com/Pofrzyzz" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/haziqrazakiscool/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                <FaLinkedin size={24} />
              </a>
              <a href="https://www.instagram.com/pofrzcodes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                <FaInstagram size={24} />
              </a>
            </div>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition"
            >
              <FaDownload size={18} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* EDUCATION */}
      <motion.section
        id="education"
        className="container mx-auto px-4 py-8 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-4 py-3 flex items-center justify-between`}>
            <span className="text-lg font-bold">EDUCATION</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6`}>
            <div className="space-y-6">
              <div className="border-b border-blue-700 pb-4">
                <h3 className="text-xl font-semibold">Ngee Ann Polytechnic</h3>
                <p className="text-sm text-gray-300">2023-2026 | Information Technology</p>
                <p className="mt-2 text-lg">- Participated in ICT Society</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Unity Secondary School</h3>
                <p className="text-sm text-gray-300">2019-2022 | O-levels</p>
                <ul className="list-disc list-inside mt-2 text-lg">
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

      {/* EXPERIENCE */}
      <motion.section
        id="experience"
        className="container mx-auto px-4 py-8 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-4 py-3 flex items-center justify-between`}>
            <span className="text-lg font-bold">EXPERIENCE</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6`}>
            <div className="space-y-6">
              <div className="border-b border-blue-700 pb-4">
                <h3 className="text-xl font-semibold">OCBC Ignite Internship</h3>
                <p className="text-sm text-gray-300">2025-2026 | Internship</p>
                <p className="mt-2 text-lg">Upcoming Internship at OCBC Ignite</p>
              </div>
              <div className="border-b border-blue-700 pb-4">
                <h3 className="text-xl font-semibold">Photography Assistant</h3>
                <p className="text-sm text-gray-300">2021-2022 | Freelance</p>
                <p className="mt-2 text-lg">Helped out at professional photoshoots at Gardens by the Bay and Botanic Gardens</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Bellman</h3>
                <p className="text-sm text-gray-300">2022-2024 | Part-Time</p>
                <p className="mt-2 text-lg">Worked as a bellman/concierge at Marriott Tangs Plaza Hotel</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="container mx-auto px-4 py-8 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-4 py-3 flex items-center justify-between`}>
            <span className="text-lg font-bold">PROJECTS</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6`}>
            <div className="space-y-6">
              <div className="border-b border-blue-700 pb-4">
                <h3 className="text-xl font-semibold">Personal Website</h3>
                <p className="text-sm text-gray-300">React, Next.js, Vite</p>
                <p className="mt-2 text-lg">My personal website</p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://github.com/Pofrzyzz/haziqrazak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-300 hover:underline"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://haziqrazak.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-300 hover:underline"
                  >
                    <FaLink />
                    <span>Website</span>
                  </a>
                </div>
              </div>
              <div className="border-b border-blue-700 pb-4">
                <h3 className="text-xl font-semibold">MyJams</h3>
                <p className="text-sm text-gray-300">HTML, CSS, JS</p>
                <p className="mt-2 text-lg">
                  One of my first few projects. I just wanted a place to showcase all my playlists.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://pofrzyzz.github.io/MyJams/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-300 hover:underline"
                  >
                    <FaLink />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold">BattleShip Bot</h3>
                <p className="text-sm text-gray-300">Python</p>
                <p className="mt-2 text-lg">
                  In this project, I implemented a battleship bot that allows users to play a traditional game of battleship against a computer. I also connected the bot to Discord, although hosting constraints apply.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://github.com/Pofrzyzz/BattleShipGame"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-300 hover:underline"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* PROFICIENCIES */}
      <motion.section
        id="proficiencies"
        className="container mx-auto px-4 py-8 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-4 py-3 flex items-center justify-between`}>
            <span className="text-lg font-bold">PROFICIENCIES</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {proficiencies.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 border border-blue-700 rounded-lg">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-center text-lg">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CERTIFICATIONS */}
      <motion.section
        id="certifications"
        className="container mx-auto px-4 py-8 w-full max-w-5xl mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-4 py-3 flex items-center justify-between`}>
            <span className="text-lg font-bold">CERTIFICATIONS</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6`}>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className={`block border border-blue-700 p-4 rounded ${certHover} transition`}
                >
                  <div className="flex items-center space-x-4">
                    <FaCertificate className="text-blue-300" />
                    <div>
                      <p className="font-semibold text-lg">{cert.name}</p>
                      <p className="text-sm text-gray-300">{cert.date}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="text-gray-300 py-4 mt-auto text-center">
        <p className="text-sm">
          Last Updated: {getFormattedDate()} | Modern Portfolio Design
        </p>
      </footer>
    </div>
  );
}
