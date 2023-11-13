"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import NavBar from "../components/NavBar";
import SavedShows from "../components/SavedShows";

function Account() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  return (
    <>
      <NavBar />
      <div className="w-full text-white">
        <img
          className="w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/85e22987-d2dd-46ca-b8b7-65cd0e31c24a/629ae878-26a7-4d88-b12b-af5018a1f7b2/US-en-20201123-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]" />
        <div className="absolute top-[20%] p-4 md:p-8">
          <div className="text-white text-bold py-5">
            Account: {session?.data?.user?.email}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
}

Account.requireAuth = true;

export default Account;
