interface InputFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export default function InputField({
  label,
  required,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  maxLength,
  className,
}: InputFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full h-10 px-3 text-gray-600 rounded-md border border-gray-300 shadow-sm focus:ring-[#65349C] focus:border-[#65349C] sm:text-sm"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
