import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  required,
  value,
  onChange,
  options,
  error,
  className,
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 block w-full h-10 px-3 text-gray-600 rounded-md border border-gray-300 shadow-sm focus:ring-[#65349C] focus:border-[#65349C] sm:text-sm ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="">เลือก</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
