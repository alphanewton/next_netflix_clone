import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
function NavBar() {
  const session = useSession();
  console.log(session.data?.user?.email);
  return (
    <div className="flex justify-between items-center p-4 z-[100] w-full absolute">
      <Link href="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      {session.data?.user?.email ? (
        <div>
          <button className="text-white pr-4">
            <Link href="/account">Account</Link>
          </button>
          <button
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button className="text-white pr-4">
            <Link href="/signin">Sign In</Link>
          </button>
          <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
            <Link href="/signup">Sign Up</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
