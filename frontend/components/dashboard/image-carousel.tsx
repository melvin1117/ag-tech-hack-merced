import React from "react";

interface ImageCarouselProps {
  images: Array<{ path: string; value: number }>;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="overflow-x-auto flex space-x-4 p-4">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.path}
          alt={`Insight ${index + 1}`}
          className="w-64 h-40 object-cover rounded shadow"
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
