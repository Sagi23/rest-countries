import React from "react";
import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.grid}>
        <Link href="/">
          <h1 className={styles.title}>Where in the world?</h1>
        </Link>
        <div>
          <a
            href="https://github.com/Sagi23"
            target="_blank"
            rel="noopener noreffer"
          >
            <AiOutlineGithub size={40} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
