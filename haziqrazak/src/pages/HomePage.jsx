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

/* 1) Gold-on-black particle configuration */
const particlesOptions = {
  background: { color: "#000000" },
  fpsLimit: 60,
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
    color: { value: "#FFD700" },
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
      value: 40,
    },
    opacity: { value: 0.4 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

/* 2) Card Data: certifications & proficiencies */
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

/* 3) Card animation variants */
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

/* 4) Footer date helper */
function getFormattedDate() {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
}

export default function HomePage() {
  // Initialize full tsparticles
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-gray-100 font-sans overflow-hidden">
      {/* Gold Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      {/* BENTO-STYLE GRID: 2 rows x 3 columns = 6 cards */}
      <main className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1) ABOUT ME (with HaziqRazak top-left in the heading bar) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1c1c1e] rounded-lg shadow-lg border border-gray-700"
          >
            {/* Colored heading bar with "HaziqRazak" top-left, "ABOUT ME" text to the right */}
            <div className="flex items-center justify-between bg-blue-700 text-white px-4 py-2 rounded-t-lg">
              <span className="text-lg md:text-xl font-extrabold">
                HaziqRazak
              </span>
              <span className="text-sm md:text-base font-semibold">
                ABOUT ME
              </span>
            </div>

            {/* Card body */}
            <div className="p-4">
              <p className="text-sm md:text-base mb-3 leading-snug">
                I’m a <strong>19-year-old software engineer</strong> and{" "}
                <strong>web developer</strong> based in <strong>Singapore</strong>,
                specializing in <strong>cloud architecture</strong> and{" "}
                <strong>cloud computing</strong>. I love creating modern,
                interactive experiences that scale globally.
              </p>
              <p className="text-sm md:text-base mb-4 leading-snug">
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
            </div>
          </motion.div>

          {/* 2) EDUCATION */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1c1c1e] rounded-lg shadow-lg border border-gray-700"
          >
            <div className="bg-purple-700 text-white px-4 py-2 rounded-t-lg flex items-center">
              <span className="text-sm md:text-base font-semibold">EDUCATION</span>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-sm md:text-base">
                  Ngee Ann Polytechnic
                </h3>
                <p className="text-xs text-gray-400">2023–2026 | IT</p>
                <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                  <li>Member, ICT Society</li>
                  <li>Focus on Cloud & Full-Stack Dev</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">
                  Unity Secondary School
                </h3>
                <p className="text-xs text-gray-400">2019–2022 | O-levels</p>
                <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                  <li>Vice-President, Unique Media Productions</li>
                  <li>Student Role Model Award</li>
                  <li>Winner, Photography Competition</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* 3) EXPERIENCE */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1c1c1e] rounded-lg shadow-lg border border-gray-700"
          >
            <div className="bg-red-700 text-white px-4 py-2 rounded-t-lg flex items-center">
              <span className="text-sm md:text-base font-semibold">EXPERIENCE</span>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-sm md:text-base">
                  OCBC Ignite Internship
                </h3>
                <p className="text-xs text-gray-400">2025–2026 | Internship</p>
                <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                  <li>Optimized cloud deployments & automated CI/CD</li>
                  <li>Reduced release cycle times by 20%</li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-sm md:text-base">
                  Photography Assistant
                </h3>
                <p className="text-xs text-gray-400">2021–2022 | Freelance</p>
                <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                  <li>Scheduled & organized professional shoots</li>
                  <li>Improved team workflow by 10%</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">
                  Bellman, Marriott Tangs Plaza
                </h3>
                <p className="text-xs text-gray-400">2022–2024 | Part-Time</p>
                <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                  <li>Enhanced customer service & communication skills</li>
                  <li>Positive guest feedback recognition</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* 4) PROJECTS */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1c1c1e] rounded-lg shadow-lg border border-gray-700"
          >
            <div className="bg-green-700 text-white px-4 py-2 rounded-t-lg flex items-center">
              <span className="text-sm md:text-base font-semibold">PROJECTS</span>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-sm md:text-base">
                  Personal Website
                </h3>
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
              <div className="mb-4">
                <h3 className="font-semibold text-sm md:text-base">MyJams</h3>
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
                <h3 className="font-semibold text-sm md:text-base">
                  BattleShip Bot
                </h3>
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
            </div>
          </motion.div>

          {/* 5) PROFICIENCIES */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1c1c1e] rounded-lg shadow-lg border border-gray-700"
          >
            <div className="bg-yellow-600 text-white px-4 py-2 rounded-t-lg flex items-center">
              <span className="text-sm md:text-base font-semibold">
                PROFICIENCIES
              </span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
            </div>
          </motion.div>

          {/* 6) CERTIFICATIONS */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1c1c1e] rounded-lg shadow-lg border border-gray-700"
          >
            <div className="bg-indigo-700 text-white px-4 py-2 rounded-t-lg flex items-center">
              <span className="text-sm md:text-base font-semibold">
                CERTIFICATIONS
              </span>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <a
                    key={i}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-gray-700 p-3 rounded hover:bg-gray-700 transition text-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <FaCertificate className="text-blue-300" />
                      <div>
                        <p className="font-semibold">{cert.name}</p>
                        <p className="text-gray-400 text-xs">{cert.date}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-gray-400 py-2 text-xs">
        Last Updated: {getFormattedDate()} | Bento-Style with Gold Particles
      </footer>
    </div>
  );
}
