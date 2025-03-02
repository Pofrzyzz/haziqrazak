import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function SecretPage() {
  const [user, setUser] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Anonymous auth
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

  // Audio effect: create/update audio on track change
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

  // Design variables
  const containerBG = "bg-animate bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900";
  const cardFrame = "border border-blue-700 shadow-2xl rounded-xl bg-gray-900 text-gray-100";
  const headerStyle = "bg-blue-800 rounded-t-xl px-6 py-4 text-2xl font-bold";
  const contentStyle = "p-6 text-xl";

  return (
    <div className={`min-h-screen w-full ${containerBG} font-sans`}>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8" initial="hidden" animate="visible" variants={sectionVariants}>
        {/* Audio Player Card */}
        <motion.div className={cardFrame} whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}>
          <div className={headerStyle}>
            AUDIO PLAYER
            <Link to="/" className="float-right text-gray-100 hover:text-yellow-300 font-bold">
              [Close]
            </Link>
          </div>
          <div className={contentStyle}>
            <div className="flex items-center space-x-4 mb-4">
              <button onClick={handlePrev} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                <FaBackward size={24} />
              </button>
              <button onClick={handlePlayPause} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
              </button>
              <button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                <FaForward size={24} />
              </button>
              <div className="flex items-center space-x-2">
                <FaVolumeUp size={24} />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>
            <div className="border border-blue-700 p-4 rounded">
              {songs.map((song, idx) => {
                const isCurrent = idx === currentSongIndex;
                return (
                  <div
                    key={song.title}
                    onClick={() => {
                      setCurrentSongIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`flex items-center px-4 py-2 mb-2 cursor-pointer rounded ${
                      isCurrent ? "bg-blue-700 font-semibold" : "hover:bg-gray-800"
                    }`}
                  >
                    {isCurrent ? (
                      <FaCompactDisc className="animate-spin mr-3 text-blue-300" size={28} />
                    ) : (
                      <FaCompactDisc className="mr-3 text-gray-400" size={28} />
                    )}
                    <span>{song.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Guestbook Card */}
        <motion.div className={cardFrame} whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}>
          <div className={headerStyle}>
            GUESTBOOK
            <Link to="/" className="float-right text-gray-100 hover:text-yellow-300 font-bold">
              [Close]
            </Link>
          </div>
          <div className={contentStyle + " flex flex-col"}>
            <p className="mb-4 text-right text-gray-300">
              Signed in as: <span className="font-bold">{user?.uid || "Guest"}</span>
            </p>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full p-4 text-gray-900 mb-4 rounded"
              placeholder="Leave a message..."
            />
            <button
              onClick={handleAddPost}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold rounded"
            >
              Post
            </button>
            <div className="mt-6 space-y-4 overflow-y-auto max-h-64">
              {posts.map((p) => {
                if (!p.text.trim()) return null;
                return (
                  <div
                    key={p.id}
                    className="bg-gray-100 border border-blue-700 px-4 py-3 rounded text-gray-900"
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
  );
}
