'use client';

import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function Input({ label, icon, error, className = '', ...props }: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="text-slate-300 block mb-2">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-slate-800 border border-slate-700 text-white p-4 
            rounded-xl focus:outline-none focus:border-purple-500 transition
            ${icon ? 'pl-12' : ''}
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}