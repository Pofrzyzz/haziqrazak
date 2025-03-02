import React, {
  useState,
  useEffect,
  useCallback,
  Suspense,
  Component,
} from "react";
import { Helmet } from "react-helmet"; // for basic SEO meta tags
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

/* -------------------------------------------
   1) Enhanced Particle System Configuration
   - Subtle "trail" effect + blue/cyan scheme
-------------------------------------------- */
const particlesOptions = {
  fpsLimit: 60,
  background: {
    color: "#0B0E12", // fallback background color
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "trail" },
      resize: true,
    },
    modes: {
      trail: {
        delay: 0.2,
        quantity: 5,
        pauseOnStop: true,
      },
    },
  },
  particles: {
    color: { value: ["#00FFFF", "#2F80ED"] }, // blue/cyan
    links: {
      color: "#2F80ED",
      distance: 120,
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
      value: 35,
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

/* -------------------------------------------
   2) Data & Helper Functions
-------------------------------------------- */
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
];

const proficiencies = [
  { name: "Golang", icon: <SiGoland className="text-blue-300" /> },
  { name: "Adobe Photoshop", icon: <SiAdobephotoshop className="text-blue-400" /> },
  { name: "Flask", icon: <SiFlask className="text-cyan-300" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-300" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-green-400" /> },
  { name: "React", icon: <SiReact className="text-cyan-400" /> },
  { name: "Vite", icon: <SiVite className="text-purple-300" /> },
  { name: "Python", icon: <SiPython className="text-yellow-400" /> },
  { name: "Firebase", icon: <SiFirebase className="text-yellow-300" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-300" /> },
];

// Animate-in for card sections
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
};

function getFormattedDate() {
  const today = new Date();
  return `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
}

/* -------------------------------------------
   3) Example Error Boundary
-------------------------------------------- */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-300 p-4">
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

/* -------------------------------------------
   4) Main HomePage Component
-------------------------------------------- */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Simulate a brief loading state (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll
  const smoothScroll = (e, id) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  if (isLoading) {
    // Simple loading spinner
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Helmet>
        <title>Haziq Razak - Portfolio</title>
        <meta
          name="description"
          content="Haziq Razak is a 19-year-old software engineer and web developer with cloud architecture expertise, based in Singapore."
        />
      </Helmet>

      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />

      {/* Glassmorphism Overlay (dark) */}
      <div className="relative min-h-screen w-full bg-black bg-opacity-60 backdrop-blur-sm text-gray-200">
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent backdrop-blur-md">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            HaziqRazak
          </motion.div>
          <button
            className="text-gray-200 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="hidden md:flex space-x-6">
            {["about-me", "education", "experience", "projects", "proficiencies", "certifications"].map(
              (id) => (
                <motion.a
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  href={`#${id}`}
                  onClick={(e) => smoothScroll(e, `#${id}`)}
                  className="text-sm tracking-wide hover:text-cyan-200 transition"
                >
                  {id.replace("-", " ").toUpperCase()}
                </motion.a>
              )
            )}
          </div>
        </nav>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden px-6 py-2 space-y-2 bg-black bg-opacity-70 backdrop-blur-sm">
            {["about-me", "education", "experience", "projects", "proficiencies", "certifications"].map(
              (id) => (
                <motion.a
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  href={`#${id}`}
                  onClick={(e) => smoothScroll(e, `#${id}`)}
                  className="block text-sm tracking-wide hover:text-cyan-200 transition"
                >
                  {id.replace("-", " ").toUpperCase()}
                </motion.a>
              )
            )}
          </div>
        )}

        {/* MAIN CONTENT */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ABOUT ME */}
            <motion.section
              id="about-me"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white border-opacity-5"
            >
              {/* Dynamic gradient title bar */}
              <div className="px-3 py-2 mb-3 rounded-md bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-lg font-semibold">
                ABOUT ME
              </div>
              <h1 className="text-xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Haziq Razak
              </h1>
              <p className="text-sm mb-4">
                I’m a <strong>19-year-old software engineer</strong> and <strong>web developer</strong> based in <strong>Singapore</strong>, specializing in <strong>cloud architecture</strong> and <strong>cloud computing</strong>. My goal is to design and deploy cutting-edge, scalable web solutions.
              </p>
              <p className="text-sm mb-4">
                Currently studying <strong>Information Technology at Ngee Ann Polytechnic</strong>, I’ve developed multiple full-stack applications, collaborated on agile teams, and optimized cloud resources by <strong>15%</strong> through automation.
              </p>
              <div className="flex space-x-4 mb-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="mailto:haziqrazak14.27@gmail.com"
                  className="hover:text-cyan-300 transition"
                >
                  <FaEnvelope size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://github.com/Pofrzyzz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition"
                >
                  <FaGithub size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://www.linkedin.com/in/haziqrazakiscool/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition"
                >
                  <FaLinkedin size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://www.instagram.com/pofrzcodes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition"
                >
                  <FaInstagram size={20} />
                </motion.a>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                download
                className="inline-flex items-center space-x-2 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-md transition"
              >
                <FaDownload size={16} />
                <span>Download Resume</span>
              </motion.a>
            </motion.section>

            {/* EDUCATION */}
            <motion.section
              id="education"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white border-opacity-5"
            >
              <div className="px-3 py-2 mb-3 rounded-md bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-lg font-semibold">
                EDUCATION
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-sm">Ngee Ann Polytechnic</h3>
                <p className="text-xs text-gray-300">2023–2026 | Information Technology</p>
                <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                  <li>Member, ICT Society</li>
                  <li>Relevant Modules: Cloud Computing, DevOps, Full-Stack Dev</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Unity Secondary School</h3>
                <p className="text-xs text-gray-300">2019–2022 | O-levels</p>
                <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                  <li>Vice-President, Unique Media Productions</li>
                  <li>Winner, Intraschool Photography Competition</li>
                  <li>Student Role Model Award</li>
                </ul>
              </div>
            </motion.section>

            {/* EXPERIENCE */}
            <motion.section
              id="experience"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white border-opacity-5"
            >
              <div className="px-3 py-2 mb-3 rounded-md bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-lg font-semibold">
                EXPERIENCE
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-sm">OCBC Ignite Internship</h3>
                <p className="text-xs text-gray-300">2025–2026 | Internship</p>
                <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                  <li>Focused on optimizing cloud deployments & automating CI/CD</li>
                  <li>Projected to reduce release cycle times by <strong>20%</strong></li>
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-sm">Photography Assistant</h3>
                <p className="text-xs text-gray-300">2021–2022 | Freelance</p>
                <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                  <li>Assisted with scheduling & logistics at professional shoots</li>
                  <li>Improved team workflow by <strong>10%</strong> through better organization</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Bellman, Marriott Tangs Plaza</h3>
                <p className="text-xs text-gray-300">2022–2024 | Part-Time</p>
                <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                  <li>Enhanced communication & customer service skills</li>
                  <li>Recognized for consistent positive guest feedback</li>
                </ul>
              </div>
            </motion.section>

            {/* PROJECTS */}
            <motion.section
              id="projects"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white border-opacity-5"
            >
              <div className="px-3 py-2 mb-3 rounded-md bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-lg font-semibold">
                PROJECTS
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-sm">Personal Website</h3>
                <p className="text-xs text-gray-300">React, Next.js, Vite</p>
                <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                  <li>Responsive design with modern UI & CI/CD pipeline</li>
                  <li>Over <strong>1,000</strong> site visits in first month</li>
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
                    <FaLink />
                    <span>Website</span>
                  </a>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-sm">MyJams</h3>
                <p className="text-xs text-gray-300">HTML, CSS, JS</p>
                <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                  <li>Showcases personal playlists</li>
                  <li>Experimented with custom audio player design</li>
                </ul>
                <div className="flex space-x-2 mt-2">
                  <a
                    href="https://pofrzyzz.github.io/MyJams/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-xs text-gray-300 hover:underline"
                  >
                    <FaLink />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">BattleShip Bot</h3>
                <p className="text-xs text-gray-300">Python</p>
                <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                  <li>Discord-based game bot with OOP approach</li>
                  <li>Learned Docker-based deployment & basic containerization</li>
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
            </motion.section>

            {/* PROFICIENCIES */}
            <motion.section
              id="proficiencies"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white border-opacity-5"
            >
              <div className="px-3 py-2 mb-3 rounded-md bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-lg font-semibold">
                PROFICIENCIES
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {proficiencies.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-2 border border-white border-opacity-10 rounded hover:bg-white hover:bg-opacity-5 transition text-xs"
                  >
                    <div className="mb-1 text-lg">{item.icon}</div>
                    <p className="text-center">{item.name}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* CERTIFICATIONS */}
            <motion.section
              id="certifications"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white border-opacity-5"
            >
              <div className="px-3 py-2 mb-3 rounded-md bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-lg font-semibold">
                CERTIFICATIONS
              </div>
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <a
                    key={i}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-white border-opacity-10 p-2 rounded hover:bg-white hover:bg-opacity-5 transition text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <FaCertificate className="text-blue-300" size={16} />
                      <div>
                        <p className="font-semibold">{cert.name}</p>
                        <p className="text-gray-400">{cert.date}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="text-gray-400 py-4 text-center text-xs">
          Last Updated: {getFormattedDate()} | Glassmorphism & Gradient Theme
        </footer>
      </div>
    </ErrorBoundary>
  );
}
