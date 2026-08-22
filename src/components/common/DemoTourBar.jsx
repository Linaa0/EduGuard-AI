import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Sparkles, 
  ChevronLeft,  ChevronRight,
  X,
  Play,
  CheckCircle2,
  Compass,
  ArrowRight,
  Circle
} from 'lucide-react';

const tourStepsInfo = [
  { step: 1, title: "Lecturer Dashboard", desc: "Overview of student queue, pending reviews, and class performance." },
  { step: 2, title: "Assignment & Rubric", desc: "Interactive form with 4-criterion 20-point rubric matrix." },
  { step: 3, title: "Student Submission", desc: "Jean Claude submits 'Jean_Claude_Climate_Change_Essay.pdf'." },
  { step: 4, title: "AI Assessment Agent", desc: "Real-time execution of 7 tools from get_assignment to check_confidence." },
  { step: 5, title: "AI Score & Confidence", desc: "AI suggests 16/20 with 91% confidence based on rubric analysis." },
  { step: 6, title: "Human-In-The-Loop Review", desc: "Lecturer inspects criterion breakdowns — AI Recommends, Teacher Decides." },
  { step: 7, title: "Teacher Override", desc: "Lecturer adjusts Evidence & Examples from 3/5 to 4/5 (Total: 17/20)." },
  { step: 8, title: "Finalize Grade", desc: "Lecturer writes personalized guidance note and publishes final grade." },
  { step: 9, title: "Student Feedback Portal", desc: "Student views final grade (17/20 - 85%), strengths, and learning resources." },
  { step: 10, title: "Analytics & Architecture", desc: "Updated cohort analytics, AI telemetry, and technology stack overview." }
];

export default function DemoTourBar() {
  const { 
    isDemoTourActive, 
    demoTourStep, 
    nextDemoStep, 
    prevDemoStep, 
    goToDemoStep, 
    endDemoTour 
  } = useAppState();

  if (!isDemoTourActive) return null;

  const currentInfo = tourStepsInfo.find(s => s.step === demoTourStep) || tourStepsInfo[0];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-slate-900/95 backdrop-blur-xl border border-blue-500/40 rounded-2xl shadow-2xl p-4 text-white animate-in slide-in-from-bottom-6 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Step Badge & Info */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-400/40 shadow-glow">
            {demoTourStep}/10
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Hackathon Golden Path
              </span>
              <Circle className="w-1.5 h-1.5 text-slate-500 fill-current" />
              <span className="text-xs text-slate-300 font-medium">Step {demoTourStep} of 10</span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">{currentInfo.title}</h4>
            <p className="text-xs text-slate-300 line-clamp-1">{currentInfo.desc}</p>
          </div>
        </div>

        {/* Step Progression Bar & Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          
          {/* Quick jump step dots */}
          <div className="hidden md:flex items-center gap-1">
            {tourStepsInfo.map(s => (
              <button
                key={s.step}
                onClick={() => goToDemoStep(s.step)}
                title={`Step ${s.step}: ${s.title}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  s.step === demoTourStep 
                    ? 'w-6 bg-blue-500 shadow-glow' 
                    : s.step < demoTourStep 
                      ? 'bg-emerald-500' 
                      : 'bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevDemoStep}
              disabled={demoTourStep === 1}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                demoTourStep === 1 
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed' 
                  : 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              onClick={nextDemoStep}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-900/40 transition-all hover:scale-105"
            >
              <span>{demoTourStep === 10 ? 'Finish Tour' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={endDemoTour}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              title="Close Demo Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
