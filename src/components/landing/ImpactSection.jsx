import React from 'react';
import { Clock, TrendingUp, MessageSquare, Globe2 } from 'lucide-react';

const stats = [
  {
    value: '70%',
    label: 'Reduction in lecturer grading time per assessment cycle',
    accent: 'stat-card--teal-accent',
  },
  {
    value: '4×',
    label: 'Faster turnaround from submission to published feedback',
    accent: 'stat-card--primary-accent',
  },
  {
    value: '100%',
    label: 'Human approval required before any grade reaches a student',
    accent: 'stat-card--amber-accent',
  },
  {
    value: 'SDG 4',
    label: 'Aligned with Quality Education goals for Rwanda and beyond',
    accent: 'stat-card--teal-accent',
  },
];

const impacts = [
  {
    icon: Clock,
    iconBg: 'bg-teal text-midnight',
    title: 'Time Returned to Teaching',
    desc: 'Lecturers spend less time on repetitive marking and more on mentorship, research, and curriculum design.',
  },
  {
    icon: TrendingUp,
    iconBg: 'bg-primary text-white',
    title: 'Consistent, Rubric-Anchored Scoring',
    desc: 'Criterion-level evaluation reduces grading drift and gives every student the same transparent standard.',
  },
  {
    icon: MessageSquare,
    iconBg: 'bg-accent-amber text-midnight',
    title: 'Feedback Students Can Act On',
    desc: 'Students receive specific strengths, gaps, and resources instead of a standalone numerical score.',
  },
  {
    icon: Globe2,
    iconBg: 'bg-success text-white',
    title: 'Institutional Scale',
    desc: 'Designed for university deployment with audit trails, role-based access, and responsible AI governance.',
  },
];

export default function ImpactSection() {
  return (
    <section id="impact" className="section-wrap section-light bg-white border-t border-divider">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow">Measurable Outcomes</span>
          <h2 className="section-title text-3xl sm:text-4xl text-balance">
            Impact on Academic Assessment
          </h2>
          <p className="section-lede">
            EduGuard AI targets the bottlenecks that slow down lecturers and leave students without meaningful guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {stats.map(({ value, label, accent }) => (
            <div key={label} className={`stat-card h-full ${accent}`}>
              <p className="stat-number">{value}</p>
              <p className="stat-label">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {impacts.map(({ icon: Icon, iconBg, title, desc }) => (
            <div key={title} className="trust-card h-full">
              <div className={`trust-card__icon ${iconBg}`}>
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <h3 className="trust-card__title">{title}</h3>
              <p className="trust-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
