'use client';

import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'purple';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: "bg-slate-800 text-slate-300",
    success: "bg-green-500/20 text-green-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    error: "bg-red-500/20 text-red-400",
    purple: "bg-purple-500/20 text-purple-400",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}