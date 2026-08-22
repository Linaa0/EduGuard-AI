import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { BookOpen, ExternalLink, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';
import { studentPortalData } from '../../data/mockData';

export default function StudentResourcesView() {
  const { setSelectedResourceModal } = useAppState();

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-cream dark:bg-slate-900 min-h-full">
      
      <div className="pb-4 border-b border-divider dark:border-slate-700">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-white tracking-tight">Academic Learning Resources</h1>
        <p className="text-xs sm:text-sm text-slategray dark:text-slate-400 mt-1">Curated university reading materials, methodology guides, and reference manuals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {studentPortalData.learningResources.map((res) => (
          <div key={res.id} className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-subtle flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-all group">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                {res.type}
              </span>
              <h3 className="text-base font-bold text-charcoal dark:text-white group-hover:text-blue-600 transition-colors">{res.title}</h3>
              <p className="text-xs text-slategray dark:text-slate-400 leading-relaxed">{res.description}</p>
            </div>

            <div className="pt-4 border-t border-divider dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-400">{res.readTime}</span>
              <button
                onClick={() => setSelectedResourceModal(res)}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Open Resource</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
