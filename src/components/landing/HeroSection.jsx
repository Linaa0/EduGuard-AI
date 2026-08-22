import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  Play,
  Cpu,
} from 'lucide-react';

export default function HeroSection({ onHowItWorks }) {
  const { setCurrentPortal, setLecturerTab, startDemoTour } = useAppState();

  return (
    <section id="top" className="section-dark hero-bg relative overflow-hidden pt-24 pb-28 sm:pt-28 sm:pb-32">
      <div className="site-container relative z-10">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight/80 border border-teal/30 text-teal text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AI-Powered Academic Assessment & Feedback Platform</span>
            <span className="bg-primary text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ml-1">STP &apos;26</span>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto space-y-7">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-dark leading-[1.08] text-balance">
            AI Assesses.{' '}
            <span className="text-accent-amber">Teachers Decide.</span>{' '}
            Students Understand.
          </h1>

          <p className="text-base sm:text-lg text-on-dark-muted max-w-3xl mx-auto leading-relaxed prose-width mx-auto">
            AI-powered academic assessment and feedback that helps university lecturers assess faster with their own marking rubrics, while empowering students with criterion-level explanations to improve.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={startDemoTour}
              className="btn btn-primary btn-lg w-full sm:w-auto"
            >
              <Play className="w-4 h-4" />
              <span>Explore Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onHowItWorks}
              className="btn btn-secondary btn-lg w-full sm:w-auto !bg-midnight/60 !border-white/15 !text-on-dark hover:!bg-midnight/80 hover:!text-white"
            >
              <Cpu className="w-4 h-4 text-teal" />
              <span>How It Works</span>
            </button>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
          <div className="hero-mockup p-2">
            <div className="flex items-center justify-between px-4 py-3 bg-midnight/90 rounded-t-xl border-b border-white/10 text-xs text-on-dark-muted">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-accent-amber/80" />
                <span className="w-3 h-3 rounded-full bg-success/80" />
                <span className="ml-3 font-mono text-[11px] hidden sm:inline text-on-dark-muted">
                  eduguard.univ.edu/lecturer/human-review/ENV-101
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-teal/15 text-teal text-[10px] font-mono border border-teal/30">
                AI RECOMMENDATION ACTIVE
              </span>
            </div>

            <div className="p-4 sm:p-6 bg-midnight rounded-b-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal">Submission Evaluation</span>
                    <h3 className="text-base font-bold text-on-dark mt-0.5 mb-0">Jean Claude: Climate Change Essay</h3>
                    <p className="text-xs text-on-dark-muted mb-0">ENV-101 · Introduction to Environmental Studies</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-on-dark font-mono">
                      16 <span className="text-sm font-normal text-on-dark-muted">/ 20</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 91% AI Confidence
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    ['Understanding of Topic', 'Strong comprehension of anthropogenic greenhouse drivers.', '4 / 5'],
                    ['Quality of Argument', 'Well-reasoned thesis on adaptation vs mitigation.', '4 / 5'],
                  ].map(([title, desc, score]) => (
                    <div key={title} className="p-2.5 rounded-lg bg-midnight/80 border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-on-dark mb-0">{title}</p>
                        <p className="text-[11px] text-on-dark-muted mb-0">{desc}</p>
                      </div>
                      <span className="font-mono font-bold text-teal px-2 py-1 bg-midnight rounded">{score}</span>
                    </div>
                  ))}

                  <div className="p-2.5 rounded-lg bg-teal/10 border border-teal/30 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-on-dark mb-0">Evidence & Examples</p>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-accent-amber/20 text-accent-amber">Teacher Adjusted</span>
                      </div>
                      <p className="text-[11px] text-on-dark-muted mb-0">Dr. Alice awarded +1 mark for regional agroforestry case studies.</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-on-dark-muted line-through">3/5</span>
                      <span className="font-mono font-bold text-success px-2 py-1 bg-success/10 border border-success/30 rounded">4 / 5</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-midnight/80 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-on-dark mb-0">Structure and Clarity</p>
                      <p className="text-[11px] text-on-dark-muted mb-0">Logical academic organization and strong concluding synthesis.</p>
                    </div>
                    <span className="font-mono font-bold text-teal px-2 py-1 bg-midnight rounded">5 / 5</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-xl bg-midnight/70 border border-accent-amber/30 p-5 space-y-4">
                <div className="flex items-center gap-2 text-accent-amber text-xs font-bold uppercase tracking-wider">
                  <UserCheck className="w-4 h-4" />
                  <span>Lecturer Decision</span>
                </div>

                <div className="p-3 rounded-lg bg-accent-amber/10 border border-accent-amber/25">
                  <p className="text-[11px] text-on-dark leading-relaxed font-medium mb-0">
                    AI recommends baseline marks based on your rubric. You retain complete authority over every mark and personalized note.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-on-dark-muted">AI Suggested:</span>
                    <span className="font-mono text-on-dark">16 / 20 (80%)</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-on-dark">Lecturer Final Grade:</span>
                    <span className="font-mono text-success text-sm font-bold">17 / 20 (85%)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <button
                    onClick={() => {
                      setCurrentPortal('lecturer');
                      setLecturerTab('human-review');
                    }}
                    className="btn btn-teal w-full !text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Publish to Student</span>
                  </button>
                </div>

                <p className="text-[10px] text-center text-on-dark-muted italic mb-0">
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
