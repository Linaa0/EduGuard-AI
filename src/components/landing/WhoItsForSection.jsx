import React from 'react';
import { GraduationCap, UserCheck, Building2, Users } from 'lucide-react';

const audiences = [
  {
    icon: UserCheck,
    title: 'Lecturers & Professors',
    iconClass: 'bg-primary-50 text-primary border-primary-200',
    benefits: [
      'Cut grading time with rubric-aligned AI pre-assessment',
      'Retain full authority over every mark and comment',
      'Track class performance with criterion-level analytics',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Students',
    iconClass: 'bg-teal-50 text-teal-700 border-teal-200',
    benefits: [
      'See exactly how each rubric criterion was scored',
      'Receive actionable strengths and improvement areas',
      'Access curated resources matched to feedback gaps',
    ],
  },
  {
    icon: Building2,
    title: 'Administrators',
    iconClass: 'bg-accent-amber50 text-accent-amber600 border-accent-amber200',
    benefits: [
      'Monitor adoption and assessment throughput institution-wide',
      'Audit AI recommendations with full transparency logs',
      'Configure departments, courses, and access policies',
    ],
  },
  {
    icon: Users,
    title: 'Parents & Guardians',
    iconClass: 'bg-success-50 text-success border-success-200',
    benefits: [
      'Follow authorized student progress and grade trends',
      'Review published feedback summaries in plain language',
      'Stay informed with attendance and performance alerts',
    ],
  },
];

export default function WhoItsForSection() {
  return (
    <section id="who-its-for" className="section-wrap section-light bg-cream border-t border-divider">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow eyebrow-primary">Stakeholders</span>
          <h2 className="section-title text-3xl sm:text-4xl text-balance">
            Built for Every Role in Academic Assessment
          </h2>
          <p className="section-lede">
            EduGuard AI serves lecturers, students, administrators, and guardians with role-specific workflows grounded in the same transparent assessment pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map(({ icon: Icon, title, iconClass, benefits }) => (
            <div key={title} className="who-card h-full flex flex-col">
              <div className={`who-card__icon border ${iconClass}`}>
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <h3 className="who-card__title">{title}</h3>
              <ul className="who-card__benefit flex-1">
                {benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
