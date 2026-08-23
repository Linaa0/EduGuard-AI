import React from 'react';
import { 
  ShieldCheck, 
  Eye, 
  HelpCircle, 
  Lock, 
  Scale, 
  UserCheck, 
  AlertTriangle,
  Award
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function ResponsibleAISection() {
  const { t } = useAppState();

  const principles = [
    {
      title: t('responsibleAI.p1.title'),
      desc: t('responsibleAI.p1.desc'),
      icon: UserCheck,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30"
    },
    {
      title: t('responsibleAI.p2.title'),
      desc: t('responsibleAI.p2.desc'),
      icon: Eye,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30"
    },
    {
      title: t('responsibleAI.p3.title'),
      desc: t('responsibleAI.p3.desc'),
      icon: ShieldCheck,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    },
    {
      title: t('responsibleAI.p4.title'),
      desc: t('responsibleAI.p4.desc'),
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30"
    },
    {
      title: t('responsibleAI.p5.title'),
      desc: t('responsibleAI.p5.desc'),
      icon: Lock,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
    },
    {
      title: t('responsibleAI.p6.title'),
      desc: t('responsibleAI.p6.desc'),
      icon: Scale,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30"
    }
  ];

  return (
    <section id="responsible-ai" className="section-wrap section-dark border-t border-white/10">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('responsibleAI.badge')}</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-on-dark">
            {t('responsibleAI.title')}
          </h2>

          <p className="text-base text-on-dark-muted leading-relaxed mb-0">
            {t('responsibleAI.desc')}
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.title}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-lg"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${p.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-900 text-[11px] text-slate-500 font-mono">
                  {t('responsibleAI.standard')}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
