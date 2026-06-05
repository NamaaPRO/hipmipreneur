'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
}

export function Button({ 
  children, 
  loading, 
  variant = 'primary', 
  icon,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
    ghost: "bg-transparent hover:bg-slate-800 text-slate-300",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : icon}
      {children}
    </motion.button>
  );
}