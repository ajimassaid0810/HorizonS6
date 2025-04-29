import { ChangeEvent, useState } from "react";
import Label from "../Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";

type OptionType = {
  value: string;
  label: string;
};

type SelectInputProps = {
  label: string;
  id: string;
  options: string[] | OptionType[];
  value: string;
  onChange: (value: string) => void; // Ubah dari (e: ChangeEvent<HTMLSelectElement>) => void
  className?: string;
};

export default function SelectInputs({
  label,
  id,
  options,
  value,
  onChange,
  className,
}: SelectInputProps) {
  // Handle opsi berupa array string (["A", "B"]) atau array object ({ value, label })
  const formattedOptions =
    typeof options[0] === "string"
      ? (options as string[]).map((opt) => ({
          value: opt,
          label: opt,
        }))
      : (options as OptionType[]);

  return (
    <div className="mb-4">
      <Label htmlFor={id}>{label}</Label>
      <Select
  id={id}
  value={value}
  onChange={onChange} // Karena udah (value: string) => void
  options={formattedOptions}
  className={className}
  placeholder="Pilih opsi"
/>

    </div>
  );
}
