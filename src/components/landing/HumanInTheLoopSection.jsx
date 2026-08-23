import React from 'react';
import { 
  UserCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Edit3, 
  ArrowRight, 
  Lock, 
  Sparkles,
  Sliders,
  Scale
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function HumanInTheLoopSection() {
  const { setCurrentPortal, setLecturerTab, t } = useAppState();

  return (
    <section className="section-wrap section-dark border-t border-white/10">
      <div className="site-container">
        
        {/* Banner Pillar Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('hitl.badge')}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-on-dark">
            {t('hitl.title1')} <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              AI RECOMMENDS → TEACHER DECIDES
            </span>
          </h2>

          <p className="text-base text-slate-400 leading-relaxed">
            {t('hitl.desc')}
          </p>
        </div>

        {/* Visual Proof Card: Override Scenario */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Safeguard Alert Box */}
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-amber-200 uppercase tracking-wide">{t('hitl.safeguardTitle')}</p>
              <p className="text-amber-300/90 leading-relaxed">
                {t('hitl.safeguardDesc')}
              </p>
            </div>
          </div>

          {/* Interactive Comparison: Suggested vs Decided */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Step 1: AI Suggested */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('hitl.aiInitial')}</span>
                <span className="text-xs font-mono text-blue-400">Confidence: 91%</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Understanding of Topic</span>
                  <span className="font-mono">4 / 5</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Quality of Argument</span>
                  <span className="font-mono">4 / 5</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Evidence and Examples</span>
                  <span className="font-mono text-amber-400 font-bold">3 / 5</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Structure and Clarity</span>
                  <span className="font-mono">5 / 5</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400 font-medium">AI Baseline Score</span>
                <span className="font-mono font-bold text-lg text-slate-200">16 / 20 <span className="text-xs font-normal text-slate-500">(80%)</span></span>
              </div>
            </div>

            {/* Step 2: Lecturer Final Decision */}
            <div className="p-5 rounded-xl bg-gradient-to-b from-blue-950/40 to-slate-950 border-2 border-emerald-500/60 shadow-glow-emerald space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  {t('hitl.lecturerReview')}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {t('hitl.finalGrade')}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Understanding of Topic</span>
                  <span className="font-mono">4 / 5</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Quality of Argument</span>
                  <span className="font-mono">4 / 5</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-300 bg-emerald-950/40 p-1.5 rounded border border-emerald-500/30 font-medium">
                  <span className="flex items-center gap-1">
                    <Edit3 className="w-3 h-3 text-emerald-400" />
                    Evidence & Examples (Overridden)
                  </span>
                  <span className="font-mono font-bold text-emerald-400">4 / 5 (+1)</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Structure and Clarity</span>
                  <span className="font-mono">5 / 5</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs text-emerald-300 font-semibold">{t('hitl.teacherGrade')}</span>
                <span className="font-mono font-bold text-xl text-emerald-400">17 / 20 <span className="text-xs font-semibold text-emerald-500">(85%)</span></span>
              </div>
            </div>

          </div>

          {/* Teacher Commentary Preview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <p className="text-xs font-semibold text-slate-300">{t('hitl.remarkTitle')}</p>
            <p className="text-xs text-slate-400 italic">
              {t('hitl.remarkDesc')}
            </p>
          </div>

          {/* Action CTA */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setCurrentPortal('lecturer');
                setLecturerTab('human-review');
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-900/30 transition-all hover:scale-105"
            >
              <span>{t('hitl.cta')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
