import React from "react";

type OptionType = {
  value: string;
  label: string;
};

type SelectProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  label?: string; // ✅ tambahkan ini
};


export default function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  className,
  label, // ✅ tambahkan ini juga
}: SelectProps) {

  return (
<select
  id={id}
  title={placeholder ?? label ?? "Pilih opsi"}
  aria-label={placeholder ?? label ?? "Pilih opsi"}
  value={value}
  onChange={(e) => onChange(e.target.value)}
  className={`w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white ${className}`}
>

      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
