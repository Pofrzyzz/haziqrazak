import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export default function SecretPage() {
  const [user, setUser] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth).catch(console.error);
    onAuthStateChanged(auth, (usr) => {
      if (usr) setUser(usr);
    });
  }, []);

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

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
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
  const containerBG = "bg-gradient-to-br from-gray-800 to-blue-900";
  const cardFrame = "border border-blue-700 shadow-lg rounded-lg";
  const headerBG = "bg-blue-800";
  const headerText = "text-gray-100";
  const bodyBG = "bg-gray-900";
  const bodyText = "text-gray-100";

  return (
    <div className={`min-h-screen ${containerBG} text-gray-100 font-sans`}>
      <div className="flex flex-col md:flex-row">
        {/* LEFT COLUMN - Audio Player & Welcome */}
        <div className="md:w-1/3 p-4 space-y-4">
          <div className={cardFrame}>
            <div className={`${headerBG} ${headerText} px-4 py-3 flex items-center justify-between`}>
              <span className="text-lg font-bold">AUDIO PLAYER</span>
              <Link to="/" className="text-gray-100 hover:text-yellow-300 font-bold">
                [Close]
              </Link>
            </div>
            <div className={`${bodyBG} ${bodyText} p-4`}>
              <div className="flex items-center space-x-3 mb-4">
                <button onClick={handlePrev} className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded">
                  <FaBackward />
                </button>
                <button onClick={handlePlayPause} className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded">
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded">
                  <FaForward />
                </button>
                <div className="flex items-center space-x-2">
                  <FaVolumeUp />
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
                      className={`flex items-center px-3 py-2 mb-2 cursor-pointer rounded ${
                        isCurrent ? "bg-blue-700 font-semibold" : "hover:bg-gray-800"
                      }`}
                    >
                      {isCurrent ? (
                        <FaCompactDisc className="animate-spin mr-2 text-blue-300" />
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
          <div className={cardFrame}>
            <div className={`${headerBG} ${headerText} px-4 py-3 flex items-center justify-between`}>
              <span className="text-lg font-bold">WELCOME</span>
              <Link to="/" className="text-gray-100 hover:text-yellow-300 font-bold">
                [Close]
              </Link>
            </div>
            <div className={`${bodyBG} ${bodyText} p-4`}>
              <p className="mb-2">
                Hello There! Leave a comment and be remembered forever. Assign a name or don’t! Take your time here to either leave something behind or explore people’s stories!
              </p>
              <p>
                The choice is yours. Make your mark or just enjoy the vibe.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Guestbook */}
        <div className="md:w-2/3 p-4">
          <div className={cardFrame}>
            <div className={`${headerBG} ${headerText} px-4 py-3 flex items-center justify-between`}>
              <span className="text-lg font-bold">GUESTBOOK</span>
              <Link to="/" className="text-gray-100 hover:text-yellow-300 font-bold">
                [Close]
              </Link>
            </div>
            <div className={`${bodyBG} ${bodyText} p-4 flex flex-col`}>
              <p className="mb-4 text-right text-gray-300">
                Signed in as: <span className="font-bold">{user?.uid || "Guest"}</span>
              </p>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full p-3 text-gray-900 mb-4 rounded"
                placeholder="Leave a message..."
              />
              <button
                onClick={handleAddPost}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold rounded"
              >
                Post
              </button>
              <div className="mt-4 space-y-3 overflow-y-auto max-h-64 pr-2">
                {posts.map((p) => {
                  if (!p.text.trim()) return null;
                  return (
                    <div
                      key={p.id}
                      className="bg-gray-100 border border-blue-700 px-3 py-2 rounded text-gray-900 text-lg"
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
