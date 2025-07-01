import React from "react";

const colorBgMap: Record<string, string> = {
  teal: "bg-joda-teal/10 border-joda-teal",
  orange: "bg-joda-orange/10 border-joda-orange",
  yellow: "bg-joda-yellow/10 border-joda-yellow",
  peach: "bg-joda-peach/10 border-joda-peach",
  green: "bg-joda-green/10 border-joda-green",
  sand: "bg-joda-sand/10 border-joda-sand",
};

interface CardProps {
  color?: keyof typeof colorBgMap;
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({ color = "teal", title, icon, children, className = "" }: CardProps) {
  return (
    <div className={`border rounded-xl p-6 shadow-sm ${colorBgMap[color]} ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="text-lg font-bold text-skifer">{title}</h3>
      </div>
      {children && <div className="text-skifer/80 text-sm">{children}</div>}
    </div>
  );
} 