import React from "react";
import styles from "./Table.module.css";

export const Table = ({ children }) => {
  return <table className={styles.transactions_table}>{children}</table>;
};
