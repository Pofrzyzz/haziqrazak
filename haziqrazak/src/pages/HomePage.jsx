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
} from "react-icons/fa";

/* 1) Star-like particle config, increased count (80) & slightly brighter (#dddddd). */
const particlesOptions = {
  background: {
    color: "#00000000", // transparent to show the background image
  },
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
    color: { value: "#dddddd" }, // brighter star color
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
      value: 80, // increased particle count
    },
    opacity: { value: 0.4 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

/* 2) The 5 boxes on the right. Each has a title & content for the pop-up. */
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

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (cursorPos) => ({
    opacity: 1,
    scale: 1,
    x: cursorPos.x,
    y: cursorPos.y,
    transition: { duration: 0.4 },
  }),
};

/* 4) Footer date helper */
function getFormattedDate() {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
}

export default function HomePage() {
  const [selectedBox, setSelectedBox] = useState(null); // which box is open
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Handle box click => open pop-up near cursor
  const handleBoxClick = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left - 100,
      y: e.clientY - rect.top - 100,
    });
    setSelectedBox(id);
  };

  return (
    <div
      className="relative min-h-screen w-full text-gray-100 font-sans overflow-hidden"
      style={{
        backgroundImage: "url('/space-bg.jpg')", // Put your cosmic/nebula image in /public
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

      {/* TOP => "HaziqRazak" */}
      <div className="px-4 py-4 bg-black bg-opacity-60 backdrop-blur-sm">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-3xl md:text-4xl font-extrabold tracking-wide"
        >
          HaziqRazak
        </motion.h1>
      </div>

      {/* LAYOUT: 
          - Left col => About Me (bigger)
          - Right col => 5 smaller boxes
      */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT => About Me (bigger) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-black bg-opacity-70 rounded-lg shadow-lg border border-gray-600 p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">About Me</h2>
          <p className="text-base md:text-lg mb-3 leading-relaxed">
            I’m a <strong>19-year-old software engineer</strong> and{" "}
            <strong>web developer</strong> based in <strong>Singapore</strong>,
            specializing in <strong>cloud architecture</strong> and{" "}
            <strong>cloud computing</strong>. I love creating modern, interactive
            experiences that scale globally.
          </p>
          <p className="text-base md:text-lg mb-4 leading-relaxed">
            Currently studying <strong>Information Technology</strong> at Ngee Ann
            Polytechnic, I’ve worked on multiple full-stack applications, leading
            to a <strong>20% improvement</strong> in deployment efficiency through
            cloud automation.
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

        {/* RIGHT => 5 smaller boxes in a vertical stack */}
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
              className="bg-black bg-opacity-70 rounded-lg shadow-md border border-gray-600 p-4 cursor-pointer hover:bg-opacity-80 transition"
            >
              <h2 className="text-xl font-bold mb-1">{box.title}</h2>
              <p className="text-sm text-gray-300">Click to see more...</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* POP-UP Overlays */}
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
              className="bg-[#1a1a1a] bg-opacity-90 text-gray-100 max-w-md w-full p-6 rounded-lg shadow-xl border border-gray-600 relative cursor-auto"
              custom={cursorPos}
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // avoid closing on inside click
            >
              {boxesData.find((b) => b.id === selectedBox)?.content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="text-center text-gray-300 py-2 text-xs bg-black bg-opacity-60 backdrop-blur-sm">
        Last Updated: {getFormattedDate()} | Monochrome Space Theme
      </footer>
    </div>
  );
}
