import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => {
  const baseClass = 'px-4 py-2 rounded font-semibold focus:outline-none transition-colors';
  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-200',
  };

  return (
    <button
      className={classNames(baseClass, variantClass[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
