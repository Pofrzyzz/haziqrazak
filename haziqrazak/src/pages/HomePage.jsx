import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
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

/* 
  Particle configuration for subtle, free-flowing effects.
  Particles move gently in the background and repel on hover. 
*/
const particlesOptions = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "#888" },
    links: {
      color: "#555",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      random: true,
      outModes: { default: "bounce" },
    },
    number: {
      density: { enable: true, area: 800 },
      value: 45,
    },
    opacity: { value: 0.4 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

// Animate-in for card-like sections
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
};

/* Example certifications with short text. 
   You could expand these to highlight official credentials or add bullet points. */
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
  // ...
];

// Proficiencies (skills + icons)
const proficiencies = [
  { name: "Golang", icon: <SiGoland /> },
  { name: "Adobe Photoshop", icon: <SiAdobephotoshop /> },
  { name: "Flask", icon: <SiFlask /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "React", icon: <SiReact /> },
  { name: "Vite", icon: <SiVite /> },
  { name: "Python", icon: <SiPython /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  // ... add or remove as needed
];

// Helper to format date for the footer
const getFormattedDate = () => {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Initialize tsparticles
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Smooth scroll to sections
  const smoothScroll = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Dark + accent color approach
  // You can adjust these classes to refine the color palette or spacing.
  const containerBG = "bg-gradient-to-br from-gray-900 to-gray-800";
  const cardFrame = "border border-gray-700 shadow-xl rounded-lg bg-[#1c1c1e] text-gray-200";
  const titleBar = "bg-[#2c2c2e] rounded-t-lg px-4 py-3 text-lg font-bold";
  const contentPadding = "p-4 text-sm";
  const accentColor = "#2F80ED"; // Example bright blue accent

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* Main overlay with gradient */}
      <div className={`relative z-10 ${containerBG} min-h-screen`}>
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo or Name */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold text-gray-200"
            >
              HaziqRazak
            </motion.div>
            <button
              className="text-gray-200 md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-4">
              {["about-me", "education", "experience", "projects", "proficiencies", "certifications"].map(
                (id) => (
                  <motion.a
                    key={id}
                    whileHover={{ scale: 1.05 }}
                    href={`#${id}`}
                    onClick={(e) => smoothScroll(e, `#${id}`)}
                    className="text-sm text-gray-300 hover:text-gray-100 transition"
                  >
                    {id.replace("-", " ").toUpperCase()}
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Mobile Nav */}
          {menuOpen && (
            <div className="md:hidden mt-2 space-y-2">
              {["about-me", "education", "experience", "projects", "proficiencies", "certifications"].map(
                (id) => (
                  <motion.a
                    key={id}
                    whileHover={{ scale: 1.05 }}
                    href={`#${id}`}
                    onClick={(e) => smoothScroll(e, `#${id}`)}
                    className="block text-sm text-gray-300 hover:text-gray-100 transition"
                  >
                    {id.replace("-", " ").toUpperCase()}
                  </motion.a>
                )
              )}
            </div>
          )}
        </nav>

        {/* GRID LAYOUT */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ABOUT ME */}
            <motion.div
              id="about-me"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={cardFrame}
            >
              <div className={titleBar}>ABOUT ME</div>
              <div className={contentPadding}>
                {/* You could place a professional headshot here (e.g., <img src="/headshot.jpg" alt="Profile" />) */}
                <h1 className="text-xl font-extrabold mb-2">Haziq Razak</h1>
                <p className="mb-3">
                  I’m a <span className="font-semibold">19-year-old software engineer</span> and <span className="font-semibold">web developer</span> with
                  expertise in <span className="font-semibold">cloud architecture</span> and
                  <span className="font-semibold"> cloud computing</span>. Based in Singapore, I create modern, interactive, and scalable solutions.
                </p>
                <p className="mb-3">
                  Currently studying <span className="font-semibold">Information Technology at Ngee Ann Polytechnic</span>, I blend creativity with technology to design immersive experiences.
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
                  className="inline-flex items-center space-x-2 px-3 py-2 bg-[#2F80ED] hover:bg-opacity-90 text-white font-bold rounded-md transition"
                >
                  <FaDownload size={16} />
                  <span>Download Resume</span>
                </motion.a>
              </div>
            </motion.div>

            {/* EDUCATION */}
            <motion.div
              id="education"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={cardFrame}
            >
              <div className={titleBar}>EDUCATION</div>
              <div className={contentPadding}>
                <div className="border-b border-gray-700 pb-2 mb-2">
                  <h3 className="text-sm font-semibold">Ngee Ann Polytechnic</h3>
                  <p className="text-xs text-gray-400">2023–2026 | Information Technology</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    <li>ICT Society Member</li>
                    <li>Relevant Modules: Cloud Computing, Full-Stack Dev</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Unity Secondary School</h3>
                  <p className="text-xs text-gray-400">2019–2022 | O-levels</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    <li>Vice-President of Unique Media Productions</li>
                    <li>Winner of Intraschool Photography Competition</li>
                    <li>Student Role Model Award</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* EXPERIENCE */}
            <motion.div
              id="experience"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={cardFrame}
            >
              <div className={titleBar}>EXPERIENCE</div>
              <div className={contentPadding}>
                <div className="border-b border-gray-700 pb-2 mb-2">
                  <h3 className="text-sm font-semibold">OCBC Ignite Internship</h3>
                  <p className="text-xs text-gray-400">2025–2026 | Internship</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    <li>Upcoming: Focus on Cloud Deployment & Automation</li>
                    <li>Goal: Improve DevOps pipeline efficiency</li>
                  </ul>
                </div>
                <div className="border-b border-gray-700 pb-2 mb-2">
                  <h3 className="text-sm font-semibold">Photography Assistant</h3>
                  <p className="text-xs text-gray-400">2021–2022 | Freelance</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    <li>Assisted on shoots at Gardens by the Bay & Botanic Gardens</li>
                    <li>Helped organize schedules and manage gear</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Bellman</h3>
                  <p className="text-xs text-gray-400">2022–2024 | Part-Time</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    <li>Marriott Tangs Plaza Hotel, Singapore</li>
                    <li>Developed customer service & teamwork skills</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* PROJECTS */}
            <motion.div
              id="projects"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={cardFrame}
            >
              <div className={titleBar}>PROJECTS</div>
              <div className={contentPadding}>
                <div className="border-b border-gray-700 pb-2 mb-2">
                  <h3 className="text-sm font-semibold">Personal Website</h3>
                  <p className="text-xs text-gray-400">React, Next.js, Vite</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    <li>Designed modern, responsive UI</li>
                    <li>Deployed on Vercel with CI/CD</li>
                  </ul>
                  <div className="flex space-x-2 mt-2">
                    <a
                      href="https://github.com/Pofrzyzz/haziqrazak"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-xs text-gray-400 hover:underline"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://haziqrazak.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-xs text-gray-400 hover:underline"
                    >
                      <FaLink />
                      <span>Website</span>
                    </a>
                  </div>
                </div>

                <div className="border-b border-gray-700 pb-2 mb-2">
                  <h3 className="text-sm font-semibold">MyJams</h3>
                  <p className="text-xs text-gray-400">HTML, CSS, JS</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    <li>Showcases personal playlists</li>
                    <li>Experimented with front-end styling</li>
                  </ul>
                  <div className="flex space-x-2 mt-2">
                    <a
                      href="https://pofrzyzz.github.io/MyJams/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-xs text-gray-400 hover:underline"
                    >
                      <FaLink />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold">BattleShip Bot</h3>
                  <p className="text-xs text-gray-400">Python</p>
                  <ul className="list-disc list-inside mt-1 text-xs">
                    <li>Developed a Discord-based battleship game</li>
                    <li>Practiced Python OOP & API integration</li>
                  </ul>
                  <div className="flex space-x-2 mt-2">
                    <a
                      href="https://github.com/Pofrzyzz/BattleShipGame"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-xs text-gray-400 hover:underline"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PROFICIENCIES */}
            <motion.div
              id="proficiencies"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={cardFrame}
            >
              <div className={titleBar}>PROFICIENCIES</div>
              <div className={contentPadding}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {proficiencies.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center p-2 border border-gray-700 rounded text-xs hover:bg-[#2c2c2e] transition"
                    >
                      <div className="mb-1 text-lg">{item.icon}</div>
                      <p className="text-center">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CERTIFICATIONS */}
            <motion.div
              id="certifications"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
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
                      className="block border border-gray-700 p-2 rounded hover:bg-[#2c2c2e] transition text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <FaCertificate className="text-gray-400" size={14} />
                        <div>
                          <p className="font-semibold">{cert.name}</p>
                          <p className="text-gray-500">{cert.date}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="text-gray-500 py-3 text-center text-xs">
          Last Updated: {getFormattedDate()} | Modern Dark Portfolio
        </footer>
      </div>
    </div>
  );
}
