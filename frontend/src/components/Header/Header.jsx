import React from "react";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.container}>
      <img className={styles.logo} src="./GA.png" alt="header logo" />
    </header>
  );
};
