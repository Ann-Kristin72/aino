import React from "react";

const palette = [
  "#F6C177", // yellow/orange
  "#F7A072", // orange
  "#6DB3A0", // teal
  "#4A8C8C", // blue-green
  "#A3B18A", // olive
  "#3A6B6C", // dark teal
];

export interface CategoryCardProps {
  name: string;
  description?: string;
  onClick?: () => void;
  color?: string;
  index?: number; // for palette fallback
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ name, description, onClick, color, index }) => {
  const bg = color || palette[index ?? 0 % palette.length];
  return (
    <button
      onClick={onClick}
      className="rounded-xl shadow-md p-6 w-full sm:w-64 m-2 flex flex-col items-start transition-transform hover:scale-105 focus:outline-none"
      style={{ background: bg, color: '#234', minHeight: 120 }}
      aria-label={name}
    >
      <span className="font-bold text-lg mb-2">{name}</span>
      {description && <span className="text-sm opacity-80">{description}</span>}
    </button>
  );
};

export default CategoryCard; 