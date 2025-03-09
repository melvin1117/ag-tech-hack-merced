import React, { useState } from "react";

interface ImageCarouselProps {
  images: Array<{ path: string; value: number }>;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!images || images.length === 0) return null;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      {/* The main image */}
      <img
        src={`http://localhost:8000/${images[currentIndex].path}`}
        alt={`Insight ${currentIndex + 1}`}
        className="w-full object-fill rounded shadow"
        style={{ height: "500px", objectFit: "fill" }}
      />

      {/* Left/Right navigation buttons */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full"
      >
        &gt;
      </button>

      {/* Bottom-right percentage overlay */}
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-md px-2 py-1 rounded">
        {images[currentIndex].value}%
      </div>
    </div>
  );
};

export default ImageCarousel;
