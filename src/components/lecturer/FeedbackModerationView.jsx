import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { MessageSquareQuote, CheckCircle2, Edit3, ArrowRight, Sparkles, UserCheck } from 'lucide-react';

export default function FeedbackModerationView() {
  const { submission, lecturerFeedbackComment, setLecturerTab } = useAppState();

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-slate-50 min-h-full">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Pedagogical Feedback Moderation</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review and personalize AI-synthesized qualitative feedback before student dispatch
          </p>
        </div>

        <button
          onClick={() => setLecturerTab('human-review')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-2"
        >
          <UserCheck className="w-4 h-4" />
          <span>Moderation Queue</span>
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-subtle p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Active Feedback Template</span>
            <h3 className="text-base font-bold text-slate-900">Jean Claude — Climate Change Essay (ENV-101)</h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Grade: 17 / 20 (85%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>AI-Generated Qualitative Analysis</span>
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Student displays exemplary conceptual mastery of greenhouse mechanisms and planetary temperature anomalies. The introduction and structural flow are well calibrated. Evidence in Section 3 was boosted following qualitative review of agroforestry case studies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <Edit3 className="w-4 h-4 text-blue-600" />
              <span>Lecturer's Personal Note (Dr. Alice Mukamana)</span>
            </span>
            <p className="text-xs text-blue-950 leading-relaxed font-medium italic">
              "{lecturerFeedbackComment}"
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
