// src/pages/SecretPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaCompactDisc,
} from "react-icons/fa";

/*
  Audio files in /public/playlist/
  - Heaven ~ The Walkmen first
  - Volume=0.02 for initial
*/
const songs = [
  { title: "Heaven ~ The Walkmen", file: "/playlist/heaven.mp3" },
  { title: "Adventure of a Lifetime ~ Coldplay", file: "/playlist/adventureofalifetime.mp3" },
  { title: "Let Me Love You ~ Justin Bieber", file: "/playlist/letmeloveyou.mp3" },
  { title: "Mirrors ~ Justin Timberlake", file: "/playlist/mirrors.mp3" },
  { title: "Something About You ~ Eyedress & Dent May", file: "/playlist/somethingaboutyou.mp3" },
];

export default function SecretPage() {
  const [user, setUser] = useState(null);

  // Music player states
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(0.02); // Start at 2% volume

  // Guestbook (forum) states
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // 1) Anonymous Auth
  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth).catch(console.error);
    onAuthStateChanged(auth, (usr) => {
      if (usr) setUser(usr);
    });
  }, []);

  // 2) Fetch forum posts (newest first)
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

  // 3) Create/update audio when track changes
  useEffect(() => {
    if (audio) audio.pause();
    const newAudio = new Audio(songs[currentSongIndex].file);
    newAudio.volume = 0.02;
    setAudio(newAudio);

    if (isPlaying) {
      newAudio.play().catch((err) => console.warn("Auto-play blocked:", err));
    }

    return () => {
      newAudio.pause();
      newAudio.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIndex]);

  // 4) Keep volume in sync
  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume, audio]);

  // 5) Music controls
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
    setCurrentSongIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
    setIsPlaying(true);
  };

  // 6) Add new post
  const handleAddPost = async () => {
    if (!newPost.trim()) return; // skip empty
    try {
      await addDoc(collection(db, "forumPosts"), {
        text: newPost,
        userId: user?.uid || "anonymous",
        createdAt: Date.now(),
      });
      // Insert at top of local array
      setPosts((prev) => [{ id: Date.now(), text: newPost }, ...prev]);
      setNewPost("");
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-black font-['MS_Sans_Serif','Tahoma','Geneva','sans-serif']"
      style={{ backgroundImage: "url('/bliss.jpg')" }} // place bliss.jpg in /public
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* LEFT COLUMN => Retro Player + Welcome (XP style, no rounding) */}
        <div className="md:w-1/3 flex flex-col p-4 space-y-4">
          {/* RETRO PLAYER (no rounding, single shade of blue #507ACF) */}
          <div className="border-4 border-[#507ACF]">
            <div className="bg-[#507ACF] text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold shadow-md">
              <span>RETRO PLAYER</span>
              <Link to="/" className="text-white hover:text-yellow-200 font-extrabold">
                [x]
              </Link>
            </div>
            <div className="bg-[#ECE9D8] shadow-md p-4 text-xs md:text-sm">
              {/* Controls */}
              <div className="flex items-center mb-3">
                <button
                  onClick={handlePrev}
                  className="bg-gray-300 hover:bg-gray-400 px-2 py-1 mr-1"
                >
                  <FaBackward />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="bg-gray-300 hover:bg-gray-400 px-2 py-1 mr-1"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  onClick={handleNext}
                  className="bg-gray-300 hover:bg-gray-400 px-2 py-1 mr-2"
                >
                  <FaForward />
                </button>
                {/* Volume */}
                <div className="flex items-center space-x-1">
                  <FaVolumeUp />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-16 md:w-20"
                  />
                </div>
              </div>

              {/* Playlist */}
              <div className="border border-gray-300 p-2 text-xs">
                {songs.map((song, idx) => {
                  const isCurrent = idx === currentSongIndex;
                  return (
                    <div
                      key={song.title}
                      onClick={() => {
                        setCurrentSongIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`flex items-center px-2 py-1 mb-1 cursor-pointer ${
                        isCurrent
                          ? "bg-blue-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {isCurrent ? (
                        <FaCompactDisc className="animate-spin mr-2 text-blue-600" />
                      ) : (
                        <FaCompactDisc className="mr-2 text-gray-400" />
                      )}
                      <span>{song.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* WELCOME WINDOW (no rounding) */}
          <div className="border-4 border-[#507ACF]">
            <div className="bg-[#507ACF] text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold shadow-md">
              <span>WELCOME</span>
              <Link to="/" className="text-white hover:text-yellow-200 font-extrabold">
                [x]
              </Link>
            </div>
            <div className="bg-[#ECE9D8] shadow-md p-4 text-xs md:text-sm">
              <p className="mb-2 text-gray-700">
                Hello There! Leave a comment and be remembered forever. Assign a
                name or don’t! Take your time here to either leave something
                behind or explore people’s stories!
              </p>
              <p className="text-gray-700">
                The choice is yours. Make your mark or just enjoy the vibe.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN => THE GUESTBOOK (no rounding, newest first) */}
        <div className="md:w-2/3 flex flex-col p-4">
          <div className="border-4 border-[#507ACF]">
            <div className="bg-[#507ACF] text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold shadow-md">
              <span>THE GUESTBOOK</span>
              <Link to="/" className="text-white hover:text-yellow-200 font-extrabold">
                [x]
              </Link>
            </div>
            <div className="bg-[#ECE9D8] shadow-md p-4 text-xs md:text-sm flex-grow">
              <p className="mb-2 text-right text-gray-600">
                Signed in as: <span className="font-bold">{user?.uid || "Guest"}</span>
              </p>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full p-2 text-black mb-2"
                placeholder="Leave a message..."
              />
              <button
                onClick={handleAddPost}
                className="bg-[#507ACF] hover:bg-[#3B63A8] text-white px-4 py-1 font-semibold"
              >
                Post
              </button>

              <div className="mt-4 flex flex-col items-start space-y-2 overflow-y-auto pr-2">
                {posts.map((p) => {
                  if (!p.text.trim()) return null;
                  return (
                    <div
                      key={p.id}
                      className="bg-white border border-gray-300 px-3 py-1 
                                 text-xs md:text-sm max-w-max"
                      style={{ wordWrap: "break-word" }}
                    >
                      {p.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
