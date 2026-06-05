'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
}

export function Alert({ type = 'info', title, children }: AlertProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  };


  const styles = {
    success: "bg-green-500/20 border-green-500/30",
    error: "bg-red-500/20 border-red-500/30",
    warning: "bg-yellow-500/20 border-yellow-500/30",
    info: "bg-blue-500/20 border-blue-500/30",
  };

  const textColors = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-xl p-4 ${styles[type]}`}
    >
      <div className="flex items-start gap-3">
        {icons[type]}
        <div>
          {title && <h4 className={`font-semibold ${textColors[type]} mb-1`}>{title}</h4>}
          <div className="text-slate-300 text-sm">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}