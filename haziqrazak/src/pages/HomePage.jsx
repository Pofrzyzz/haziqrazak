import React, { useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaDownload,
  FaCertificate,
  FaAws,
  FaHtml5,
  FaCss3,
  FaExternalLinkAlt, // for external links
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
  1) Golden Particles on a black background
  - Color: #FFD700 or #DAA520 for gold dust effect
*/
const particlesOptions = {
  fpsLimit: 60,
  background: { color: "#000000" }, // black background
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      repulse: { distance: 80, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "#FFD700" }, // gold dust color
    links: {
      color: "#FFD700",
      distance: 120,
      enable: true,
      opacity: 0.25,
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

/* 2) Certifications & Proficiencies */
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
  {
    name: "C#",
    icon: <span className="font-bold text-lg text-blue-500">C#</span>,
  },
  { name: "Python", icon: <SiPython /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  {
    name: "SQL Server Management Studio",
    icon: <span className="font-bold text-lg text-yellow-500">SSMS</span>,
  },
];

/* 3) Card Animations */
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

/* 4) Footer Date Helper */
const getFormattedDate = () => {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
};

export default function HomePage() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen w-full font-sans bg-black text-gray-100 overflow-hidden">
      {/* Golden Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      {/* Title at the top */}
      <div className="pt-2 pb-2 text-center">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-3xl md:text-4xl font-extrabold tracking-wide"
        >
          HaziqRazak
        </motion.h1>
      </div>

      {/* MAIN GRID */}
      <div className="container mx-auto px-2 pb-4">
        {/* ROW 1: About Me (single column, no blank side columns) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="bg-[#1a1a1a] bg-opacity-90 rounded-lg shadow-lg border border-gray-700 p-4 mb-4"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">
            About Me
          </h2>
          <p className="text-sm md:text-base mb-3 text-center leading-tight">
            I’m a <strong>19-year-old software engineer</strong> and{" "}
            <strong>web developer</strong> based in <strong>Singapore</strong>,
            specializing in <strong>cloud architecture</strong> and{" "}
            <strong>cloud computing</strong>. I love creating modern, 
            interactive experiences that scale globally.
          </p>
          <p className="text-sm md:text-base mb-4 text-center leading-tight">
            Currently studying <strong>Information Technology</strong> at Ngee
            Ann Polytechnic, I’ve worked on multiple full-stack applications,
            leading to a <strong>20% improvement</strong> in deployment
            efficiency through cloud automation.
          </p>
          <div className="flex justify-center space-x-4 mb-3">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="mailto:haziqrazak14.27@gmail.com"
              className="hover:text-gray-400"
            >
              <FaEnvelope size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://github.com/Pofrzyzz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://www.linkedin.com/in/haziqrazakiscool/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://www.instagram.com/pofrzcodes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaInstagram size={20} />
            </motion.a>
          </div>
          <div className="text-center">
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
          </div>
        </motion.div>

        {/* ROW 2: Education & Experience (2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
          {/* Education */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1a1a1a] bg-opacity-90 rounded-lg shadow-lg border border-gray-700 p-4"
          >
            <h2 className="text-lg md:text-xl font-bold mb-2">Education</h2>
            <div className="mb-3">
              <h3 className="font-semibold text-sm">Ngee Ann Polytechnic</h3>
              <p className="text-xs text-gray-400">2023–2026 | IT</p>
              <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                <li>Member, ICT Society</li>
                <li>Focus on Cloud & Full-Stack Dev</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Unity Secondary School</h3>
              <p className="text-xs text-gray-400">2019–2022 | O-levels</p>
              <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                <li>Vice-President, Unique Media Productions</li>
                <li>Student Role Model Award</li>
                <li>Winner, Photography Competition</li>
              </ul>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1a1a1a] bg-opacity-90 rounded-lg shadow-lg border border-gray-700 p-4"
          >
            <h2 className="text-lg md:text-xl font-bold mb-2">Experience</h2>
            <div className="mb-3">
              <h3 className="font-semibold text-sm">OCBC Ignite Internship</h3>
              <p className="text-xs text-gray-400">2025–2026 | Internship</p>
              <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                <li>Optimized cloud deployments & CI/CD</li>
                <li>Reduced release cycle times by 20%</li>
              </ul>
            </div>
            <div className="mb-3">
              <h3 className="font-semibold text-sm">Photography Assistant</h3>
              <p className="text-xs text-gray-400">2021–2022 | Freelance</p>
              <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                <li>Scheduled & organized professional shoots</li>
                <li>Improved team workflow by 10%</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm">
                Bellman, Marriott Tangs Plaza
              </h3>
              <p className="text-xs text-gray-400">2022–2024 | Part-Time</p>
              <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                <li>Enhanced customer service & communication skills</li>
                <li>Positive guest feedback recognition</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ROW 3: Projects (single column) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="bg-[#1a1a1a] bg-opacity-90 rounded-lg shadow-lg border border-gray-700 p-4 mb-4"
        >
          <h2 className="text-lg md:text-xl font-bold mb-2">Projects</h2>
          <div className="mb-3">
            <h3 className="font-semibold text-sm">Personal Website</h3>
            <p className="text-xs text-gray-400">React, Next.js, Vite</p>
            <ul className="list-disc list-inside mt-1 text-xs space-y-1">
              <li>Modern UI & CI/CD pipeline on Vercel</li>
              <li>Over 1,000 site visits in first month</li>
            </ul>
            <div className="flex space-x-2 mt-2">
              <a
                href="https://github.com/Pofrzyzz/haziqrazak"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-gray-300 hover:underline"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a
                href="https://haziqrazak.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-gray-300 hover:underline"
              >
                <FaExternalLinkAlt />
                <span>Website</span>
              </a>
            </div>
          </div>
          <div className="mb-3">
            <h3 className="font-semibold text-sm">MyJams</h3>
            <p className="text-xs text-gray-400">HTML, CSS, JS</p>
            <ul className="list-disc list-inside mt-1 text-xs space-y-1">
              <li>Showcases personal playlists</li>
              <li>Experimented with custom audio player</li>
            </ul>
            <div className="flex space-x-2 mt-2">
              <a
                href="https://pofrzyzz.github.io/MyJams/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-gray-300 hover:underline"
              >
                <FaExternalLinkAlt />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">BattleShip Bot</h3>
            <p className="text-xs text-gray-400">Python</p>
            <ul className="list-disc list-inside mt-1 text-xs space-y-1">
              <li>Discord-based game with OOP approach</li>
              <li>Learned containerization basics</li>
            </ul>
            <div className="flex space-x-2 mt-2">
              <a
                href="https://github.com/Pofrzyzz/BattleShipGame"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-gray-300 hover:underline"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ROW 4: Proficiencies & Certifications (2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1a1a1a] bg-opacity-90 rounded-lg shadow-lg border border-gray-700 p-4"
          >
            <h2 className="text-lg md:text-xl font-bold mb-3">Proficiencies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {proficiencies.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-2 border border-gray-700 rounded text-xs hover:bg-gray-700 transition"
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-center">{item.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1a1a1a] bg-opacity-90 rounded-lg shadow-lg border border-gray-700 p-4"
          >
            <h2 className="text-lg md:text-xl font-bold mb-3">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <a
                  key={i}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-gray-700 p-2 rounded hover:bg-gray-700 transition text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <FaCertificate className="text-yellow-400" />
                    <div>
                      <p className="font-semibold">{cert.name}</p>
                      <p className="text-gray-400 text-xs">{cert.date}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-gray-400 py-2 text-xs">
        Last Updated: {getFormattedDate()} | Black & Gold Particles Theme
      </footer>
    </div>
  );
}
