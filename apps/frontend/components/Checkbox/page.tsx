import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => (
  <label className="inline-flex items-center space-x-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="form-checkbox h-5 w-5 text-blue-600"
    />
    <span className="text-gray-700">{label}</span>
  </label>
);
