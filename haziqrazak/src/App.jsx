import React from "react";
import Navbar from "./components/Navbar";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaDownload,
  FaLink,
  FaCertificate,
} from "react-icons/fa";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const smoothScroll = (id) => {
  document.querySelector(id).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const getFormattedDate = () => {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
};

// Your certifications data
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

const App = () => {
  return (
    <div className="bg-[#16213E] text-gray-100 min-h-screen font-sans">
      <Navbar smoothScroll={smoothScroll} />

      {/* About Me Section */}
      <motion.section
        id="about-me"
        className="h-screen flex flex-col justify-center items-center p-6 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/background.jpg')" }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto max-w-4xl text-left">
          <div className="bg-black bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-5xl font-extrabold mb-4 text-white">Haziq Razak</h1>
            <p className="text-lg mb-4 text-gray-200 font-medium">
              I'm studying Information Technology at Ngee Ann Polytechnic in Singapore.
            </p>
            <p className="text-md mb-4 text-gray-300 font-light">
              I love watching movies and taking photos in my spare time. Some of my favorite entertainment includes
              <span className="font-semibold"> Star Wars, Spider-Man, and How I Met Your Mother.</span>
            </p>
            <p className="text-md mb-8 text-gray-300 font-light">
              My journey in photography began back in 2018, and since then, I have been passionate about capturing moments
              through my lens.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-6">
              <a href="mailto:haziqrazak14.27@gmail.com" className="hover:text-gray-400">
                <FaEnvelope size={28} />
              </a>
              <a
                href="https://github.com/Pofrzyzz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaGithub size={28} />
              </a>
              <a
                href="https://www.linkedin.com/in/haziqrazakiscool/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="https://www.instagram.com/your_instagram/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaInstagram size={28} />
              </a>
            </div>

            {/* Resume Download Button */}
            <a
              href="/resume.pdf"
              download
              className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md flex items-center space-x-2 w-fit"
            >
              <FaDownload size={20} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        className="py-20 px-6 bg-[#16213E]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto max-w-4xl text-left">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="space-y-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Ngee Ann Polytechnic</h3>
              <p className="text-gray-400">2023-2026 | Information Technology</p>
              <p className="mt-2 text-gray-300">- Participated in ICT Society</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Unity Secondary School</h3>
              <p className="text-gray-400">2019-2022 | O-levels</p>
              <p className="mt-2 text-gray-300">- Vice-President of Unique Media Productions</p>
              <p className="mt-2 text-gray-300">- OSOS Participation Award (2019-2022)</p>
              <p className="mt-2 text-gray-300">
                - Winner of Intraschool Photography Competition
              </p>
              <p className="mt-2 text-gray-300">- Student Role Model Award</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        className="py-20 px-6 bg-[#16213E]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto max-w-4xl text-left">
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
          <div className="space-y-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">OCBC Ignite Internship</h3>
              <p className="text-gray-400">2025-2026 | Internship</p>
              <p className="mt-2 text-gray-300">Upcoming Internship at OCBC ignite</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Photography Assistant</h3>
              <p className="text-gray-400">2021-2022 | Freelance</p>
              <p className="mt-2 text-gray-300">
                Helped out at professional photoshoots at Gardens by the Bay and Botanic Gardens
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Bellman</h3>
              <p className="text-gray-400">2022-2024 | Part-Time</p>
              <p className="mt-2 text-gray-300">
                Worked as a bellman/concierge at Marriott Tangs Plaza Hotel
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-20 px-6 bg-[#16213E]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto max-w-4xl text-left">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold">Personal Website</h3>
            <p className="text-sm text-gray-400">React, Next.js, Vite</p>
            <p className="mt-2 text-gray-300">My personal website</p>
            <div className="mt-3 flex space-x-4">
              <a
                href="https://github.com/Pofrzyzz/haziqrazak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center space-x-2"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>
              <a
                href="https://haziqrazak.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center space-x-2"
              >
                <FaLink size={18} />
                <span>Website</span>
              </a>
            </div>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">MyJams</h3>
            <p className="text-sm text-gray-400">HTML, CSS, JS</p>
            <p className="mt-2 text-gray-300">
              One of my first few projects. I just wanted a place to showcase all
              my playlists.
            </p>
            <div className="mt-3 flex">
              <a
                href="https://pofrzyzz.github.io/MyJams/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center space-x-2"
              >
                <FaLink size={18} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section
        id="certifications"
        className="py-20 px-6 bg-[#16213E]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto max-w-4xl text-left">
          <h2 className="text-3xl font-bold mb-8">Certifications 📜</h2>
          {certifications.map((cert, index) => (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="block bg-gray-700 p-4 rounded-lg mb-4 shadow-md flex items-center space-x-4 hover:bg-gray-600"
            >
              <FaCertificate size={28} className="text-white" />
              <div>
                <p className="text-lg font-semibold">{cert.name}</p>
                <p className="text-sm text-gray-400">{cert.date}</p>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-4 text-center bg-[#16213E]">
        <p className="text-gray-400">Last Updated: {getFormattedDate()}</p>
      </footer>
    </div>
  );
};

export default App;
