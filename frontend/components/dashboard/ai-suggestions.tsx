import React from "react";

interface AISuggestionsProps {
  suggestions: string;
  insights: string;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ suggestions, insights }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Farming Suggestions</h2>
      <p className="mt-2 text-gray-700 dark:text-gray-200">{suggestions}</p>
      <p className="mt-2 text-gray-700 dark:text-gray-200">{insights}</p>
    </div>
  );
};

export default AISuggestions;
