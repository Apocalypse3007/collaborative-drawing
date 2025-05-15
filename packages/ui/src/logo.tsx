"use client";

import React from 'react';
import { Palette } from 'lucide-react';

interface LogoProps {
  text?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ text = 'SketchCollab', className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Palette className="h-8 w-8 text-primary-600 mr-2" />
      <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 text-transparent bg-clip-text">
        {text}
      </span>
    </div>
  );
};

export default Logo;