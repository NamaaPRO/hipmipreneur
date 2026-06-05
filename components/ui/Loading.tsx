'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Loading({ text = 'Loading...', size = 'md' }: LoadingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };


  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Loader2 className={`${sizes[size]} text-purple-500 animate-spin`} />
      <p className="text-slate-400">{text}</p>
    </div>
  );
}