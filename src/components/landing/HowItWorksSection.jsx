import React from 'react';
import { 
  FilePlus, 
  ListTree, 
  UploadCloud, 
  Sparkles, 
  UserCheck, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function HowItWorksSection() {
  const { setCurrentPortal, setLecturerTab, startDemoTour } = useAppState();

  const steps = [
    {
      step: "01",
      title: "Lecturer Creates Assignment",
      desc: "Define course learning outcomes, assignment guidelines, submission limits, and deadline parameters.",
      icon: FilePlus,
      highlight: "ENV-101: Climate Change Essay"
    },
    {
      step: "02",
      title: "Lecturer Defines Rubric",
      desc: "Upload or configure a 4-criterion grading matrix with custom point distributions and scoring descriptors.",
      icon: ListTree,
      highlight: "4 Criteria • 20 Marks Total"
    },
    {
      step: "03",
      title: "Student Submits Work",
      desc: "Students upload their essay or report via the secure student portal with instant document parsing.",
      icon: UploadCloud,
      highlight: "Jean_Claude_Essay.pdf"
    },
    {
      step: "04",
      title: "AI Evaluates Submission",
      desc: "Autonomous 7-tool agent analyzes semantic alignment, assigns criterion scores, and drafts feedback with confidence calibration.",
      icon: Sparkles,
      highlight: "16/20 • 91% Confidence"
    },
    {
      step: "05",
      title: "Lecturer Approves / Modifies",
      desc: "Lecturer reviews the breakdown, overrides any score if needed, adds personalized comments, and publishes the final grade.",
      icon: UserCheck,
      highlight: "Teacher Final: 17/20 (85%)"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Seamless 5-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How EduGuard AI Transforms Assessment
          </h2>

          <p className="text-base text-slate-400 leading-relaxed">
            From rubric specification to student feedback, experience a transparent human-in-the-loop workflow designed for university rigor.
          </p>
        </div>

        {/* 5-Step Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isAI = idx === 3;
            const isTeacher = idx === 4;

            return (
              <div 
                key={s.step} 
                className={`relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] ${
                  isAI 
                    ? 'bg-gradient-to-b from-blue-950/70 to-slate-900 border-2 border-blue-500/60 shadow-glow' 
                    : isTeacher
                      ? 'bg-gradient-to-b from-emerald-950/60 to-slate-900 border-2 border-emerald-500/60 shadow-glow-emerald'
                      : 'bg-slate-900 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isAI ? 'bg-blue-600 text-white' : isTeacher ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {s.step}
                    </span>
                    <Icon className={`w-5 h-5 ${isAI ? 'text-blue-400' : isTeacher ? 'text-emerald-400' : 'text-slate-400'}`} />
                  </div>

                  <h3 className="text-sm font-bold text-white mt-4 leading-snug">{s.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{s.desc}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80">
                  <span className={`text-[11px] font-mono font-medium block truncate ${
                    isAI ? 'text-blue-300' : isTeacher ? 'text-emerald-300 font-bold' : 'text-slate-400'
                  }`}>
                    {s.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Trigger Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/20 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Experience the Complete 5-Step Workflow in Real-Time</span>
            </h4>
            <p className="text-xs text-slate-300">Run the simulated evaluation pipeline with Jean Claude's sample essay.</p>
          </div>
          <button
            onClick={startDemoTour}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-transform hover:scale-105"
          >
            <span>Launch Interactive Tour</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
