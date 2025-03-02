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

/* 1) Minimal star-like config in front of black hole image */
const particlesOptions = {
  background: { color: "#00000000" }, // Transparent so the image behind shows
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
    color: { value: "#aaaaaa" },
    links: {
      color: "#666666",
      distance: 120,
      enable: true,
      opacity: 0.2,
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
      value: 30,
    },
    opacity: { value: 0.3 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

/* 2) Example boxes data (except About Me). Each has a 'title' and 'content'. */
const boxesData = [
  {
    id: "education",
    title: "Education",
    content: (
      <>
        <h3 className="text-lg font-bold mb-2">Education</h3>
        <div className="mb-3">
          <h4 className="font-semibold text-base">Ngee Ann Polytechnic</h4>
          <p className="text-sm text-gray-400">2023–2026 | IT</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Member, ICT Society</li>
            <li>Focus on Cloud & Full-Stack Dev</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-base">Unity Secondary School</h4>
          <p className="text-sm text-gray-400">2019–2022 | O-levels</p>
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
        <h3 className="text-lg font-bold mb-2">Experience</h3>
        <div className="mb-3">
          <h4 className="font-semibold text-base">OCBC Ignite Internship</h4>
          <p className="text-sm text-gray-400">2025–2026 | Internship</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Optimized cloud deployments & automated CI/CD</li>
            <li>Reduced release cycle times by 20%</li>
          </ul>
        </div>
        <div className="mb-3">
          <h4 className="font-semibold text-base">Photography Assistant</h4>
          <p className="text-sm text-gray-400">2021–2022 | Freelance</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Scheduled & organized professional shoots</li>
            <li>Improved team workflow by 10%</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-base">Bellman, Marriott Tangs Plaza</h4>
          <p className="text-sm text-gray-400">2022–2024 | Part-Time</p>
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
        <h3 className="text-lg font-bold mb-2">Projects</h3>
        <div className="mb-3">
          <h4 className="font-semibold text-base">Personal Website</h4>
          <p className="text-sm text-gray-400">React, Next.js, Vite</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Modern UI & CI/CD pipeline on Vercel</li>
            <li>Over 1,000 site visits in first month</li>
          </ul>
        </div>
        <div className="mb-3">
          <h4 className="font-semibold text-base">MyJams</h4>
          <p className="text-sm text-gray-400">HTML, CSS, JS</p>
          <ul className="list-disc list-inside mt-1 text-sm space-y-1">
            <li>Showcases personal playlists</li>
            <li>Experimented with custom audio player</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-base">BattleShip Bot</h4>
          <p className="text-sm text-gray-400">Python</p>
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
        <h3 className="text-lg font-bold mb-2">Proficiencies</h3>
        <p className="text-sm text-gray-300 mb-2">Golang, Adobe Photoshop, Flask, SQL, AWS, JavaScript, Node, React, Vite, HTML, CSS, C#, Python, Firebase, MongoDB, SSMS</p>
      </>
    ),
  },
  {
    id: "certifications",
    title: "Certifications",
    content: (
      <>
        <h3 className="text-lg font-bold mb-2">Certifications</h3>
        <ul className="space-y-2">
          <li>
            <span className="font-semibold">Professional Scrum Master™ I (PSM I)</span> - May 2024
          </li>
          <li>
            <span className="font-semibold">Go (Basic)</span> - HackerRank
          </li>
          <li>
            <span className="font-semibold">SQL (Basic)</span> - HackerRank
          </li>
          <li>
            <span className="font-semibold">SQL (Intermediate)</span> - HackerRank
          </li>
          <li>
            <span className="font-semibold">Python (Basic)</span> - HackerRank
          </li>
          <li>
            <span className="font-semibold">C# (Basic)</span> - HackerRank
          </li>
        </ul>
      </>
    ),
  },
];

/* 3) Basic fade/scale variants for each card & pop-up */
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

/* Pop-up variants that incorporate 3D transform near the cursor */
const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (cursorPos) => ({
    opacity: 1,
    scale: 1,
    x: cursorPos.x,
    y: cursorPos.y,
    rotateX: 0,
    rotateY: 0,
    transition: { duration: 0.4 },
  }),
};

/* 4) Helper: Footer date */
function getFormattedDate() {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
}

export default function HomePage() {
  const [selectedBox, setSelectedBox] = useState(null); // which box is open
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleBoxClick = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // We'll offset pop-up by half of its size for a better effect, but let's keep it simple
    setCursorPos({
      x: e.clientX - rect.left - 100,
      y: e.clientY - rect.top - 100,
    });
    setSelectedBox(id);
  };

  // Particles init
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full text-gray-100 font-sans overflow-hidden"
      style={{
        backgroundImage: "url('/blackhole-bg.jpg')", // place your black hole/nebula image in /public
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Minimal star-like particles in front of the image */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      {/* Title at the top (like in your reference screenshot) */}
      <div className="px-4 py-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-3xl md:text-4xl font-extrabold tracking-wide"
        >
          HaziqRazak
        </motion.h1>
      </div>

      {/* BENTO-STYLE LAYOUT: 6 boxes => 1 center (About Me) + 5 around it */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* We place About Me in the center => row 1 col 2 */}
          <div className="hidden md:block" />
          {/* ABOUT ME => center */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-black bg-opacity-70 rounded-lg shadow-lg border border-gray-700 p-6"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-3">About Me</h2>
            <p className="text-base mb-3 leading-snug">
              I’m a <strong>19-year-old software engineer</strong> and{" "}
              <strong>web developer</strong> based in <strong>Singapore</strong>,
              specializing in <strong>cloud architecture</strong> and{" "}
              <strong>cloud computing</strong>. I love creating modern,
              interactive experiences that scale globally.
            </p>
            <p className="text-base mb-4 leading-snug">
              Currently studying <strong>Information Technology</strong> at Ngee
              Ann Polytechnic, I’ve worked on multiple full-stack applications,
              leading to a <strong>20% improvement</strong> in deployment
              efficiency through cloud automation.
            </p>
            <div className="flex space-x-3 mb-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="mailto:haziqrazak14.27@gmail.com"
                className="hover:text-gray-400"
              >
                <FaEnvelope size={22} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/Pofrzyzz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaGithub size={22} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/in/haziqrazakiscool/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaLinkedin size={22} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.instagram.com/pofrzcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaInstagram size={22} />
              </motion.a>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition"
            >
              <FaDownload size={16} />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>
          <div className="hidden md:block" />
        </div>

        {/* Next row => 5 boxes around the center => we can do row2 col 1-3 and row3 col 1-3, 
            but let's keep it simple: 2 rows, 3 columns total = 6 spots 
            Spot(1,1) => Education
            Spot(1,2) => Experience
            Spot(1,3) => Projects
            Spot(2,1) => Proficiencies
            Spot(2,2) => Certifications
            Spot(2,3) => (blank) or we can skip
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {boxesData.slice(0, 3).map((box) => (
            <motion.div
              key={box.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={(e) => handleBoxClick(box.id, e)}
              className="bg-black bg-opacity-70 rounded-lg shadow-lg border border-gray-700 p-5 cursor-pointer hover:bg-opacity-80 transition"
            >
              <h2 className="text-xl font-bold">{box.title}</h2>
              <p className="text-sm text-gray-400 mt-1">Click to see more...</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {boxesData.slice(3).map((box) => (
            <motion.div
              key={box.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={(e) => handleBoxClick(box.id, e)}
              className="bg-black bg-opacity-70 rounded-lg shadow-lg border border-gray-700 p-5 cursor-pointer hover:bg-opacity-80 transition"
            >
              <h2 className="text-xl font-bold">{box.title}</h2>
              <p className="text-sm text-gray-400 mt-1">Click to see more...</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* POP-UP OVERLAY */}
      <AnimatePresence>
        {selectedBox && (
          <motion.div
            key="overlay"
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedBox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* We find the selected box content */}
            <motion.div
              key="popup"
              className="bg-[#1c1c1e] text-gray-100 max-w-md w-full p-6 rounded-lg shadow-xl border border-gray-700 relative cursor-auto"
              custom={cursorPos}
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // so we don't close on inside click
            >
              {boxesData.find((b) => b.id === selectedBox)?.content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="text-center text-gray-300 py-2 text-xs bg-black bg-opacity-50 backdrop-blur-sm">
        Last Updated: {getFormattedDate()} | 6 Boxes + Nebula/Black Hole Background
      </footer>
    </div>
  );
}
