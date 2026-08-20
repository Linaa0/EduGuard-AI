import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { X, BookOpen, ExternalLink, CheckCircle2, Bookmark, Share2 } from 'lucide-react';

export default function LearningResourcesModal() {
  const { selectedResourceModal, setSelectedResourceModal, showToast } = useAppState();

  if (!selectedResourceModal) return null;

  const handleBookmark = () => {
    showToast("Resource Bookmarked", `"${selectedResourceModal.title}" saved to your personal library.`, "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Academic Study Guide</span>
              <h2 className="text-sm font-bold text-white">{selectedResourceModal.title}</h2>
            </div>
          </div>

          <button
            onClick={() => setSelectedResourceModal(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span>Source: <strong>{selectedResourceModal.source}</strong></span>
            <span>Est. Read Time: <strong>{selectedResourceModal.readTime}</strong></span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Resource Overview</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedResourceModal.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {selectedResourceModal.tags?.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200">
                #{t}
              </span>
            ))}
          </div>

          {/* Key Takeaways */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Academic Takeaways for Next Essay</span>
            </h4>

            <ul className="space-y-2 text-xs text-slate-700">
              {selectedResourceModal.keyTakeaways?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              onClick={handleBookmark}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <Bookmark className="w-4 h-4 text-blue-600" />
              <span>Bookmark Guide</span>
            </button>

            <button
              onClick={() => {
                showToast("Opening External Link", "Launching verified academic source in new tab...", "info");
                setSelectedResourceModal(null);
              }}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <span>Read Full Publication</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
