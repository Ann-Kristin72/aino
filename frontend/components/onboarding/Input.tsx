"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ 
  label, 
  error, 
  className = "", 
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-700 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 
          bg-white 
          border border-gray-200 
          rounded-xl 
          text-gray-800 
          placeholder-gray-400
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-transparent
          transition-all 
          duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 