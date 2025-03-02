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

// Variants for section animation
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// Hover animation for cards
const cardHover = { whileHover: { scale: 1.02, transition: { duration: 0.3 } } };

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
  { name: "C#", icon: <span className="font-bold text-lg text-blue-400">C#</span> },
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

  // Smooth scroll for nav links
  const smoothScroll = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  // Modern playful design variables
  const containerBG = "bg-animate bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900";
  const navbarBG = "bg-transparent backdrop-blur-md";
  const mobileDropBG = "bg-blue-900";
  const titleBarBG = "bg-blue-800";
  const windowBodyBG = "bg-gray-900";
  const containerFrame = "border border-blue-700 shadow-2xl rounded-xl";
  const containerText = "text-gray-100";
  const titleBarTextColor = "text-gray-100";
  const certHover = "hover:bg-blue-700";

  return (
    <div className={`min-h-screen font-sans flex flex-col ${containerBG} overflow-x-hidden`}>
      {/* NAVBAR */}
      <div className={`${navbarBG} sticky top-0 z-50 py-4`}>
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="font-bold text-2xl text-gray-100">
            HaziqRazak
          </motion.div>
          <button
            className="text-gray-100 md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
          <div className="hidden md:flex space-x-6 text-xl">
            {["About Me", "Education", "Experience", "Projects", "Proficiencies", "Certifications"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={(e) => smoothScroll(e, `#${item.toLowerCase().replace(/\s+/g, "-")}`)}
                  className="hover:text-yellow-300 transition"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
        {menuOpen && (
          <div className={`flex flex-col items-start text-xl font-semibold px-4 py-2 space-y-2 ${mobileDropBG}`}>
            {["About Me", "Education", "Experience", "Projects", "Proficiencies", "Certifications"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={(e) => smoothScroll(e, `#${item.toLowerCase().replace(/\s+/g, "-")}`)}
                  className="hover:text-yellow-300 transition"
                >
                  {item}
                </a>
              )
            )}
          </div>
        )}
      </div>

      {/* ABOUT ME */}
      <motion.section
        id="about-me"
        className="container mx-auto px-4 py-8 w-full max-w-5xl mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div {...cardHover} className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-6 py-4 flex items-center justify-between rounded-t-xl`}>
            <span className="text-2xl font-bold">ABOUT ME</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6`}>
            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-4xl font-extrabold mb-4">
              Haziq Razak
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="mb-4 text-xl">
              I'm a 19-year-old software engineer and web developer with expertise in cloud architecture and cloud computing based in Singapore. I create modern, interactive, and playful web experiences.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="mb-6 text-xl">
              Currently studying Information Technology at Ngee Ann Polytechnic, I enjoy blending creativity with technology to design immersive interfaces.
            </motion.p>
            <div className="flex space-x-4 mb-6">
              <motion.a whileHover={{ scale: 1.1 }} href="mailto:haziqrazak14.27@gmail.com" className="hover:opacity-75">
                <FaEnvelope size={28} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="https://github.com/Pofrzyzz" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                <FaGithub size={28} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="https://www.linkedin.com/in/haziqrazakiscool/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                <FaLinkedin size={28} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="https://www.instagram.com/pofrzcodes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                <FaInstagram size={28} />
              </motion.a>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="inline-flex items-center space-x-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition"
            >
              <FaDownload size={20} />
              <span className="text-xl">Download Resume</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      {/* EDUCATION */}
      <motion.section
        id="education"
        className="container mx-auto px-4 py-8 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div {...cardHover} className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-6 py-4 flex items-center justify-between rounded-t-xl`}>
            <span className="text-2xl font-bold">EDUCATION</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6 space-y-6 text-xl`}>
            <div className="border-b border-blue-700 pb-4">
              <h3 className="text-3xl font-semibold">Ngee Ann Polytechnic</h3>
              <p className="text-lg text-gray-300">2023-2026 | Information Technology</p>
              <p className="mt-2">- Participated in ICT Society</p>
            </div>
            <div>
              <h3 className="text-3xl font-semibold">Unity Secondary School</h3>
              <p className="text-lg text-gray-300">2019-2022 | O-levels</p>
              <ul className="list-disc list-inside mt-2">
                <li>Vice-President of Unique Media Productions</li>
                <li>OSOS Participation Award (2019-2022)</li>
                <li>Winner of Intraschool Photography Competition</li>
                <li>Student Role Model Award</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* EXPERIENCE */}
      <motion.section
        id="experience"
        className="container mx-auto px-4 py-8 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div {...cardHover} className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-6 py-4 flex items-center justify-between rounded-t-xl`}>
            <span className="text-2xl font-bold">EXPERIENCE</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6 space-y-6 text-xl`}>
            <div className="border-b border-blue-700 pb-4">
              <h3 className="text-3xl font-semibold">OCBC Ignite Internship</h3>
              <p className="text-lg text-gray-300">2025-2026 | Internship</p>
              <p className="mt-2">Upcoming Internship at OCBC Ignite</p>
            </div>
            <div className="border-b border-blue-700 pb-4">
              <h3 className="text-3xl font-semibold">Photography Assistant</h3>
              <p className="text-lg text-gray-300">2021-2022 | Freelance</p>
              <p className="mt-2">Helped out at professional photoshoots at Gardens by the Bay and Botanic Gardens</p>
            </div>
            <div>
              <h3 className="text-3xl font-semibold">Bellman</h3>
              <p className="text-lg text-gray-300">2022-2024 | Part-Time</p>
              <p className="mt-2">Worked as a bellman/concierge at Marriott Tangs Plaza Hotel</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="container mx-auto px-4 py-8 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div {...cardHover} className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-6 py-4 flex items-center justify-between rounded-t-xl`}>
            <span className="text-2xl font-bold">PROJECTS</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6 space-y-6 text-xl`}>
            <div className="border-b border-blue-700 pb-4">
              <h3 className="text-3xl font-semibold">Personal Website</h3>
              <p className="text-lg text-gray-300">React, Next.js, Vite</p>
              <p className="mt-2">My personal website</p>
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
              <h3 className="text-3xl font-semibold">MyJams</h3>
              <p className="text-lg text-gray-300">HTML, CSS, JS</p>
              <p className="mt-2">
                One of my first projects—a place to showcase all my playlists.
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
              <h3 className="text-3xl font-semibold">BattleShip Bot</h3>
              <p className="text-lg text-gray-300">Python</p>
              <p className="mt-2">
                A battleship bot that lets users play a classic game against the computer—with Discord integration.
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
        </motion.div>
      </motion.section>

      {/* PROFICIENCIES */}
      <motion.section
        id="proficiencies"
        className="container mx-auto px-4 py-8 w-full max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div {...cardHover} className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-6 py-4 flex items-center justify-between rounded-t-xl`}>
            <span className="text-2xl font-bold">PROFICIENCIES</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {proficiencies.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 border border-blue-700 rounded-xl">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <p className="text-center text-xl">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* CERTIFICATIONS */}
      <motion.section
        id="certifications"
        className="container mx-auto px-4 py-8 w-full max-w-5xl mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <motion.div {...cardHover} className={containerFrame}>
          <div className={`${titleBarBG} ${titleBarTextColor} px-6 py-4 flex items-center justify-between rounded-t-xl`}>
            <span className="text-2xl font-bold">CERTIFICATIONS</span>
          </div>
          <div className={`${windowBodyBG} ${containerText} p-6 space-y-4`}>
            {certifications.map((cert, i) => (
              <a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block border border-blue-700 p-4 rounded ${certHover} transition`}
              >
                <div className="flex items-center space-x-4">
                  <FaCertificate className="text-blue-300" size={28} />
                  <div>
                    <p className="font-semibold text-2xl">{cert.name}</p>
                    <p className="text-lg text-gray-300">{cert.date}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* FOOTER */}
      <footer className="text-gray-300 py-4 mt-auto text-center">
        <p className="text-xl">
          Last Updated: {getFormattedDate()} | Playful Modern Portfolio Experience
        </p>
      </footer>
    </div>
  );
}
