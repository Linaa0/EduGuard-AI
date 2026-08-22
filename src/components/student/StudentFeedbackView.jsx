import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  UserCheck, 
  MessageSquareQuote,
  ShieldCheck,
  Download,
  Layers
} from 'lucide-react';
import { studentPortalData } from '../../data/mockData';

export default function StudentFeedbackView() {
  const { submission, setSelectedResourceModal, lecturerFeedbackComment, criterionScores } = useAppState();

  const criteriaResults = [
    {
      name: "Understanding of Topic",
      score: criterionScores["crit-1"] || 4,
      max: 5,
      note: "Demonstrates a strong understanding of the major causes and effects of climate change.",
      color: "bg-blue-600",
      pct: `${((criterionScores["crit-1"] || 4) / 5) * 100}%`
    },
    {
      name: "Quality of Argument",
      score: criterionScores["crit-2"] || 4,
      max: 5,
      note: "The argument is clear and generally well supported, although some claims could be developed further.",
      color: "bg-blue-600",
      pct: `${((criterionScores["crit-2"] || 4) / 5) * 100}%`
    },
    {
      name: "Evidence and Examples",
      score: criterionScores["crit-3"] || 4,
      max: 5,
      note: "Good use of regional case studies on East African agroforestry. Lecturer awarded +1 mark for qualitative depth.",
      color: "bg-emerald-600",
      pct: `${((criterionScores["crit-3"] || 4) / 5) * 100}%`,
      override: true
    },
    {
      name: "Structure and Clarity",
      score: criterionScores["crit-4"] || 5,
      max: 5,
      note: "The submission has a clear introduction, logical organization, and strong conclusion.",
      color: "bg-blue-600",
      pct: `${((criterionScores["crit-4"] || 5) / 5) * 100}%`
    }
  ];

  const totalScore = Object.values(criterionScores).reduce((a, b) => a + b, 0);

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-cream dark:bg-slate-900 min-h-full">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-divider dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-white tracking-tight">Academic Feedback Report</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Grade Finalized
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slategray dark:text-slate-400 mt-1">
            Assignment: <strong>Climate Change and Sustainable Development (ENV-101)</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slategray dark:text-slate-400 flex items-center gap-1">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            Approved by Dr. Alice Mukamana
          </span>
        </div>
      </div>

      {/* Hero Result Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border border-blue-500/40 p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center font-extrabold text-white shadow-glow-emerald shrink-0">
            <Award className="w-9 h-9" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">YOUR OFFICIAL RESULT</span>
            <h2 className="text-2xl font-black text-white">Climate Change and Sustainable Development</h2>
            <p className="text-xs text-slate-300">
              Evaluated with ENV-101 4-Criterion Rubric • Moderated by Course Leader
            </p>
          </div>
        </div>

        <div className="bg-slate-950/80 px-6 py-4 rounded-2xl border border-slate-800 text-center md:text-right shrink-0">
          <span className="text-xs uppercase font-bold text-slate-400 block">FINAL GRADE</span>
          <div className="text-4xl font-black text-emerald-400 font-mono mt-0.5">
            {totalScore} <span className="text-lg font-normal text-slate-400">/ 20</span>
          </div>
          <p className="text-xs font-bold text-white mt-0.5">{(totalScore/20)*100}% (Grade A-)</p>
        </div>

      </div>

      {/* Criterion-Level Performance Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-subtle p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-divider dark:border-slate-700">
          <h3 className="text-base font-bold text-charcoal dark:text-white">Criterion-by-Criterion Evaluation</h3>
          <span className="text-xs text-slategray dark:text-slate-400 font-mono">Rubric Alignment</span>
        </div>

        <div className="space-y-4 pt-1">
          {criteriaResults.map((crit) => (
            <div key={crit.name} className="p-4 rounded-xl bg-cream-50 dark:bg-slate-700 border border-divider dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-charcoal dark:text-white">{crit.name}</span>
                  {crit.override && (
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Lecturer Enhanced (+1)
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs font-bold text-charcoal dark:text-white">{crit.score} / {crit.max} Marks</span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className={`h-full rounded-full ${crit.color}`} style={{ width: crit.pct }}></div>
              </div>

              <p className="text-xs text-slategray dark:text-slate-400 leading-relaxed pt-0.5">
                "{crit.note}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Areas to Improve Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Your Strengths */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-200 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>YOUR DEMONSTRATED STRENGTHS</span>
          </div>

          <ul className="space-y-2.5 text-xs text-charcoal dark:text-slate-200">
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span><strong>Strong understanding of the topic:</strong> Excellent exposition of planetary greenhouse dynamics and IPCC vulnerability parameters.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span><strong>Clear structure:</strong> Logical paragraph transitions from thesis introduction to policy synthesis.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span><strong>Relevant examples:</strong> High-impact localized case studies on East African agroforestry and watershed protection.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
              <span><strong>Strong conclusion:</strong> Clear synthesis tying environmental policy directly to community economic resilience.</span>
            </li>
          </ul>
        </div>

        {/* Areas to Improve */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>ACTIONABLE AREAS TO IMPROVE</span>
          </div>

          <ul className="space-y-2.5 text-xs text-charcoal dark:text-slate-200">
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-amber-50/50">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
              <span><strong>Develop evidence further:</strong> Include quantitative carbon sequestration metrics and peer-reviewed emission datasets.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-amber-50/50">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
              <span><strong>Strengthen academic referencing:</strong> Standardize all secondary references to APA-7th citation format.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-amber-50/50">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
              <span><strong>Expand analysis of proposed solutions:</strong> Deepen economic feasibility metrics for decentralized solar microgrids.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Lecturer's Personalized Qualitative Note */}
      <div className="rounded-2xl bg-blue-50/80 border border-blue-200 p-6 space-y-2">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
          <MessageSquareQuote className="w-4 h-4 text-blue-600" />
          <span>Lecturer's Pedagogical Commentary (Dr. Alice Mukamana)</span>
        </div>
        <p className="text-xs text-blue-950 leading-relaxed font-medium italic">
          “{lecturerFeedbackComment}”
        </p>
      </div>

      {/* Recommended Learning Resources Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-charcoal dark:text-white">Recommended Learning Resources</h3>
            <p className="text-xs text-slategray dark:text-slate-400">Handpicked materials to help you strengthen your weak criteria</p>
          </div>
          <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            Targeted for Next Assignment
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentPortalData.learningResources.map((res) => (
            <div 
              key={res.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-subtle flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-all group"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                  {res.type}
                </span>
                <h4 className="text-sm font-bold text-charcoal dark:text-white group-hover:text-blue-600 transition-colors">{res.title}</h4>
                <p className="text-xs text-slategray dark:text-slate-400 leading-relaxed line-clamp-2">{res.description}</p>
              </div>

              <div className="pt-3 border-t border-divider dark:border-slate-700 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{res.readTime}</span>
                <button
                  onClick={() => setSelectedResourceModal(res)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:underline"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
