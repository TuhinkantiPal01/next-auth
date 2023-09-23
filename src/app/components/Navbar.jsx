import Link from "next/link";
import React from "react";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-between px-5 py-4 bg-black text-white">
      <ul className="flex gap-x-4 justify-center items-center ">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
      </ul>
      <p>Display Name : {user && user?.displayName}</p>
      <ul>
        {!user ? (
          <li className="cursor-pointer" onClick={handleSignIn}>
            Login
          </li>
        ) : (
          <li className="cursor-pointer" onClick={handleLogOut}>
            LogOut
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
