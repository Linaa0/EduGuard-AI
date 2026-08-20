import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useAppState();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-elevated bg-white/95 backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
              isSuccess 
                ? 'border-emerald-200 text-slate-900 bg-gradient-to-r from-emerald-50/50 to-white' 
                : isWarning 
                  ? 'border-amber-200 text-slate-900 bg-gradient-to-r from-amber-50/50 to-white' 
                  : 'border-blue-200 text-slate-900 bg-gradient-to-r from-blue-50/50 to-white'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600" />}
              {!isSuccess && !isWarning && <Info className="w-5 h-5 text-blue-600" />}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-slate-900">{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
