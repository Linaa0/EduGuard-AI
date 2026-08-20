import React from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  TrendingUp, 
  BookOpen, 
  ExternalLink, 
  Sparkles,
  ArrowRight,
  Award
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { studentPortalData } from '../../data/mockData';

export default function StudentFeedbackSection() {
  const { setCurrentPortal, setStudentTab, setSelectedResourceModal } = useAppState();

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student-Centered Growth</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Transforming Grades Into Understanding
          </h2>

          <p className="text-base text-slate-400 leading-relaxed">
            Students no longer receive a dead-end number. EduGuard AI delivers transparent criterion breakdowns, specific strengths, actionable growth areas, and curated university resources.
          </p>
        </div>

        {/* Student Feedback Showcase Card */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-8">
          
          {/* Top Result Banner */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-slate-900 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-glow-emerald shrink-0">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">Published Assessment</span>
                <h3 className="text-xl font-bold text-white">Climate Change and Sustainable Development</h3>
                <p className="text-xs text-slate-300">ENV-101 • Approved by Dr. Alice Mukamana</p>
              </div>
            </div>

            <div className="text-center md:text-right bg-slate-900/80 px-5 py-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Final Official Grade</span>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                17 <span className="text-base font-normal text-slate-400">/ 20</span> <span className="text-base text-white">(85%)</span>
              </div>
            </div>
          </div>

          {/* Strengths vs Areas to Improve Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="p-5 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your Demonstrated Strengths</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Strong understanding of the topic:</strong> Clearly articulates greenhouse drivers and planetary boundary science.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Clear structure:</strong> Well-organized sequence from thesis statement to policy synthesis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Relevant examples:</strong> Solid inclusion of East African agroforestry and watershed adaptation initiatives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Strong conclusion:</strong> Convincing synthesis summarizing policy implications for developing regions.</span>
                </li>
              </ul>
            </div>

            {/* Areas to Improve */}
            <div className="p-5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Actionable Areas to Improve</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Develop evidence further:</strong> Include more quantitative data tables and peer-reviewed emission models.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Strengthen academic referencing:</strong> Ensure all secondary claims cite standardized APA or Harvard references.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Expand analysis of proposed solutions:</strong> Deepen economic feasibility metrics for decentralized solar microgrids.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Recommended Learning Resources Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Recommended Learning Resources</span>
              </div>
              <span className="text-xs text-slate-400">Personalized to rubric gap analysis</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {studentPortalData.learningResources.map((res) => (
                <div 
                  key={res.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                      {res.type}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">{res.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{res.description}</p>
                  </div>

                  <button
                    onClick={() => setSelectedResourceModal(res)}
                    className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Student Portal Trigger */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => {
                setCurrentPortal('student');
                setStudentTab('dashboard');
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <span>Explore Full Student Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
