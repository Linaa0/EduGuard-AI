import React from 'react';
import { GraduationCap, UserCheck, Building2, Users } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function WhoItsForSection() {
  const { t } = useAppState();

  const audiences = [
    {
      icon: UserCheck,
      title: t('whoIt.lecturers.title'),
      iconClass: 'bg-primary-50 text-primary border-primary-200',
      benefits: [
        t('whoIt.lecturers.b1'),
        t('whoIt.lecturers.b2'),
        t('whoIt.lecturers.b3'),
      ],
    },
    {
      icon: GraduationCap,
      title: t('whoIt.students.title'),
      iconClass: 'bg-teal-50 text-teal-700 border-teal-200',
      benefits: [
        t('whoIt.students.b1'),
        t('whoIt.students.b2'),
        t('whoIt.students.b3'),
      ],
    },
    {
      icon: Building2,
      title: t('whoIt.admins.title'),
      iconClass: 'bg-accent-amber50 text-accent-amber600 border-accent-amber200',
      benefits: [
        t('whoIt.admins.b1'),
        t('whoIt.admins.b2'),
        t('whoIt.admins.b3'),
      ],
    },
    {
      icon: Users,
      title: t('whoIt.parents.title'),
      iconClass: 'bg-success-50 text-success border-success-200',
      benefits: [
        t('whoIt.parents.b1'),
        t('whoIt.parents.b2'),
        t('whoIt.parents.b3'),
      ],
    },
  ];

  return (
    <section id="who-its-for" className="section-wrap section-light bg-cream border-t border-divider">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow eyebrow-primary">{t('whoIt.eyebrow')}</span>
          <h2 className="section-title text-3xl sm:text-4xl text-balance">
            {t('whoIt.title')}
          </h2>
          <p className="section-lede">
            {t('whoIt.desc')}
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
