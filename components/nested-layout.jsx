import styles from "styles/nested-layout.module.css";
import Container from "components/container";
import Link from "next/link";

export default function BlueFrame({ children }) {
  return (
    <div className={styles.frame}>
      <Container>{children}</Container>
      <Link href="/blog" className={styles.sideBtn}>
        Recent Blog Posts
      </Link>
    </div>
  );
}
