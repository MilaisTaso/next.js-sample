import { useState } from "react";
import Link from "next/link";
import styles from "styles/nav.module.css";

export default function Nav() {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggleNav = () => {
    setNavIsOpen((prev) => !prev);
  };

  const closeNav = () => {
    setNavIsOpen(false);
  };
  return (
    <nav className={navIsOpen ? styles.open : styles.close}>
      {navIsOpen && (
        <styles jsx global>
          {`
          @media (max-width: 767px) {
            body {
              overflow: hidden;
              position: fixed;
              width: 100%;
            }
          }
        `}{" "}
        </styles>
      )}
      <button className={styles.btn} onClick={toggleNav}>
        <span className={styles.bar}></span>
        <span className="sr-only"></span>
      </button>
      <ul className={styles.list}>
        <li>
          <Link href="/" onClick={closeNav}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={closeNav}>
            About
          </Link>
        </li>
        <li>
          <Link href="/blog" onClick={closeNav}>
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
