import React from "react";

// A simple map from crop label to an image URL.
// Replace with real image paths or placeholders.
const cropImages: Record<string, string> = {
  Cotton: "/images/cotton.jpg",
  Rice: "/images/rice.jpg",
  Tomatoes: "/images/tomatoes.jpg",
  // Add more if needed...
};

interface RecommendedCrop {
  label: string;
  value: string;
  when: string;
}

interface RecommendedCropsProps {
  crops: RecommendedCrop[];
}

export default function RecommendedCrops({ crops }: RecommendedCropsProps) {
  if (!crops || crops.length === 0) return null;

  // Helper to extract the months/phrases from the "when" property.
  // For example, "Plant in late April to early May..."
  // We'll attempt to find a substring like "April to early May".
  function extractMonths(whenStr: string): string {
    // A naive regex approach to find e.g. "April to early May"
    // or "mid-April to early May"
    const match = whenStr.match(/\b[A-Za-z-]+(\s+\b[A-Za-z-]+)?\s+to\s+[A-Za-z-]+(\s+\b[A-Za-z-]+)?/i);
    if (match) {
      return match[0]; // e.g. "late April to early May"
    }
    return whenStr; // fallback if no match
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {crops.map((crop, index) => {
        const imageSrc = cropImages[crop.label] || "/images/placeholder.jpg";
        const monthsTitle = extractMonths(crop.when);

        return (
          <div
            key={index}
            className="bg-gray-800 dark:bg-gray-800 rounded shadow p-4 flex flex-col"
          >
            {/* Crop Image */}
            <img
              src={imageSrc}
              alt={crop.label}
              className="w-full h-40 object-cover rounded mb-4"
            />

            {/* Title from extracted months */}
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              {monthsTitle}
            </h3>

            {/* Crop description */}
            <p className="text-sm text-gray-300">
              {crop.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
