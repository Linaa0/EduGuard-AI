import React from 'react';
import {
  FilePlus,
  ListTree,
  UploadCloud,
  Cpu,
  UserCheck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function HowItWorksSection() {
  const { startDemoTour } = useAppState();

  const steps = [
    {
      step: '01',
      title: 'Lecturer Creates Assignment',
      desc: 'Define course learning outcomes, assignment guidelines, submission limits, and deadline parameters.',
      icon: FilePlus,
      highlight: 'ENV-101: Climate Change Essay',
      accent: 'primary',
    },
    {
      step: '02',
      title: 'Lecturer Defines Rubric',
      desc: 'Upload or configure a 4-criterion grading matrix with custom point distributions and scoring descriptors.',
      icon: ListTree,
      highlight: '4 Criteria · 20 Marks Total',
      accent: 'primary',
    },
    {
      step: '03',
      title: 'Student Submits Work',
      desc: 'Students upload their essay or report via the secure student portal with instant document parsing.',
      icon: UploadCloud,
      highlight: 'Jean_Claude_Essay.pdf',
      accent: 'primary',
    },
    {
      step: '04',
      title: 'AI Evaluates Submission',
      desc: 'Autonomous 7-tool agent analyzes semantic alignment, assigns criterion scores, and drafts feedback with confidence calibration.',
      icon: Cpu,
      highlight: '16/20 · 91% Confidence',
      accent: 'teal',
    },
    {
      step: '05',
      title: 'Lecturer Approves / Modifies',
      desc: 'Lecturer reviews the breakdown, overrides any score if needed, adds personalized comments, and publishes the final grade.',
      icon: UserCheck,
      highlight: 'Teacher Final: 17/20 (85%)',
      accent: 'amber',
    },
  ];

  const badgeClass = (accent) => {
    if (accent === 'teal') return 'stepper-step-num--teal';
    if (accent === 'amber') return 'stepper-step-num--amber';
    return 'stepper-step-num--primary';
  };

  const cardBorder = (accent) => {
    if (accent === 'teal') return 'border-teal/40 shadow-glow';
    if (accent === 'amber') return 'border-accent-amber/40';
    return 'border-divider';
  };

  return (
    <section id="how-it-works" className="section-wrap section-light bg-cream border-t border-divider">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow eyebrow-primary">Process</span>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl text-balance">
            How EduGuard AI Transforms Assessment
          </h2>
          <p className="section-lede">
            From rubric specification to student feedback, experience a transparent human-in-the-loop workflow designed for university rigor.
          </p>
        </div>

        <div className="workflow-steps workflow-steps--connected">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className={`stepper-step card-hover h-full flex flex-col border-2 ${cardBorder(s.accent)}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`stepper-step-num ${badgeClass(s.accent)} !mb-0`}>
                    {s.step}
                  </span>
                  <Icon className={`w-5 h-5 ${s.accent === 'teal' ? 'text-teal-700' : s.accent === 'amber' ? 'text-accent-amber600' : 'text-primary'}`} />
                </div>

                <h3 className="stepper-step-title">{s.title}</h3>
                <p className="stepper-step-desc flex-1">{s.desc}</p>

                <div className="mt-6 pt-3 border-t border-divider">
                  <span className="text-[11px] font-mono font-medium text-slategray block truncate">
                    {s.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 card p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 border-primary/15">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-sm font-bold text-charcoal flex items-center justify-center sm:justify-start gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-teal" />
              <span>Experience the Complete 5-Step Workflow in Real Time</span>
            </h4>
            <p className="text-xs text-slategray mb-0">
              Run the simulated evaluation pipeline with Jean Claude&apos;s sample essay.
            </p>
          </div>
          <button onClick={startDemoTour} className="btn btn-primary shrink-0">
            <span>Launch Interactive Tour</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
