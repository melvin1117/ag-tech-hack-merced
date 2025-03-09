import React from "react";

// Map crop labels to image URLs (replace these with real images or placeholders).
const cropImages: Record<string, string> = {
  Cotton: "https://textileexchange.org/app/uploads/2022/09/cotton-bud-on-plant.jpg",
  Rice: "https://eos.com/wp-content/uploads/2023/04/rice-field.jpg",
  Tomatoes: "https://bonnieplants.com/cdn/shop/articles/BONNIE_tomatoes_iStock-481349128-1800px_9f8f5390-a418-4d91-a3d0-00ae0b7900cb.jpg?v=1642541980&width=1000",
  Alomonds: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gardenersworld.com%2Fhow-to%2Fgrow-plants%2Fhow-to-grow-an-almond-tree%2F&psig=AOvVaw0rMd2r-oHZX9aj1Cyy2_rI&ust=1741608196962000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMiI96D6_IsDFQAAAAAdAAAAABAE",
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

  // Helper to extract months from the "when" string.
  // e.g. "Plant in late April to early May" => "April to early May"
  function extractMonths(whenStr: string): string {
    // A naive regex to find a substring like "April to early May"
    const match = whenStr.match(/\b[a-zA-Z-]+(\s+[a-zA-Z-]+)?\s+to\s+[a-zA-Z-]+(\s+[a-zA-Z-]+)?/i);
    if (match) return match[0];
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
            className="bg-gray-800 rounded shadow p-4 flex flex-col"
          >
            {/* Crop Image */}
            <img
              src={imageSrc}
              alt={crop.label}
              className="w-full h-40 object-cover rounded mb-4"
            />

            {/* Title extracted from 'when' */}
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              {monthsTitle}
            </h3>

            {/* Crop description (the 'value' property) */}
            <p className="text-sm text-gray-300">
              {crop.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
