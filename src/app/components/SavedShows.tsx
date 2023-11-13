import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSession } from "next-auth/react";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { AiOutlineClose } from "react-icons/ai";

function SavedShows() {
  const [movies, setMovies] = useState([]);

  const session = useSession();
  const userEmail = session.data?.user?.email;

  useEffect(() => {
    onSnapshot(doc(db, "users", `${userEmail}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [userEmail]);

  const deleteShow = async (movieID: any) => {
    try {
      const movieRef = doc(db, "users", `${userEmail}`);
      const newList = movies.filter((item: any) => item.id !== movieID);
      await updateDoc(movieRef, {
        savedShows: newList,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft + 500;
  };

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          size={40}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity:100 cursor-pointer z-10 hidden group-hover:block"
          onClick={slideLeft}
        />

        <div
          id="slider"
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies &&
            movies.map((item: any, id) => (
              <div
                key={id}
                className="w-[160px] sm:w-[200px] md:w-[240px] lg:[280px] inline-block cursor-pointer relative p-2"
              >
                <img
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/w500/${item.img}`}
                  alt={item.title}
                ></img>
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 text-white">
                  <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {item.title}
                  </p>
                  <p
                    className="absolute text-gary-300 top-4 right-4"
                    onClick={() => deleteShow(item.id)}
                  >
                    <AiOutlineClose />
                  </p>
                </div>
              </div>
            ))}
        </div>

        <MdChevronRight
          size={40}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity:100 cursor-pointer z-10 hidden group-hover:block"
          onClick={slideRight}
        />
      </div>
    </div>
  );
}

export default SavedShows;
