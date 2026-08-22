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
  { step: 1, titleKey: 'tour.steps.1.title', descKey: 'tour.steps.1.desc' },
  { step: 2, titleKey: 'tour.steps.2.title', descKey: 'tour.steps.2.desc' },
  { step: 3, titleKey: 'tour.steps.3.title', descKey: 'tour.steps.3.desc' },
  { step: 4, titleKey: 'tour.steps.4.title', descKey: 'tour.steps.4.desc' },
  { step: 5, titleKey: 'tour.steps.5.title', descKey: 'tour.steps.5.desc' },
  { step: 6, titleKey: 'tour.steps.6.title', descKey: 'tour.steps.6.desc' },
  { step: 7, titleKey: 'tour.steps.7.title', descKey: 'tour.steps.7.desc' },
  { step: 8, titleKey: 'tour.steps.8.title', descKey: 'tour.steps.8.desc' },
  { step: 9, titleKey: 'tour.steps.9.title', descKey: 'tour.steps.9.desc' },
  { step: 10, titleKey: 'tour.steps.10.title', descKey: 'tour.steps.10.desc' },
];

export default function DemoTourBar() {
  const { 
    isDemoTourActive, 
    demoTourStep, 
    nextDemoStep, 
    prevDemoStep, 
    goToDemoStep, 
    endDemoTour,
    t
  } = useAppState();

  if (!isDemoTourActive) return null;

  const currentInfo = tourStepsInfo.find(s => s.step === demoTourStep) || tourStepsInfo[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-slate-900/98 dark:bg-slate-950/98 backdrop-blur-xl border-t border-blue-500/40 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Step Badge & Info */}
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-400/40">
            {demoTourStep}/10
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {t('tour.label')}
              </span>
              <Circle className="w-1.5 h-1.5 text-slate-500 fill-current" />
              <span className="text-xs text-slate-300 font-medium">{t('tour.stepOf').replace('{n}', demoTourStep)}</span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">{t(currentInfo.titleKey)}</h4>
            <p className="text-xs text-slate-300 line-clamp-1">{t(currentInfo.descKey)}</p>
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
                title={t(s.titleKey)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  s.step === demoTourStep 
                    ? 'w-6 bg-blue-500' 
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
              <span className="hidden sm:inline">{t('tour.prev')}</span>
            </button>

            <button
              onClick={nextDemoStep}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-900/40 transition-all hover:scale-105"
            >
              <span>{demoTourStep === 10 ? t('tour.finish') : t('tour.next')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={endDemoTour}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              title={t('tour.close')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
