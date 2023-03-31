import styles from "styles/post-categories.module.css"
import Link from "next/link"

export default function postCategories({ categories }) {
  return (
    <ul className={styles.list}>
      {categories.map((name, slug) => (
        <li key={slug}>
        <Link href={`/blog/category/${slug}`}>
          <a>{name}</a>
        </Link>
        </li>
      ))}
    </ul>
  )
}
