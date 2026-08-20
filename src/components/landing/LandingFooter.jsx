import React from 'react';
import { ShieldCheck, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function LandingFooter() {
  const { startDemoTour, setCurrentPortal, setLecturerTab, setStudentTab } = useAppState();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      
      {/* Big Final CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950/60 border border-blue-500/40 p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ready for the Next Generation of Academic Assessment?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            AI Assesses. <br className="hidden sm:block" />
            <span className="text-blue-400">Teachers Decide.</span> <br className="hidden sm:block" />
            <span className="text-emerald-400">Students Understand.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Building a more transparent, efficient, and student-centered academic assessment experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={startDemoTour}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-glow flex items-center justify-center gap-3 transition-transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Launch EduGuard Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-300">EduGuard AI</span>
            <span>— University Academic Assessment & Feedback System</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <button onClick={() => { setCurrentPortal('lecturer'); setLecturerTab('dashboard'); }} className="hover:text-white transition-colors">
              Lecturer Portal
            </button>
            <button onClick={() => { setCurrentPortal('student'); setStudentTab('dashboard'); }} className="hover:text-white transition-colors">
              Student Portal
            </button>
            <button onClick={startDemoTour} className="hover:text-white text-blue-400 font-semibold transition-colors">
              Guided Demo
            </button>
          </div>

          <p className="text-slate-400">
            Built with academic rigor for STP '26 Hackathon
          </p>

        </div>
      </div>

    </footer>
  );
}
