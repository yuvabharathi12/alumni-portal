import { useState, useEffect } from "react";
import styles from "./ImageCarousel.module.css";

function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length === 0 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={styles.track}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image) => (
          <div key={image._id} className={styles.slide}>
            <img src={image.imageUrl} alt={image.title} className={styles.slideImage} />
            <div className={styles.slideOverlay}>
              <h3 className={styles.slideTitle}>{image.title}</h3>
              {image.description && (
                <p className={styles.slideDescription}>{image.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={goToPrevious} className={`${styles.navBtn} ${styles.prevBtn}`}>
        ‹
      </button>
      <button onClick={goToNext} className={`${styles.navBtn} ${styles.nextBtn}`}>
        ›
      </button>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${styles.dot} ${currentIndex === index ? styles.dotActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;