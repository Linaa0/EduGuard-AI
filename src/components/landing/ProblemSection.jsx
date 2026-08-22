import React from 'react';
import { AlertOctagon, Clock, Repeat, MessageSquareOff } from 'lucide-react';

const workflowSteps = [
  { num: 1, title: 'Submissions Pile Up', desc: '100+ PDF essays arrive simultaneously' },
  { num: 2, title: 'Manual Marking', desc: 'Reading line-by-line under fatigue' },
  { num: 3, title: 'Score Calculation', desc: 'Manual arithmetic across criteria' },
  { num: 4, title: 'Generic Feedback', desc: '"Good work" or "Needs improvement"' },
  { num: 5, title: 'Spreadsheet Entry', desc: 'Tedious data entry into portal' },
];

const painPoints = [
  {
    icon: Clock,
    iconClass: 'bg-rose-500/10 text-rose-400',
    title: 'Extremely Time-Consuming',
    desc: 'Lecturers spend 40+ hours per assessment cycle manually cross-referencing criteria and drafting redundant notes.',
  },
  {
    icon: Repeat,
    iconClass: 'bg-accent-amber/10 text-accent-amber',
    title: 'Repetitive & Inconsistent',
    desc: 'Grading fatigue sets in after paper 30, resulting in unintended grading discrepancies across student cohorts.',
  },
  {
    icon: MessageSquareOff,
    iconClass: 'bg-teal/10 text-teal',
    title: 'Opaque Student Feedback',
    desc: 'Students receive a raw mark like "14/20" without knowing which rubric criteria they failed or how to study better.',
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="section-wrap section-dark border-t border-white/10">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold mb-5">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>The Academic Assessment Dilemma</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-dark text-balance">
            Lecturers Are Overwhelmed. Students Are Left in the Dark.
          </h2>

          <p className="text-base sm:text-lg text-on-dark-muted leading-relaxed mt-4 mb-0 prose-width mx-auto">
            University professors juggle hundreds of essay submissions while lecturing, preparing curricula, and calculating grades. In the rush, students receive a standalone numerical score with zero actionable guidance.
          </p>
        </div>

        <div className="rounded-2xl bg-midnight/70 border border-white/10 shadow-cardLg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
              Traditional Manual Grading Workflow
            </span>
            <span className="text-xs text-on-dark-muted">Average: 20 to 30 mins per paper</span>
          </div>

          <div className="workflow-steps workflow-steps--connected mt-8">
            {workflowSteps.map(({ num, title, desc }) => (
              <div key={num} className="stepper-step--dark card-hover text-center">
                <div className="stepper-step-num stepper-step-num--dark mx-auto mb-4">
                  {num}
                </div>
                <h4 className="stepper-step-title--dark">{title}</h4>
                <p className="stepper-step-desc--dark">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
            {painPoints.map(({ icon: Icon, iconClass, title, desc }) => (
              <div key={title} className="flex items-start gap-3.5 p-5 rounded-xl bg-midnight/60 border border-white/10 card-hover h-full">
                <div className={`p-2.5 rounded-lg shrink-0 ${iconClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-dark mb-1">{title}</h4>
                  <p className="text-xs text-on-dark-muted leading-relaxed mb-0">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
