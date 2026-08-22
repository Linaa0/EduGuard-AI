import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Cpu, 
  Terminal, 
  RotateCw, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Database,
  BarChart2,
  FileText,
  UserCheck
} from 'lucide-react';
import { agentToolSteps } from '../../data/mockData';

export default function AIAssessmentAgentView() {
  const { 
    isAiRunning, 
    currentToolIndex, 
    aiCompleted, 
    runAiAssessmentSimulation, 
    setLecturerTab,
    submission
  } = useAppState();

  const criteriaBreakdown = [
    {
      name: "Understanding of Topic",
      score: 4,
      max: 5,
      comment: "Demonstrates a strong understanding of the major causes and effects of climate change.",
      color: "bg-blue-600",
      pct: "80%"
    },
    {
      name: "Quality of Argument",
      score: 4,
      max: 5,
      comment: "The argument is clear and generally well supported, although some claims could be developed further.",
      color: "bg-blue-600",
      pct: "80%"
    },
    {
      name: "Evidence and Examples",
      score: 3,
      max: 5,
      comment: "Relevant examples are included, but additional evidence and supporting sources would strengthen the response.",
      color: "bg-amber-500",
      pct: "60%"
    },
    {
      name: "Structure and Clarity",
      score: 5,
      max: 5,
      comment: "The submission has a clear introduction, logical organization, and strong conclusion.",
      color: "bg-emerald-600",
      pct: "100%"
    }
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-cream dark:bg-slate-900 min-h-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-divider dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-white tracking-tight">AI Assessment Agent</h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              EjoChat + Qdrant RAG Online
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slategray dark:text-slate-400 mt-1">
            Evaluating: <strong>Jean_Claude_Climate_Change_Essay.pdf</strong> (Student ID: STU-8821)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runAiAssessmentSimulation}
            disabled={isAiRunning}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <RotateCw className={`w-4 h-4 text-amber-400 ${isAiRunning ? 'animate-spin' : ''}`} />
            <span>{isAiRunning ? 'Executing Pipeline...' : 'Re-Run Evaluation'}</span>
          </button>

          <button
            onClick={() => setLecturerTab('human-review')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all hover:scale-105"
          >
            <UserCheck className="w-4 h-4" />
            <span>Open Lecturer Review</span>
          </button>
        </div>
      </div>

      {/* Main Agent Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Columns: Autonomous Tool Execution Pipeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl overflow-hidden">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-mono text-slate-400 ml-2">pipeline/assess_rubric_v2.py</span>
              </div>
              <span className="font-mono text-[11px] text-blue-400">
                {currentToolIndex} / 7 Tools Executed
              </span>
            </div>

            {/* Tool Steps List */}
            <div className="p-4 space-y-2.5">
              {agentToolSteps.map((tool, idx) => {
                const isDone = idx < currentToolIndex;
                const isCurrent = idx === currentToolIndex && isAiRunning;

                return (
                  <div
                    key={tool.name}
                    className={`p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-blue-950/40 border-blue-500 shadow-glow'
                        : isDone
                          ? 'bg-slate-950/70 border-slate-800'
                          : 'bg-slate-950/20 border-slate-900 opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[11px] font-bold ${
                          isDone ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-800 text-slategray dark:text-slate-400'
                        }`}>
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <span className="font-mono text-xs font-bold text-white">{tool.name}</span>
                        <span className="text-[11px] text-slate-400 hidden sm:inline">• {tool.title.split('. ')[1]}</span>
                      </div>

                      {isDone && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/30">
                          {tool.duration}
                        </span>
                      )}
                    </div>

                    {isDone && (
                      <div className="mt-1.5 pt-1.5 border-t border-slate-800/60 font-mono text-[11px] text-slate-300">
                        {tool.output}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pipeline Status Footer */}
            <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {aiCompleted ? 'Assessment Pipeline Complete' : 'Executing Tool Sequence...'}
              </span>
              <span className="font-mono text-[11px]">RAG: Qdrant / LLM: EjoChat</span>
            </div>

          </div>
        </div>

        {/* Right 5 Columns: Result Synthesis & Visual Score Chart */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Top Result Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-subtle space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-divider dark:border-slate-700">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AI Assessment Result</span>
                <h3 className="text-base font-bold text-charcoal dark:text-white">Climate Change Essay</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                91% Confidence
              </span>
            </div>

            <div className="text-center py-2 bg-cream-50 dark:bg-slate-700 rounded-xl border border-divider dark:border-slate-700">
              <span className="text-xs text-slategray dark:text-slate-400 uppercase tracking-wider font-semibold">Suggested Score</span>
              <div className="text-4xl font-extrabold text-charcoal dark:text-white font-mono mt-1">
                16 <span className="text-base font-normal text-slate-400">/ 20</span>
              </div>
              <p className="text-xs text-blue-600 font-semibold mt-0.5">80% Baseline Assessment</p>
            </div>

            {/* Visual Criteria Breakdown with Bars */}
            <div className="space-y-3 pt-1">
              <span className="text-xs font-bold text-charcoal dark:text-slate-200 uppercase tracking-wider block">Criterion-Level Evaluation</span>
              
              {criteriaBreakdown.map((crit) => (
                <div key={crit.name} className="p-3 rounded-xl bg-cream-50 dark:bg-slate-700 border border-divider dark:border-slate-700/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-charcoal dark:text-slate-200">{crit.name}</span>
                    <span className="font-mono font-bold text-charcoal dark:text-white">{crit.score} / {crit.max}</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className={`h-full rounded-full ${crit.color}`} style={{ width: crit.pct }}></div>
                  </div>

                  <p className="text-[11px] text-slategray dark:text-slate-400 leading-snug pt-0.5">
                    "{crit.comment}"
                  </p>
                </div>
              ))}
            </div>

            {/* Moderation Banner Callout */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Lecturer Review Required</span>
              </p>
              <p className="text-[11px] text-amber-700 leading-relaxed">
                AI scores are recommendations only. You can adjust individual criteria marks on the review screen.
              </p>
            </div>

            {/* Proceed Action Button */}
            <button
              onClick={() => setLecturerTab('human-review')}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <span>Proceed to Human-in-the-Loop Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
