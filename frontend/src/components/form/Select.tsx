import React from "react";

interface SelectProps {
  id?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function Select({
  id,
  options,
  placeholder,
  onChange,
  className = "",
}: SelectProps) {
  return (
    <select
      id={id}
      aria-label={placeholder || "Select"} 
      className={`form-select block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      onChange={(e) => onChange?.(e.target.value)}
      defaultValue=""
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
