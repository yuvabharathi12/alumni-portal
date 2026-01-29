import { useState, useEffect } from "react";
import { colors } from "../styles/theme";

function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (images.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Images */}
      <div
        style={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * 100}%)`,
          height: "100%",
        }}
      >
        {images.map((image) => (
          <div
            key={image._id}
            style={{
              minWidth: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Overlay with title */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                padding: "30px 20px 20px",
                color: colors.white,
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>
                {image.title}
              </h3>
              {image.description && (
                <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
                  {image.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        style={{
          position: "absolute",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: colors.white,
          border: "none",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(0,0,0,0.8)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(0,0,0,0.5)";
        }}
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: colors.white,
          border: "none",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(0,0,0,0.8)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(0,0,0,0.5)";
        }}
      >
        ›
      </button>

      {/* Dots Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: currentIndex === index ? "24px" : "12px",
              height: "12px",
              borderRadius: "6px",
              border: "none",
              background:
                currentIndex === index
                  ? colors.white
                  : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;