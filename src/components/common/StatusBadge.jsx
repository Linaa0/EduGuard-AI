import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, Edit3, ShieldAlert } from 'lucide-react';

export default function StatusBadge({ status, size = 'md' }) {
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs' 
    : size === 'lg' 
      ? 'px-3.5 py-1.5 text-sm font-semibold' 
      : 'px-2.5 py-1 text-xs font-medium';

  switch (status) {
    case 'Approved':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${sizeClasses}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Approved</span>
        </span>
      );
    case 'Modified':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 ${sizeClasses}`}>
          <Edit3 className="w-3.5 h-3.5 text-blue-600" />
          <span>Modified by Lecturer</span>
        </span>
      );
    case 'Human Review':
    case 'Human Review Required':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 ${sizeClasses}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Human Review Required</span>
        </span>
      );
    case 'Pending Review':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300 ${sizeClasses}`}>
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Pending Review</span>
        </span>
      );
  }
}
