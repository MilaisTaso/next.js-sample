import styles from "styles/posts.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Posts({posts}) {
  console.log(posts.eyecatch);
  return (
    <div className={styles.gridContainer}>
    {posts.map(({title, slug, eyecatch}) => (
      <article className={styles.post} key={slug}>
        <Link href={`/blog/${slug}`}>
          <Image src={eyecatch.url}
           alt=""
           width={eyecatch.width}
           height={eyecatch.height}
           blurDataURL={eyecatch.blurDataURL}
           />
          <h2>{title}</h2>
        </Link>
      </article>
    ))}
    </div>
    )
}
