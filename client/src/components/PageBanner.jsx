import styles from "./PageBanner.module.css";

function PageBanner({ title, subtitle }) {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}

export default PageBanner;
