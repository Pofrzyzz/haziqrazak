import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaDownload } from "react-icons/fa";

/* 1) Star-like particles config (increased count, bright color) */
const particlesOptions = {
  background: { color: "#00000000" }, // transparent to show background image
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      repulse: { distance: 120, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "#dddddd" },
    links: {
      color: "#aaaaaa",
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
      value: 80, // increased count
    },
    opacity: { value: 0.4 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

/* 2) The five boxes on the right side (title + content). */
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
        </div>
        <div className="mb-3">
          <h4 className="font-semibold text-base">MyJams</h4>
          <p className="text-sm text-gray-300">HTML, CSS, JS</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Showcases personal playlists</li>
            <li>Experimented with custom audio player</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-base">BattleShip Bot</h4>
          <p className="text-sm text-gray-300">Python</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Discord-based game with OOP approach</li>
            <li>Learned containerization basics</li>
          </ul>
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
        <p className="text-sm text-gray-300">
          Golang, Adobe Photoshop, Flask, SQL, AWS, JavaScript, Node, React, Vite,
          HTML, CSS, C#, Python, Firebase, MongoDB, SSMS
        </p>
      </>
    ),
  },
  {
    id: "certifications",
    title: "Certifications",
    content: (
      <>
        <h3 className="text-xl font-bold mb-2">Certifications</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>
            <strong>Professional Scrum Master™ I (PSM I)</strong> ‑ May 2024
          </li>
          <li>
            <strong>Go (Basic)</strong> ‑ HackerRank
          </li>
          <li>
            <strong>SQL (Basic)</strong> ‑ HackerRank
          </li>
          <li>
            <strong>SQL (Intermediate)</strong> ‑ HackerRank
          </li>
          <li>
            <strong>Python (Basic)</strong> ‑ HackerRank
          </li>
          <li>
            <strong>C# (Basic)</strong> ‑ HackerRank
          </li>
        </ul>
      </>
    ),
  },
];

/* 3) Card & popup animation variants */
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

/* For the 3D transform near the cursor, we compute rotateX/rotateY from the cursor. */
const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (cursorPos) => {
    // Example 3D tilt based on screen center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const rotateX = (centerY - cursorPos.clientY) / 30;
    const rotateY = (cursorPos.clientX - centerX) / 30;
    return {
      opacity: 1,
      scale: 1,
      // position the box near the clicked area
      x: cursorPos.x,
      y: cursorPos.y,
      rotateX,
      rotateY,
      transition: { duration: 0.4 },
    };
  },
};

/* 4) Helper: date for footer */
function getFormattedDate() {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
}

export default function HomePage() {
  const [selectedBox, setSelectedBox] = useState(null); // which box is open
  const [cursorPos, setCursorPos] = useState({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
  });

  // For star-like particles
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // When user clicks a box => store location
  const handleBoxClick = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // e.clientX, e.clientY => mouse coords relative to viewport
    // We offset the pop-up slightly
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
      className="flex flex-col min-h-screen text-gray-100"
      style={{
        backgroundImage: "url('/space-bg.jpg')", // your space-themed image in /public
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Star-like Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      {/* Top "HaziqRazak" bar */}
      <div className="bg-black bg-opacity-60 backdrop-blur-sm px-4 py-3 z-20">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-3xl md:text-4xl font-extrabold tracking-wide"
        >
          HaziqRazak
        </motion.h1>
      </div>

      {/* Main content => center vertically & horizontally */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        {/* 2 columns => left = About Me (bigger), right = 5 boxes (stacked) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          {/* LEFT => ABOUT ME */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-black bg-opacity-70 rounded-lg shadow-lg border border-gray-700 p-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">About Me</h2>
            <p className="text-base md:text-lg mb-3 leading-relaxed">
              I’m a <strong>19-year-old software engineer</strong> and{" "}
              <strong>web developer</strong> based in <strong>Singapore</strong>,
              specializing in <strong>cloud architecture</strong> and{" "}
              <strong>cloud computing</strong>. I love creating modern,
              interactive experiences that scale globally.
            </p>
            <p className="text-base md:text-lg mb-4 leading-relaxed">
              Currently studying <strong>Information Technology</strong> at Ngee
              Ann Polytechnic, I’ve worked on multiple full-stack applications,
              leading to a <strong>20% improvement</strong> in deployment
              efficiency through cloud automation.
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

          {/* RIGHT => 5 boxes in a vertical stack */}
          <div className="grid grid-rows-5 gap-4">
            {boxesData.map((box) => (
              <motion.div
                key={box.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={(e) => handleBoxClick(box.id, e)}
                className="bg-black bg-opacity-70 rounded-lg shadow-md border border-gray-700 p-5 cursor-pointer hover:bg-opacity-80 transition"
              >
                <h2 className="text-xl font-bold mb-1">{box.title}</h2>
                <p className="text-sm text-gray-300">Click to see more...</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* POP-UP => 3D transform near cursor */}
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
              className="bg-[#1a1a1a] bg-opacity-90 text-gray-100 max-w-md w-full p-6 rounded-lg shadow-xl border border-gray-700 relative cursor-auto"
              custom={cursorPos}
              variants={popupVariants}
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
        Last Updated: {getFormattedDate()} | Centered Layout + 3D Pop-Ups
      </footer>
    </div>
  );
}
