'use client';

import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : undefined}
      onClick={onClick}
      className={`
        bg-slate-900/50 border border-slate-800 rounded-2xl p-6
        ${hover ? 'hover:border-purple-500/50 cursor-pointer transition-all' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}