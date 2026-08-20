import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  UserCheck, 
  BookOpen, 
  GraduationCap,
  Play,
  Layers,
  Cpu
} from 'lucide-react';

export default function HeroSection({ onExploreDemo, onHowItWorks }) {
  const { setCurrentPortal, setLecturerTab, startDemoTour } = useAppState();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      
      {/* Decorative Grid & Glow Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-blue-500/30 text-blue-300 text-xs font-semibold shadow-inner mb-6 animate-pulse-subtle">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI-Powered Academic Assessment & Feedback Platform</span>
            <span className="bg-blue-600 text-white text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ml-1">STP '26</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
            AI Assesses. <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              Teachers Decide.
            </span> <br className="hidden sm:block" />
            Students Understand.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            AI-powered academic assessment and feedback that helps university lecturers assess faster with their own marking rubrics, while empowering students with criterion-level explanations to improve.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={startDemoTour}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-glow flex items-center justify-center gap-2.5 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Explore Demo (Golden Path)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onHowItWorks}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4 text-blue-400 fill-blue-400/20" />
              <span>How It Works</span>
            </button>
          </div>
        </div>

        {/* Realistic Interactive Dashboard Preview Mockup */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-2 shadow-2xl backdrop-blur-md">
            
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 rounded-t-xl border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="ml-3 font-mono text-[11px] text-slate-400 hidden sm:inline">eduguard.univ.edu/lecturer/human-review/ENV-101</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 text-[10px] font-mono border border-blue-700/40">
                  AI RECOMMENDATION ACTIVE
                </span>
              </div>
            </div>

            {/* Mockup Body: Split view of Assessment & Lecturer Decision */}
            <div className="p-4 sm:p-6 bg-slate-950 rounded-b-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: AI Recommendation */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Submission Evaluation</span>
                    <h3 className="text-base font-bold text-white">Jean Claude — Climate Change Essay</h3>
                    <p className="text-xs text-slate-400">ENV-101 • Introduction to Environmental Studies</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-white font-mono">16 <span className="text-sm font-normal text-slate-400">/ 20</span></div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 91% AI Confidence
                    </span>
                  </div>
                </div>

                {/* Criteria Snippets */}
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-200">1. Understanding of Topic</p>
                      <p className="text-[11px] text-slate-400">Strong comprehension of anthropogenic greenhouse drivers.</p>
                    </div>
                    <span className="font-mono font-bold text-blue-400 px-2 py-1 bg-slate-800 rounded">4 / 5</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-200">2. Quality of Argument</p>
                      <p className="text-[11px] text-slate-400">Well-reasoned thesis on adaptation vs mitigation.</p>
                    </div>
                    <span className="font-mono font-bold text-blue-400 px-2 py-1 bg-slate-800 rounded">4 / 5</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-500/40 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-white">3. Evidence & Examples</p>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">Teacher Adjusted</span>
                      </div>
                      <p className="text-[11px] text-slate-300">Dr. Alice awarded +1 mark for regional agroforestry case studies.</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 line-through">3/5</span>
                      <span className="font-mono font-bold text-emerald-400 px-2 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded">4 / 5</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-200">4. Structure and Clarity</p>
                      <p className="text-[11px] text-slate-400">Logical academic organization and strong concluding synthesis.</p>
                    </div>
                    <span className="font-mono font-bold text-blue-400 px-2 py-1 bg-slate-800 rounded">5 / 5</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Teacher Decision Card */}
              <div className="lg:col-span-5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-900/90 border border-blue-500/30 p-5 space-y-4">
                
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <UserCheck className="w-4 h-4 text-blue-400" />
                  <span>Lecturer Decision</span>
                </div>

                <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-700/30">
                  <p className="text-[11px] text-blue-300 leading-relaxed font-medium">
                    "AI recommends baseline marks based on your rubric. You retain complete authority over every mark and personalized note."
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">AI Suggested:</span>
                    <span className="font-mono text-slate-300">16 / 20 (80%)</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white">Lecturer Final Grade:</span>
                    <span className="font-mono text-emerald-400 text-sm font-bold">17 / 20 (85%)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setCurrentPortal('lecturer');
                      setLecturerTab('human-review');
                    }}
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-glow-emerald transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Publish to Student</span>
                  </button>
                </div>

                <p className="text-[10px] text-center text-slate-400 italic">
                  Guaranteed Human-In-The-Loop Academic Governance
                </p>

              </div>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
