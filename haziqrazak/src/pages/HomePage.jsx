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

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7 } },
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

// Proficiencies data
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
  { name: "SSMS", icon: <span className="font-bold text-lg text-yellow-500">SSMS</span> },
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
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Design variables
  const containerBG = "bg-animate bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900";
  const cardFrame = "border border-blue-700 shadow-2xl rounded-xl bg-gray-900 text-gray-100";
  const titleBar = "bg-blue-800 rounded-t-xl px-6 py-4 text-2xl font-bold";
  const contentPadding = "p-6 text-xl";
  const navItemHover = { scale: 1.05, transition: { duration: 0.3 } };

  return (
    <div className={`min-h-screen w-full font-sans ${containerBG}`}>
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div whileHover={navItemHover} className="text-3xl font-bold text-gray-100">
            HaziqRazak
          </motion.div>
          <button
            className="text-gray-100 md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
          <div className="hidden md:flex space-x-8">
            {["about-me", "education", "experience", "projects", "proficiencies", "certifications"].map(
              (id) => (
                <motion.a
                  key={id}
                  whileHover={navItemHover}
                  href={`#${id}`}
                  onClick={(e) => smoothScroll(e, `#${id}`)}
                  className="text-2xl text-gray-100 hover:text-yellow-300 transition"
                >
                  {id.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </motion.a>
              )
            )}
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {["about-me", "education", "experience", "projects", "proficiencies", "certifications"].map(
              (id) => (
                <motion.a
                  key={id}
                  whileHover={navItemHover}
                  href={`#${id}`}
                  onClick={(e) => smoothScroll(e, `#${id}`)}
                  className="block text-2xl text-gray-100 hover:text-yellow-300 transition"
                >
                  {id.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </motion.a>
              )
            )}
          </div>
        )}
      </nav>

      {/* Bento-Style Grid Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Me Card */}
          <motion.div
            id="about-me"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            className={cardFrame}
          >
            <div className={titleBar}>ABOUT ME</div>
            <div className={contentPadding}>
              <h1 className="text-4xl font-extrabold mb-4">Haziq Razak</h1>
              <p className="mb-4">
                I'm a 19-year-old software engineer and web developer with expertise in cloud architecture and cloud computing based in Singapore. I create modern, interactive, and playful web experiences.
              </p>
              <p className="mb-6">
                Currently studying Information Technology at Ngee Ann Polytechnic, I enjoy blending creativity with technology to design immersive interfaces.
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.a whileHover={{ scale: 1.1 }} href="mailto:haziqrazak14.27@gmail.com" className="hover:opacity-75">
                  <FaEnvelope size={30} />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} href="https://github.com/Pofrzyzz" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                  <FaGithub size={30} />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} href="https://www.linkedin.com/in/haziqrazakiscool/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                  <FaLinkedin size={30} />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} href="https://www.instagram.com/pofrzcodes?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                  <FaInstagram size={30} />
                </motion.a>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                download
                className="inline-flex items-center space-x-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
              >
                <FaDownload size={24} />
                <span>Download Resume</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            id="education"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            className={cardFrame}
          >
            <div className={titleBar}>EDUCATION</div>
            <div className={contentPadding}>
              <div className="border-b border-blue-700 pb-4 mb-4">
                <h3 className="text-3xl font-semibold">Ngee Ann Polytechnic</h3>
                <p className="text-lg text-gray-300">2023-2026 | Information Technology</p>
                <p className="mt-2">- Participated in ICT Society</p>
              </div>
              <div>
                <h3 className="text-3xl font-semibold">Unity Secondary School</h3>
                <p className="text-lg text-gray-300">2019-2022 | O-levels</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Vice-President of Unique Media Productions</li>
                  <li>OSOS Participation Award</li>
                  <li>Winner of Intraschool Photography Competition</li>
                  <li>Student Role Model Award</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            id="experience"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            className={cardFrame}
          >
            <div className={titleBar}>EXPERIENCE</div>
            <div className={contentPadding}>
              <div className="border-b border-blue-700 pb-4 mb-4">
                <h3 className="text-3xl font-semibold">OCBC Ignite Internship</h3>
                <p className="text-lg text-gray-300">2025-2026 | Internship</p>
                <p className="mt-2">Upcoming Internship at OCBC Ignite</p>
              </div>
              <div className="border-b border-blue-700 pb-4 mb-4">
                <h3 className="text-3xl font-semibold">Photography Assistant</h3>
                <p className="text-lg text-gray-300">2021-2022 | Freelance</p>
                <p className="mt-2">Photoshoots at Gardens by the Bay & Botanic Gardens</p>
              </div>
              <div>
                <h3 className="text-3xl font-semibold">Bellman</h3>
                <p className="text-lg text-gray-300">2022-2024 | Part-Time</p>
                <p className="mt-2">Worked at Marriott Tangs Plaza Hotel</p>
              </div>
            </div>
          </motion.div>

          {/* Projects Card */}
          <motion.div
            id="projects"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            className={cardFrame}
          >
            <div className={titleBar}>PROJECTS</div>
            <div className={contentPadding}>
              <div className="border-b border-blue-700 pb-4 mb-4">
                <h3 className="text-3xl font-semibold">Personal Website</h3>
                <p className="text-lg text-gray-300">React, Next.js, Vite</p>
                <p className="mt-2">My personal website</p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://github.com/Pofrzyzz/haziqrazak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-300 hover:underline text-2xl"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://haziqrazak.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-300 hover:underline text-2xl"
                  >
                    <FaLink />
                    <span>Website</span>
                  </a>
                </div>
              </div>
              <div className="border-b border-blue-700 pb-4 mb-4">
                <h3 className="text-3xl font-semibold">MyJams</h3>
                <p className="text-lg text-gray-300">HTML, CSS, JS</p>
                <p className="mt-2">A showcase for my playlists.</p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://pofrzyzz.github.io/MyJams/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-300 hover:underline text-2xl"
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
                  A battleship game bot with Discord integration.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://github.com/Pofrzyzz/BattleShipGame"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-300 hover:underline text-2xl"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Proficiencies Card */}
          <motion.div
            id="proficiencies"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            className={cardFrame}
          >
            <div className={titleBar}>PROFICIENCIES</div>
            <div className={contentPadding}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {proficiencies.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center p-4 border border-blue-700 rounded-lg">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <p className="text-center text-2xl">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications Card */}
          <motion.div
            id="certifications"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
            className={cardFrame}
          >
            <div className={titleBar}>CERTIFICATIONS</div>
            <div className={contentPadding}>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <a
                    key={i}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-blue-700 p-4 rounded hover:bg-blue-700 transition text-2xl"
                  >
                    <div className="flex items-center space-x-4">
                      <FaCertificate className="text-blue-300" size={30} />
                      <div>
                        <p className="font-semibold">{cert.name}</p>
                        <p className="text-lg text-gray-300">{cert.date}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-gray-300 py-4 text-center text-2xl">
        Last Updated: {getFormattedDate()} | Immersive Bento-Style Portfolio
      </footer>
    </div>
  );
}
