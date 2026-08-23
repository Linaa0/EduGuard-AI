import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, Edit3 } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function StatusBadge({ status, size = 'md' }) {
  const { t } = useAppState();
  
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs' 
    : size === 'lg' 
      ? 'px-3.5 py-1.5 text-sm font-semibold' 
      : 'px-2.5 py-1 text-xs font-medium';

  switch (status) {
    case 'Approved':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800 ${sizeClasses}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{t('status.approved')}</span>
        </span>
      );
    case 'Modified':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800 ${sizeClasses}`}>
          <Edit3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>{t('status.modified')}</span>
        </span>
      );
    case 'Human Review':
    case 'Human Review Required':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-700 ${sizeClasses}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>{t('status.review')}</span>
        </span>
      );
    case 'Pending Review':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-cream-100 dark:bg-slate-700 text-charcoal dark:text-slate-300 border border-divider dark:border-slate-600 ${sizeClasses}`}>
          <Clock className="w-3.5 h-3.5 text-slategray dark:text-slate-400" />
          <span>{t('status.pending')}</span>
        </span>
      );
  }
}
