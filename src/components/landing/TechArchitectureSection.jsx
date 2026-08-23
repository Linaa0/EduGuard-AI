import React from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  Server, 
  Workflow, 
  Cloud, 
  Code, 
  ArrowDown,
  Terminal,
  ShieldCheck
} from 'lucide-react';

import { useAppState } from '../../context/AppStateContext';

export default function TechArchitectureSection() {
  const { t } = useAppState();
  const stackLayers = [
    { layer: "FRONTEND LAYER", layerKey: 'frontend', icon: Code, color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400" },
    { layer: "BACKEND API LAYER", layerKey: 'backend', icon: Server, color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400" },
    { layer: "AI AGENT & LLM LAYER", layerKey: 'ai', icon: Cpu, color: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400" },
    { layer: "RAG & VECTOR SEARCH", layerKey: 'rag', icon: Database, color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400" },
    { layer: "RELATIONAL DATABASE", layerKey: 'db', icon: Database, color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400" },
    { layer: "WORKFLOW AUTOMATION", layerKey: 'workflow', icon: Workflow, color: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400" },
    { layer: "CONTAINER & CLOUD", layerKey: 'cloud', icon: Cloud, color: "from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-300" }
  ];

  const tools = [
    { name: "get_assignment", desc: "Fetches assignment requirements and scoring constraints" },
    { name: "get_rubric", desc: "Retrieves 4-criterion grading matrix from database" },
    { name: "analyze_submission", desc: "Parses PDF/text and partitions into semantic chunks" },
    { name: "evaluate_criteria", desc: "Measures semantic alignment against each rubric criterion" },
    { name: "calculate_score", desc: "Computes mathematically weighted baseline scores" },
    { name: "generate_feedback", desc: "Drafts pedagogical strengths and actionable improvements" },
    { name: "check_confidence", desc: "Performs uncertainty calibration and hallucination checks" },
  ];

  return (
    <section className="section-wrap section-light bg-white border-t border-divider">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>{t('tech.badge')}</span>
          </div>

          <h2 className="section-title text-3xl sm:text-4xl text-balance">
            {t('tech.title')}
          </h2>

          <p className="section-lede mb-0">
            {t('tech.desc')}
          </p>
        </div>

        {/* Architecture Stack & Tools Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 7-Layer Flow Architecture */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">{t('tech.systemStack')}</span>
              <span className="text-xs text-blue-400 font-mono">{t('tech.endToEnd')}</span>
            </div>

            <div className="space-y-2.5">
              {stackLayers.map((layer, idx) => {
                const Icon = layer.icon;
                return (
                  <div key={layer.layer} className="relative">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${layer.color} bg-slate-900 border flex items-start gap-3.5`}>
                      <div className="p-2 rounded-lg bg-slate-950/80 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">{t(`tech.${layer.layerKey}.layer`)}</span>
                          <span className="text-xs font-mono font-bold text-white">{t(`tech.${layer.layerKey}.tech`)}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{t(`tech.${layer.layerKey}.desc`)}</p>
                      </div>
                    </div>

                    {idx < stackLayers.length - 1 && (
                      <div className="flex justify-center my-0.5">
                        <ArrowDown className="w-3 h-3 text-slate-600" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: AI Agent Tool Suite */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">{t('tech.agentRegistry')}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {t('tech.toolsRegistered')}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {t('tech.agentDesc')}
              </p>

              <div className="space-y-2">
                {tools.map((t, idx) => (
                  <div key={t.name} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-400">tool_{idx+1}: {t.name}()</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    </div>
                    <p className="text-[11px] text-slate-400">{t.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                {t('tech.ragInfo')}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
