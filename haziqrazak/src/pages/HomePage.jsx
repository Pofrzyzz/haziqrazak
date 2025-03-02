import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaDownload,
  FaCertificate,
  FaExternalLinkAlt,
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

/* =========================
   1) Particle Configuration 
   (Monochrome star field)
========================= */
const particlesOptions = {
  background: { color: "#00000000" }, // Transparent
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
    color: { value: "#dddddd" },
    links: {
      color: "#999999",
      distance: 120,
      enable: true,
      opacity: 0.25,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.2,
      random: true,
      outModes: { default: "bounce" },
    },
    number: {
      density: { enable: true, area: 800 },
      value: 80,
    },
    opacity: { value: 0.4 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

/* =========================
   2) Boxes Data (5 Right-Side Boxes)
========================= */
const boxesData = [
  {
    id: "education",
    title: "Education",
    content: (
      <>
        <h3 className="text-xl font-bold mb-2">Education</h3>
        <div className="mb-3">
          <h4 className="font-semibold text-base">Ngee Ann Polytechnic</h4>
          <p className="text-sm text-gray-300">2023–2026 | IT</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Member, ICT Society</li>
            <li>Focus on Cloud & Full-Stack Dev</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-base">Unity Secondary School</h4>
          <p className="text-sm text-gray-300">2019–2022 | O-levels</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Vice-President, Unique Media Productions</li>
            <li>Student Role Model Award</li>
            <li>Winner, Photography Competition</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "experience",
    title: "Experience",
    content: (
      <>
        <h3 className="text-xl font-bold mb-2">Experience</h3>
        <div className="mb-3">
          <h4 className="font-semibold text-base">OCBC Ignite Internship</h4>
          <p className="text-sm text-gray-300">2025–2026 | Internship</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Optimized cloud deployments & automated CI/CD</li>
            <li>Reduced release cycle times by 20%</li>
          </ul>
        </div>
        <div className="mb-3">
          <h4 className="font-semibold text-base">Photography Assistant</h4>
          <p className="text-sm text-gray-300">2021–2022 | Freelance</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Scheduled & organized professional shoots</li>
            <li>Improved team workflow by 10%</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-base">Bellman, Marriott Tangs Plaza</h4>
          <p className="text-sm text-gray-300">2022–2024 | Part-Time</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Enhanced customer service & communication skills</li>
            <li>Positive guest feedback recognition</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "projects",
    title: "Projects",
    content: (
      <>
        <h3 className="text-xl font-bold mb-2">Projects</h3>
        <div className="mb-3">
          <h4 className="font-semibold text-base">Personal Website</h4>
          <p className="text-sm text-gray-300">React, Next.js, Vite</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Modern UI & CI/CD pipeline on Vercel</li>
            <li>Over 1,000 site visits in first month</li>
          </ul>
          <div className="flex space-x-2 mt-2">
            <a
              href="https://github.com/Pofrzyzz/haziqrazak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-gray-300 hover:underline"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a
              href="https://haziqrazak.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-gray-300 hover:underline"
            >
              <FaExternalLinkAlt />
              <span>Website</span>
            </a>
          </div>
        </div>
        <div className="mb-3">
          <h4 className="font-semibold text-base">MyJams</h4>
          <p className="text-sm text-gray-300">HTML, CSS, JS</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Showcases personal playlists</li>
            <li>Experimented with custom audio player</li>
          </ul>
          <div className="flex space-x-2 mt-2">
            <a
              href="https://pofrzyzz.github.io/MyJams/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-gray-300 hover:underline"
            >
              <FaExternalLinkAlt />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-base">BattleShip Bot</h4>
          <p className="text-sm text-gray-300">Python</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Discord-based game with OOP approach</li>
            <li>Learned containerization basics</li>
          </ul>
          <div className="flex space-x-2 mt-2">
            <a
              href="https://github.com/Pofrzyzz/BattleShipGame"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-gray-300 hover:underline"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "proficiencies",
    title: "Proficiencies",
    content: (
      <>
        <h3 className="text-xl font-bold mb-2">Proficiencies</h3>
        <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
          <li>Golang</li>
          <li>Adobe Photoshop</li>
          <li>Flask</li>
          <li>SQL</li>
          <li>AWS</li>
          <li>JavaScript</li>
          <li>Node</li>
          <li>React</li>
          <li>Vite</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>C#</li>
          <li>Python</li>
          <li>Firebase</li>
          <li>MongoDB</li>
          <li>SSMS</li>
        </ul>
      </>
    ),
  },
  {
    id: "certifications",
    title: "Certifications",
    content: (
      <>
        <h3 className="text-xl font-bold mb-2">Certifications</h3>
        <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
          <li>
            <a
              href="https://www.credly.com/badges/19628356-d1c2-4f2f-9383-4c0139acc829/linked_in_profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Professional Scrum Master™ I (PSM I)
            </a>{" "}
            ‑ May 2024
          </li>
          <li>
            <a
              href="https://www.hackerrank.com/certificates/9b49f85d5336"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Go (Basic)
            </a>{" "}
            ‑ HackerRank
          </li>
          <li>
            <a
              href="https://www.hackerrank.com/certificates/iframe/f1e17d3784cf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              SQL (Basic)
            </a>{" "}
            ‑ HackerRank
          </li>
          <li>
            <a
              href="https://www.hackerrank.com/certificates/iframe/b6787b9fb5a0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              SQL (Intermediate)
            </a>{" "}
            ‑ HackerRank
          </li>
          <li>
            <a
              href="https://www.hackerrank.com/certificates/508683d4132a"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Python (Basic)
            </a>{" "}
            ‑ HackerRank
          </li>
          <li>
            <a
              href="https://www.hackerrank.com/certificates/f856ffdf6442"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              C# (Basic)
            </a>{" "}
            ‑ HackerRank
          </li>
        </ul>
      </>
    ),
  },
];

/* -------------------------------
   7) Animation Variants
------------------------------- */
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

/* -------------------------------
   8) Footer Date Helper
------------------------------- */
function getFormattedDate() {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
}

/* -------------------------------
   9) Main Component
------------------------------- */
export default function HomePage() {
  const [selectedBox, setSelectedBox] = useState(null); // which box is open
  const [cursorPos, setCursorPos] = useState({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
  });
  const [tiltStyle, setTiltStyle] = useState({});

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Global tilt effect for the grid & modal based on cursor position
  const handleMouseMove = (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const rotateX = (centerY - e.clientY) / 50;
    const rotateY = (e.clientX - centerX) / 50;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  // When a right-side box is clicked, compute pop-up position
  const handleBoxClick = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left - 100,
      y: e.clientY - rect.top - 100,
      clientX: e.clientX,
      clientY: e.clientY,
    });
    setSelectedBox(id);
  };

  return (
    <div
      className="relative min-h-screen w-full text-gray-100 font-sans overflow-hidden"
      style={{
        backgroundImage: "url('/space-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Star-like Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      {/* Top Bar with "HaziqRazak" (static) */}
      <div className="bg-black bg-opacity-60 backdrop-blur-sm px-4 py-3 z-20">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
          HaziqRazak
        </h1>
      </div>

      {/* Main Layout: Centered grid with tilt effect applied globally */}
      <div
        className="flex-1 flex items-center justify-center relative z-10 px-4"
        style={tiltStyle}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          {/* LEFT COLUMN: About Me (with tilt effect) */}
          <motion.div
            onMouseMove={handleMouseMove}
            style={tiltStyle}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            className="bg-black bg-opacity-70 rounded-lg shadow-lg border border-gray-600 p-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">About Me</h2>
            <p className="text-base md:text-lg mb-4 leading-relaxed">
              I’m a <strong>19-year-old</strong> student from{" "}
              <strong>Singapore</strong>. I study Information Technology at Ngee Ann
              Polytechnic.
            </p>
            <div className="flex space-x-4 mb-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="mailto:haziqrazak14.27@gmail.com"
                className="hover:text-gray-300"
              >
                <FaEnvelope size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/Pofrzyzz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/in/haziqrazakiscool/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.instagram.com/pofrzcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaInstagram size={24} />
              </motion.a>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="inline-flex items-center space-x-2 px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition"
            >
              <FaDownload size={18} />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>

          {/* RIGHT COLUMN: 5 Boxes */}
          <div className="grid grid-rows-5 gap-4">
            {boxesData.map((box) => (
              <motion.div
                key={box.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{ scale: 1.02 }}
                onClick={(e) => handleBoxClick(box.id, e)}
                className="bg-black bg-opacity-70 rounded-lg shadow-md border border-gray-600 p-5 cursor-pointer hover:bg-opacity-80 transition"
              >
                <h2 className="text-xl font-bold mb-1">{box.title}</h2>
                <p className="text-sm text-gray-300">Click to see more...</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* POP-UP MODAL with same global tilt effect */}
      <AnimatePresence>
        {selectedBox && (
          <motion.div
            key="overlay"
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedBox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key="popup"
              onMouseMove={handleMouseMove}
              style={tiltStyle}
              className="bg-[#1a1a1a] bg-opacity-80 text-gray-100 max-w-md w-full p-6 rounded-lg shadow-xl border border-gray-700 relative cursor-auto"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {boxesData.find((b) => b.id === selectedBox)?.content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="text-center text-gray-300 py-2 text-xs bg-black bg-opacity-60 backdrop-blur-sm">
        Last Updated: {getFormattedDate()} | Monochrome Space Theme with Global 3D Transform
      </footer>
    </div>
  );
}
