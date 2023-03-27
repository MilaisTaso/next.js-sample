import Link from "next/link";
import styles from "styles/logo.module.css"
export default function Logo( {boxOn} ) {
  return (
    <Link href="/" className={boxOn ? styles.box : styles.basic}>
      CURE
    </Link>
  )
}
