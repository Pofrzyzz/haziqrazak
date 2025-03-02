import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
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

// Particle configuration for interactive free-flowing particles
const particlesOptions = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: { value: "#888888" },
    links: {
      color: "#555555",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    collisions: { enable: false },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: true,
      speed: 1,
      straight: false,
    },
    number: { density: { enable: true, area: 800 }, value: 50 },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
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

// Proficiencies data (icon and name)
const proficiencies = [
  { name: "Golang", icon: <SiGoland /> },
  { name: "Adobe Photoshop", icon: <SiAdobephotoshop /> },
  { name: "Flask", icon: <SiFlask /> },
  { name: "SQL", icon: <FaCertificate /> },
  { name: "AWS", icon: <FaEnvelope /> }, // replaced icon for example
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Node", icon: <SiNodedotjs /> },
  { name: "React", icon: <SiReact /> },
  { name: "Vite", icon: <SiVite /> },
  { name: "HTML", icon: <FaEnvelope /> }, // replaced icon for example
  { name: "CSS", icon: <FaEnvelope /> }, // replaced icon for example
  { name: "C#", icon: <span className="font-bold text-lg text-gray-300">C#</span> },
  { name: "Python", icon: <SiPython /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "SSMS", icon: <span className="font-bold text-lg text-gray-400">SSMS</span> },
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

  // Particle engine initialization
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Smooth scroll for navigation links
  const smoothScroll = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Design variables for dark theme (grey, black, lead)
  const containerBG = "bg-gradient-to-br from-gray-900 to-black";
  const cardFrame = "border border-gray-700 shadow-xl rounded-lg bg-gray-800 text-gray-300";
  const titleBar = "bg-gray-700 rounded-t-lg px-4 py-3 text-xl font-bold";
  const contentPadding = "p-4 text-base";
  const navHover = { scale: 1.05, transition: { duration: 0.3 } };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* Main content overlay */}
      <div className={`relative z-10 ${containerBG} min-h-screen`}>
        {/* Sticky Navbar */}
        <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div whileHover={navHover} className="text-2xl font-bold text-gray-300">
              HaziqRazak
            </motion.div>
            <button
              className="text-gray-300 md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <div className="hidden md:flex space-x-4">
              {["about-me", "education", "experience", "projects", "proficiencies", "certifications"].map(
                (id) => (
                  <motion.a
                    key={id}
                    whileHover={navHover}
                    href={`#${id}`}
                    onClick={(e) => smoothScroll(e, `#${id}`)}
                    className="text-base text-gray-300 hover:text-gray-100 transition"
                  >
                    {id.replace("-", " ").toUpperCase()}
                  </motion.a>
                )
              )}
            </div>
          </div>
          {menuOpen && (
            <div className="md:hidden mt-2 space-y-2">
              {["about-me", "education", "experience", "projects", "proficiencies", "certifications"].map(
                (id) => (
                  <motion.a
                    key={id}
                    whileHover={navHover}
                    href={`#${id}`}
                    onClick={(e) => smoothScroll(e, `#${id}`)}
                    className="block text-base text-gray-300 hover:text-gray-100 transition"
                  >
                    {id.replace("-", " ").toUpperCase()}
                  </motion.a>
                )
              )}
            </div>
          )}
        </nav>

        {/* Bento-Style Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* About Me Card */}
            <motion.div
              id="about-me"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className={cardFrame}
            >
              <div className={titleBar}>ABOUT ME</div>
              <div className={contentPadding}>
                <h1 className="text-xl font-extrabold mb-2">Haziq Razak</h1>
                <p className="mb-2">
                  I'm a 19-year-old software engineer and web developer with expertise in cloud architecture and cloud computing based in Singapore.
                </p>
                <p className="mb-3">
                  Studying IT at Ngee Ann Polytechnic, I blend creativity with technology to design immersive experiences.
                </p>
                <div className="flex space-x-3 mb-3">
                  <motion.a whileHover={{ scale: 1.1 }} href="mailto:haziqrazak14.27@gmail.com" className="hover:opacity-80">
                    <FaEnvelope size={20} />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.1 }} href="https://github.com/Pofrzyzz" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <FaGithub size={20} />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.1 }} href="https://www.linkedin.com/in/haziqrazakiscool/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <FaLinkedin size={20} />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.1 }} href="https://www.instagram.com/pofrzcodes" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                    <FaInstagram size={20} />
                  </motion.a>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold rounded transition"
                >
                  <FaDownload size={18} />
                  <span className="text-sm">Download Resume</span>
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
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className={cardFrame}
            >
              <div className={titleBar}>EDUCATION</div>
              <div className={contentPadding}>
                <div className="border-b border-gray-700 pb-2 mb-2">
                  <h3 className="text-base font-semibold">Ngee Ann Polytechnic</h3>
                  <p className="text-xs text-gray-400">2023-2026 | Information Technology</p>
                  <p className="mt-1 text-xs">- Participated in ICT Society</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold">Unity Secondary School</h3>
                  <p className="text-xs text-gray-400">2019-2022 | O-levels</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    <li>Vice-President of Unique Media Productions</li>
                    <li>OSOS Participation Award</li>
                    <li>Winner of Photography Competition</li>
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
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className={cardFrame}
            >
              <div className={titleBar}>EXPERIENCE</div>
              <div className={contentPadding}>
                <div className="border-b border-gray-700 pb-2 mb-2">
                  <h3 className="text-base font-semibold">OCBC Ignite Internship</h3>
                  <p className="text-xs text-gray-400">2025-2026 | Internship</p>
                  <p className="mt-1 text-xs">Upcoming Internship at OCBC Ignite</p>
                </div>
                <div className="border-b border-gray-700 pb-2 mb-2">
                  <h3 className="text-base font-semibold">Photography Assistant</h3>
                  <p className="text-xs text-gray-400">2021-2022 | Freelance</p>
                  <p className="mt-1 text-xs">Photoshoots at Gardens by the Bay & Botanic Gardens</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold">Bellman</h3>
                  <p className="text-xs text-gray-400">2022-2024 | Part-Time</p>
                  <p className="mt-1 text-xs">Worked at Marriott Tangs Plaza Hotel</p>
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
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className={cardFrame}
            >
              <div className={titleBar}>PROJECTS</div>
              <div className={contentPadding}>
                <div className="border-b border-gray-700 pb-2 mb-2">
                  <h3 className="text-base font-semibold">Personal Website</h3>
                  <p className="text-xs text-gray-400">React, Next.js, Vite</p>
                  <p className="mt-1 text-xs">My personal website</p>
                  <div className="flex space-x-2 mt-2">
                    <a
                      href="https://github.com/Pofrzyzz/haziqrazak"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-400 hover:underline text-xs"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://haziqrazak.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-400 hover:underline text-xs"
                    >
                      <FaLink />
                      <span>Website</span>
                    </a>
                  </div>
                </div>
                <div className="border-b border-gray-700 pb-2 mb-2">
                  <h3 className="text-base font-semibold">MyJams</h3>
                  <p className="text-xs text-gray-400">HTML, CSS, JS</p>
                  <p className="mt-1 text-xs">A showcase for my playlists</p>
                  <div className="flex space-x-2 mt-2">
                    <a
                      href="https://pofrzyzz.github.io/MyJams/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-400 hover:underline text-xs"
                    >
                      <FaLink />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold">BattleShip Bot</h3>
                  <p className="text-xs text-gray-400">Python</p>
                  <p className="mt-1 text-xs">
                    A battleship game bot with Discord integration.
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <a
                      href="https://github.com/Pofrzyzz/BattleShipGame"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-400 hover:underline text-xs"
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
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className={cardFrame}
            >
              <div className={titleBar}>PROFICIENCIES</div>
              <div className={contentPadding}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {proficiencies.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center p-2 border border-gray-700 rounded-sm text-xs">
                      <div className="mb-1 text-lg">{item.icon}</div>
                      <p className="text-center">{item.name}</p>
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
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className={cardFrame}
            >
              <div className={titleBar}>CERTIFICATIONS</div>
              <div className={contentPadding}>
                <div className="space-y-2">
                  {certifications.map((cert, i) => (
                    <a
                      key={i}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border border-gray-700 p-2 rounded hover:bg-gray-700 transition text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <FaCertificate className="text-gray-400" size={16} />
                        <div>
                          <p className="font-semibold">{cert.name}</p>
                          <p className="text-xs text-gray-500">{cert.date}</p>
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
        <footer className="text-gray-500 py-2 text-center text-xs">
          Last Updated: {getFormattedDate()} | Immersive Dark Bento-Style Portfolio
        </footer>
      </div>
    </div>
  );
}
