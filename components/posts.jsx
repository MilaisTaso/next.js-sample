import styles from "styles/posts.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Posts({ posts }) {
  console.log(posts.eyecatch);
  return (
    <div className={styles.gridContainer}>
      {posts.map(({ title, slug, eyecatch }) => (
        <article className={styles.post} key={slug}>
          <Link href={`/blog/${slug}`}>
            <figure>
              <Image
                src={eyecatch.url}
                alt=""
                fill
                sizes="(min-Width: 1152px) 576px, 50vw)"
                style={{ objectFit: "cover" }}
                blurDataURL={eyecatch.blurDataURL}
              />
            </figure>
            <h2>{title}</h2>
          </Link>
        </article>
      ))}
    </div>
  );
}
