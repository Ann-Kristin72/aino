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
  colorClass?: string;
  backgroundColor?: string;
  icon?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ name, description, onClick, color, index, colorClass, backgroundColor, icon }) => {
  const bg = color || palette[index ?? 0 % palette.length];

  // Bestem tekstfarge basert på bakgrunnsfarge
  const getTextColor = (bgColor: string) => {
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'text-gray-800' : 'text-white';
  };

  const textColor = backgroundColor ? getTextColor(backgroundColor) : 'text-white';

  return (
    <button
      onClick={onClick}
      className={`rounded-xl shadow-md p-4 cursor-pointer hover:scale-105 transition-all duration-200 ${colorClass || ''} flex items-center gap-3`}
      style={{ backgroundColor: backgroundColor }}
      aria-label={name}
    >
      {icon && <span className="text-2xl">{icon}</span>}
      <span className={`font-nunito font-semibold text-lg ${textColor}`}>{name}</span>
      {description && <span className="text-sm opacity-80">{description}</span>}
    </button>
  );
};

export default CategoryCard; 