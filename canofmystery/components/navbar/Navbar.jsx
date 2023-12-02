import React from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className="w-screen px-14 bg-neutral-200">
      <div className="navbar">
        <div className="navbar-start flex flex-1">
          <a className="text-2xl font-black text-base-300">Can of Mystery</a>
        </div>
        <div className="navbar-center justify-center flex flex-1">
          <ul className="menu menu-horizontal px-1">
            <li><a className="text-base-300 text-l">Home</a></li>
            <li><details><summary className="text-base-300  text-l">Explore</summary>
              <ul className="p-2 bg-neutral-200 tracking-widest text-base-300 text-l">
              <li><a>Our Articles</a></li>
              <li><a>USCA</a></li>
              <li><a>Citation Guide</a></li>
              </ul></details></li>
            <li><a className="text-base-300 text-l">About</a></li>
          </ul>
        </div>
        <div className="navbar-end flex flex-1">
          <a className="btn btn-outline bg-neutral-200 hover:bg-neutral-200 hover:text-base-300 hover:border-base-300 border-4 text-base-300 text-l">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
