import styles from "styles/hero.module.css";
import cube from "images/cube.jpg";
import Image from "next/image";
export default function Hero({ title, subtitle, imageOn = false }) {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      {imageOn && (
        <figure>
          <Image
            src={cube}
            width={576}
            height={499}
            alt=""
            sizes="(min-width: 1152px) 576px, (min-width: 768) 50vw, 100vw"
            style={{ width: "100%", height: "auto" }}
            priority
            placeholder="blur"
          />
        </figure>
      )}
    </div>
  );
}
