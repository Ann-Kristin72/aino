import React from "react";

const colorMap: Record<string, string> = {
  teal: "bg-joda-teal hover:bg-joda-teal/80 text-white",
  orange: "bg-joda-orange hover:bg-joda-orange/80 text-white",
  yellow: "bg-joda-yellow hover:bg-joda-yellow/80 text-skifer",
  peach: "bg-joda-peach hover:bg-joda-peach/80 text-skifer",
  green: "bg-joda-green hover:bg-joda-green/80 text-skifer",
  sand: "bg-joda-sand hover:bg-joda-sand/80 text-skifer",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof typeof colorMap;
  children: React.ReactNode;
}

export default function Button({ color = "teal", children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-joda-${color} ${colorMap[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 