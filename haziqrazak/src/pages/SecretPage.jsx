// src/pages/SecretPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaCompactDisc,
} from "react-icons/fa";

/*
  Audio files, with Heaven by The Walkmen as first
  Place them in /public/playlist/ 
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
  const [volume, setVolume] = useState(0.02); // Start volume at 2%

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

  // 2) Fetch forum posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snap = await getDocs(collection(db, "forumPosts"));
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

  // 3) Create/update audio object when track changes
  useEffect(() => {
    if (audio) audio.pause();

    const newAudio = new Audio(songs[currentSongIndex].file);
    newAudio.volume = 0.02; // Initial 2% volume for new track
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

  // 5) Music Player Controls
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

  // 6) Add a new Guestbook post
  const handleAddPost = async () => {
    if (!newPost.trim()) return; // skip empty
    try {
      await addDoc(collection(db, "forumPosts"), {
        text: newPost,
        userId: user?.uid || "anonymous",
        createdAt: Date.now(),
      });
      setPosts((prev) => [...prev, { id: Date.now(), text: newPost }]);
      setNewPost("");
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-100 text-black font-['Tahoma','Geneva','sans-serif']">
      {/* Make layout responsive: stack on small, side-by-side on md+ */}
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Column => Retro Player + Welcome Window, stacked vertically */}
        <div className="md:w-1/3 flex flex-col p-4 space-y-4">
          {/* Retro Player Window */}
          <div className="border-4 border-gray-400">
            <div className="bg-blue-500 text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold rounded-t-md shadow-md">
              <span>RETRO PLAYER</span>
              {/* [x] leads back to homepage */}
              <Link to="/" className="text-white hover:text-red-300 font-extrabold">
                [x]
              </Link>
            </div>
            <div className="bg-gray-200 rounded-b-md shadow-md p-4">
              {/* Controls */}
              <div className="flex items-center mb-3 text-xs">
                <button onClick={handlePrev} className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded mr-1">
                  <FaBackward />
                </button>
                <button onClick={handlePlayPause} className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded mr-1">
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={handleNext} className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded mr-2">
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
              <div className="border border-gray-300 bg-white rounded p-2 text-xs">
                {songs.map((song, idx) => {
                  const isCurrent = idx === currentSongIndex;
                  return (
                    <div
                      key={song.title}
                      onClick={() => {
                        setCurrentSongIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`flex items-center px-2 py-1 mb-1 rounded cursor-pointer ${
                        isCurrent ? "bg-blue-200 font-semibold" : "hover:bg-gray-100"
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

          {/* Welcome Window */}
          <div className="border-4 border-gray-400">
            <div className="bg-blue-500 text-white px-3 py-2 flex items-center justify-between text-xs md:text-sm font-bold rounded-t-md shadow-md">
              <span>WELCOME</span>
              <Link to="/" className="text-white hover:text-red-300 font-extrabold">
                [x]
              </Link>
            </div>
            <div className="bg-gray-200 rounded-b-md shadow-md p-4 text-xs">
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

        {/* Right Column => The Guestbook */}
        <div className="md:w-2/3 flex flex-col p-4">
          <div className="bg-blue-500 text-white px-3 py-2 rounded-t-md shadow-md flex items-center justify-between text-xs md:text-sm font-bold">
            <span>THE GUESTBOOK</span>
            <Link to="/" className="text-white hover:text-red-300 font-extrabold">
              [x]
            </Link>
          </div>

          <div className="bg-gray-200 rounded-b-md shadow-md p-4 flex-grow text-xs">
            <p className="mb-2 text-right text-gray-600">
              Signed in as: <span className="font-bold">{user?.uid || "Guest"}</span>
            </p>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full p-2 text-black rounded mb-2"
              placeholder="Leave a message..."
            />
            <button
              onClick={handleAddPost}
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-1 rounded font-semibold"
            >
              Post
            </button>

            {/* Display posts */}
            <div className="mt-4 flex flex-col items-start space-y-2 overflow-y-auto pr-2">
              {posts.map((p) => {
                if (!p.text.trim()) return null;
                return (
                  <div
                    key={p.id}
                    className="bg-white border border-gray-300 px-3 py-1 rounded shadow-sm max-w-max"
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
  );
}
