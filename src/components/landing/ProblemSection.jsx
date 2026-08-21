import React from 'react';
import { 
  AlertOctagon, 
  Clock, 
  Repeat, 
  MessageSquareOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  FileSpreadsheet,
  HelpCircle,
  TrendingDown
} from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="section-padding bg-navy-900 border-t border-navy-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>The Academic Assessment Dilemma</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Lecturers Are Overwhelmed. <br className="hidden sm:block" />
            Students Are Left in the Dark.
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            University professors juggle hundreds of essay submissions while lecturing, preparing curricula, and calculating grades. In the rush, students receive a standalone numerical score with zero actionable guidance.
          </p>
        </div>

        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-navy-950 border border-rose-500/20 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-navy-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">Traditional Manual Grading Workflow</span>
            </div>
            <span className="text-xs text-slate-500">Average: 20-30 mins per paper</span>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            
            <div className="p-4 rounded-xl bg-navy-900/80 border border-navy-800 text-center space-y-2 card-hover">
              <div className="w-8 h-8 rounded-lg bg-navy-800 text-slate-300 mx-auto flex items-center justify-center font-bold text-xs">1</div>
              <h4 className="text-xs font-bold text-slate-200">Submissions Pile Up</h4>
              <p className="text-[11px] text-slate-400">100+ PDF essays arrive simultaneously</p>
            </div>

            <div className="p-4 rounded-xl bg-navy-900/80 border border-navy-800 text-center space-y-2 card-hover">
              <div className="w-8 h-8 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-500/30 mx-auto flex items-center justify-center font-bold text-xs">2</div>
              <h4 className="text-xs font-bold text-slate-200">Manual Marking</h4>
              <p className="text-[11px] text-slate-400">Reading line-by-line under fatigue</p>
            </div>

            <div className="p-4 rounded-xl bg-navy-900/80 border border-navy-800 text-center space-y-2 card-hover">
              <div className="w-8 h-8 rounded-lg bg-navy-800 text-slate-300 mx-auto flex items-center justify-center font-bold text-xs">3</div>
              <h4 className="text-xs font-bold text-slate-200">Score Calculation</h4>
              <p className="text-[11px] text-slate-400">Manual arithmetic across criteria</p>
            </div>

            <div className="p-4 rounded-xl bg-navy-900/80 border border-navy-800 text-center space-y-2 card-hover">
              <div className="w-8 h-8 rounded-lg bg-rose-950/60 text-rose-400 border border-rose-500/30 mx-auto flex items-center justify-center font-bold text-xs">4</div>
              <h4 className="text-xs font-bold text-slate-200">Generic Feedback</h4>
              <p className="text-[11px] text-slate-400">"Good work" or "Needs improvement"</p>
            </div>

            <div className="p-4 rounded-xl bg-navy-900/80 border border-navy-800 text-center space-y-2 card-hover">
              <div className="w-8 h-8 rounded-lg bg-navy-800 text-slate-300 mx-auto flex items-center justify-center font-bold text-xs">5</div>
              <h4 className="text-xs font-bold text-slate-200">Spreadsheet Entry</h4>
              <p className="text-[11px] text-slate-400">Tedious data entry into portal</p>
            </div>

          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-navy-800/80">
            
            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-navy-900/60 border border-navy-800 card-hover">
              <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Extremely Time-Consuming</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Lecturers spend 40+ hours per assessment cycle manually cross-referencing criteria and drafting redundant notes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-navy-900/60 border border-navy-800 card-hover">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Repeat className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Repetitive & Inconsistent</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Grading fatigue sets in after paper 30, resulting in unintended grading discrepancies across student cohorts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 rounded-xl bg-navy-900/60 border border-navy-800 card-hover">
              <div className="p-2.5 rounded-lg bg-brand-500/10 text-brand-400 shrink-0">
                <MessageSquareOff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Opaque Student Feedback</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Students receive a raw mark like "14/20" without knowing which rubric criteria they failed or how to study better.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
