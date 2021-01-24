import React from "react";
import Link from "next/link";
import { BsMoon } from "react-icons/bs";
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <Link href="/">
        <h1 className={styles.title}>Where in the world?</h1>
      </Link>
      <div>
        <BsMoon style={{ marginRight: "0.5rem" }} />
        Dark Mode
      </div>
    </div>
  );
};

export default Navbar;
