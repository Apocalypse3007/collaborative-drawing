"use client";

import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  onClick,
  href
}) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300',
    accent: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-400'
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;