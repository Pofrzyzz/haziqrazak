import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
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

  // Modern design variables
  const containerBG = "bg-animate bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900";
  const cardFrame = "border border-blue-700 shadow-2xl rounded-xl";
  const headerBG = "bg-blue-800";
  const headerText = "text-gray-100";
  const bodyBG = "bg-gray-900";
  const bodyText = "text-gray-100";

  return (
    <div className={`min-h-screen ${containerBG} text-gray-100 font-sans`}>
      <motion.div className="flex flex-col md:flex-row" initial="hidden" animate="visible" variants={sectionVariants}>
        {/* LEFT COLUMN - Audio Player & Welcome */}
        <div className="md:w-1/3 p-4 space-y-6">
          <motion.div whileHover={{ scale: 1.02 }} className={cardFrame}>
            <div className={`${headerBG} ${headerText} px-6 py-4 flex items-center justify-between rounded-t-xl`}>
              <span className="text-2xl font-bold">AUDIO PLAYER</span>
              <Link to="/" className="text-gray-100 hover:text-yellow-300 font-bold">
                [Close]
              </Link>
            </div>
            <div className={`${bodyBG} ${bodyText} p-6`}>
              <div className="flex items-center space-x-4 mb-4">
                <button onClick={handlePrev} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                  <FaBackward size={20} />
                </button>
                <button onClick={handlePlayPause} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>
                <button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                  <FaForward size={20} />
                </button>
                <div className="flex items-center space-x-2">
                  <FaVolumeUp size={20} />
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
                        <FaCompactDisc className="animate-spin mr-3 text-blue-300" size={24} />
                      ) : (
                        <FaCompactDisc className="mr-3 text-gray-400" size={24} />
                      )}
                      <span className="text-xl">{song.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className={cardFrame}>
            <div className={`${headerBG} ${headerText} px-6 py-4 flex items-center justify-between rounded-t-xl`}>
              <span className="text-2xl font-bold">WELCOME</span>
              <Link to="/" className="text-gray-100 hover:text-yellow-300 font-bold">
                [Close]
              </Link>
            </div>
            <div className={`${bodyBG} ${bodyText} p-6`}>
              <p className="mb-4 text-xl">
                Hello there! Leave a comment and be remembered forever. Whether you assign a name or not, take a moment to share your story.
              </p>
              <p className="text-xl">
                The choice is yours—make your mark or simply enjoy the vibe.
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Guestbook */}
        <div className="md:w-2/3 p-4">
          <motion.div whileHover={{ scale: 1.02 }} className={cardFrame}>
            <div className={`${headerBG} ${headerText} px-6 py-4 flex items-center justify-between rounded-t-xl`}>
              <span className="text-2xl font-bold">GUESTBOOK</span>
              <Link to="/" className="text-gray-100 hover:text-yellow-300 font-bold">
                [Close]
              </Link>
            </div>
            <div className={`${bodyBG} ${bodyText} p-6 flex flex-col`}>
              <p className="mb-4 text-right text-gray-300 text-xl">
                Signed in as: <span className="font-bold">{user?.uid || "Guest"}</span>
              </p>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full p-4 text-gray-900 mb-4 rounded text-xl"
                placeholder="Leave a message..."
              />
              <button
                onClick={handleAddPost}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold rounded text-xl"
              >
                Post
              </button>
              <div className="mt-6 space-y-4 overflow-y-auto max-h-64 pr-2">
                {posts.map((p) => {
                  if (!p.text.trim()) return null;
                  return (
                    <div
                      key={p.id}
                      className="bg-gray-100 border border-blue-700 px-4 py-3 rounded text-gray-900 text-xl"
                      style={{ wordWrap: "break-word" }}
                    >
                      {p.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
