import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaCompactDisc,
} from "react-icons/fa";

const songs = [
  { title: "Heaven ~ The Walkmen", file: "/playlist/heaven.mp3" },
  { title: "Adventure of a Lifetime ~ Coldplay", file: "/playlist/adventureofalifetime.mp3" },
  { title: "Let Me Love You ~ Justin Bieber", file: "/playlist/letmeloveyou.mp3" },
  { title: "Mirrors ~ Justin Timberlake", file: "/playlist/mirrors.mp3" },
  { title: "Something About You ~ Eyedress & Dent May", file: "/playlist/somethingaboutyou.mp3" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function SecretPage() {
  const [user, setUser] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Particle configuration (same as HomePage)
  const particlesOptions = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    particles: {
      color: { value: "#888888" },
      links: { color: "#555555", distance: 150, enable: true, opacity: 0.3, width: 1 },
      move: { enable: true, speed: 1, random: true, outModes: { default: "bounce" } },
      number: { density: { enable: true, area: 800 }, value: 50 },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Anonymous Auth
  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth).catch(console.error);
    onAuthStateChanged(auth, (usr) => {
      if (usr) setUser(usr);
    });
  }, []);

  // Fetch forum posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "forumPosts"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const loaded = snap.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
        }));
        setPosts(loaded);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  // Update audio on track change
  useEffect(() => {
    if (audio) audio.pause();
    const newAudio = new Audio(songs[currentSongIndex].file);
    newAudio.volume = volume;
    setAudio(newAudio);
    if (isPlaying) {
      newAudio.play().catch((err) => console.warn("Auto-play blocked:", err));
    }
    return () => {
      newAudio.pause();
      newAudio.src = "";
    };
  }, [currentSongIndex]);

  // Keep volume in sync
  useEffect(() => {
    if (audio) audio.volume = volume;
  }, [volume, audio]);

  const handlePlayPause = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.warn("Play failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (audio) audio.pause();
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (audio) audio.pause();
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleAddPost = async () => {
    if (!newPost.trim()) return;
    try {
      await addDoc(collection(db, "forumPosts"), {
        text: newPost,
        userId: user?.uid || "anonymous",
        createdAt: Date.now(),
      });
      setPosts((prev) => [{ id: Date.now(), text: newPost }, ...prev]);
      setNewPost("");
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  // Dark theme design variables
  const containerBG = "bg-gradient-to-br from-gray-900 to-black";
  const cardFrame = "border border-gray-700 shadow-xl rounded-lg bg-gray-800 text-gray-300";
  const headerStyle = "bg-gray-700 rounded-t-lg px-4 py-3 text-base font-bold";
  const contentStyle = "p-4 text-xs";

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      <Particles
        id="tsparticles-secret"
        init={particlesInit}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className={`relative z-10 ${containerBG} min-h-screen`}>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6" initial="hidden" animate="visible" variants={sectionVariants}>
          {/* Audio Player Card */}
          <motion.div className={cardFrame} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
            <div className={headerStyle}>
              AUDIO PLAYER
              <Link to="/" className="float-right text-gray-300 hover:text-gray-100 font-bold">
                [Close]
              </Link>
            </div>
            <div className={contentStyle}>
              <div className="flex items-center space-x-3 mb-3">
                <button onClick={handlePrev} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded">
                  <FaBackward size={16} />
                </button>
                <button onClick={handlePlayPause} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded">
                  {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                </button>
                <button onClick={handleNext} className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded">
                  <FaForward size={16} />
                </button>
                <div className="flex items-center space-x-1">
                  <FaVolumeUp size={16} />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-16"
                  />
                </div>
              </div>
              <div className="border border-gray-700 p-2 rounded">
                {songs.map((song, idx) => {
                  const isCurrent = idx === currentSongIndex;
                  return (
                    <div
                      key={song.title}
                      onClick={() => {
                        setCurrentSongIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`flex items-center px-2 py-1 mb-1 cursor-pointer rounded ${isCurrent ? "bg-gray-700 font-semibold" : "hover:bg-gray-600"}`}
                    >
                      {isCurrent ? (
                        <FaCompactDisc className="animate-spin mr-2 text-gray-400" size={16} />
                      ) : (
                        <FaCompactDisc className="mr-2 text-gray-600" size={16} />
                      )}
                      <span>{song.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Guestbook Card */}
          <motion.div className={cardFrame} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
            <div className={headerStyle}>
              GUESTBOOK
              <Link to="/" className="float-right text-gray-300 hover:text-gray-100 font-bold">
                [Close]
              </Link>
            </div>
            <div className={contentStyle + " flex flex-col"}>
              <p className="mb-2 text-right text-gray-500">
                Signed in as: <span className="font-bold">{user?.uid || "Guest"}</span>
              </p>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full p-2 text-gray-900 mb-2 rounded"
                placeholder="Leave a message..."
              />
              <button
                onClick={handleAddPost}
                className="bg-gray-600 hover:bg-gray-500 text-gray-100 px-3 py-1 font-semibold rounded"
              >
                Post
              </button>
              <div className="mt-3 space-y-2 overflow-y-auto max-h-48">
                {posts.map((p) => {
                  if (!p.text.trim()) return null;
                  return (
                    <div
                      key={p.id}
                      className="bg-gray-200 border border-gray-700 px-2 py-1 rounded text-gray-900 text-xs"
                      style={{ wordWrap: "break-word" }}
                    >
                      {p.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
