"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function Movie({ item }: { item: any }) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);

  const session = useSession();
  const userEmail = session.data?.user?.email;

  const userID = doc(db, "users", `${userEmail}`);

  async function saveShow() {
    if (userEmail) {
      setLike(!like);
      setSaved(true);
      await updateDoc(userID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please login to save a movie.");
    }
  }

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
        alt={item.title}
      ></img>
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
}

export default Movie;
