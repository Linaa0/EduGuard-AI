import React, { useState } from 'react';
import { 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  Sparkles, 
  RotateCw, 
  Play, 
  Layers, 
  ShieldCheck,
  ChevronRight,
  Database,
  Search
} from 'lucide-react';
import { agentToolSteps } from '../../data/mockData';
import { useAppState } from '../../context/AppStateContext';

export default function AIAgentSection() {
  const { setCurrentPortal, setLecturerTab } = useAppState();
  const [activeStep, setActiveStep] = useState(7);
  const [isRunning, setIsRunning] = useState(false);

  const runLandingSimulation = () => {
    setIsRunning(true);
    setActiveStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);
      if (step >= agentToolSteps.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 500);
  };

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Autonomous Tool Execution Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            The AI Assessment Agent
          </h2>

          <p className="text-base text-slate-400 leading-relaxed">
            EduGuard AI does not use a black-box prompt. It employs a multi-step deterministic agent equipped with 7 specialized tools to parse, cross-reference, and evaluate submissions against the lecturer's rubric.
          </p>
        </div>

        {/* Live Simulation Card */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="font-mono text-xs text-slate-400 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                eduguard-agent --eval --submission=Jean_Claude_ENV101.pdf
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={runLandingSimulation}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all disabled:opacity-50"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? 'Executing Tools...' : 'Re-Run Pipeline'}</span>
              </button>
            </div>
          </div>

          {/* Body: 7 Tool Execution Flow + Live Output Badge */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: 7 Tool Step Cards */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Agent Tool Chain</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {activeStep} of 7 Tools Completed
                </span>
              </div>

              {agentToolSteps.map((tool, idx) => {
                const isCompleted = idx < activeStep;
                const isCurrent = idx === activeStep && isRunning;

                return (
                  <div
                    key={tool.name}
                    className={`p-3.5 rounded-xl border transition-all duration-200 ${
                      isCurrent
                        ? 'bg-blue-950/40 border-blue-500 shadow-glow'
                        : isCompleted
                          ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-950/40 border-slate-900 opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold ${
                          isCompleted ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isCompleted ? '✓' : idx + 1}
                        </div>
                        <div>
                          <p className="text-xs font-mono font-bold text-white tracking-wide">{tool.name}()</p>
                          <p className="text-[11px] text-slate-400">{tool.title}</p>
                        </div>
                      </div>

                      {isCompleted && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                          {tool.duration}
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-blue-400 animate-pulse">Running...</span>
                      )}
                    </div>

                    {isCompleted && (
                      <div className="mt-2 pt-2 border-t border-slate-800/80 font-mono text-[11px] text-slate-300">
                        → {tool.output}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Synthesis Outcome Card */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/40 p-6 space-y-5 shadow-glow">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">AI Assessment Result</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    CALIBRATED
                  </span>
                </div>

                {/* Score Big Display */}
                <div className="text-center py-2 space-y-1">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Suggested Score</span>
                  <div className="text-5xl font-extrabold text-white font-mono tracking-tight">
                    16 <span className="text-xl font-normal text-slate-400">/ 20</span>
                  </div>
                  <p className="text-xs text-blue-400 font-medium">80% Baseline Assessment</p>
                </div>

                {/* Confidence Bar */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold">Agent Confidence Level</span>
                    <span className="font-mono font-bold text-emerald-400">91% (High)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-700" style={{ width: '91%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight pt-1">
                    ✓ High semantic match with rubrics • Low hallucination uncertainty • Ready for Lecturer Approval.
                  </p>
                </div>

                {/* Criterion Breakdown Pills */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Understanding of Topic</span>
                    <span className="font-mono font-semibold text-blue-400">4 / 5</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Quality of Argument</span>
                    <span className="font-mono font-semibold text-blue-400">4 / 5</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Evidence & Examples</span>
                    <span className="font-mono font-semibold text-amber-400">3 / 5</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Structure & Clarity</span>
                    <span className="font-mono font-semibold text-blue-400">5 / 5</span>
                  </div>
                </div>

              </div>

              {/* Moderation Link */}
              <button
                onClick={() => {
                  setCurrentPortal('lecturer');
                  setLecturerTab('human-review');
                }}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <span>Proceed to Human-in-the-Loop Review</span>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
