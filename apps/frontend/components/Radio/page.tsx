import React from 'react';

interface RadioButtonProps {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  label,
  value,
  checked,
  onChange,
}) => (
  <label className="inline-flex items-center space-x-2">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={(e) => onChange(e.target.value)}
      className="form-radio h-5 w-5 text-blue-600"
    />
    <span className="text-gray-700">{label}</span>
  </label>
);
