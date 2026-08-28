import React from 'react';
import { Clock, TrendingUp, MessageSquare, Globe2 } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function ImpactSection() {
  const { t } = useAppState();

  const stats = [
    {
      value: t('impact.stat1.value'),
      label: t('impact.stat1.label'),
      accent: 'stat-card--teal-accent',
    },
    {
      value: t('impact.stat2.value'),
      label: t('impact.stat2.label'),
      accent: 'stat-card--primary-accent',
    },
    {
      value: t('impact.stat3.value'),
      label: t('impact.stat3.label'),
      accent: 'stat-card--amber-accent',
    },
    {
      value: t('impact.stat4.value'),
      label: t('impact.stat4.label'),
      accent: 'stat-card--teal-accent',
    },
  ];

  const impacts = [
    {
      icon: Clock,
      iconBg: 'bg-teal text-midnight',
      title: t('impact.i1.title'),
      desc: t('impact.i1.desc'),
    },
    {
      icon: TrendingUp,
      iconBg: 'bg-primary text-white',
      title: t('impact.i2.title'),
      desc: t('impact.i2.desc'),
    },
    {
      icon: MessageSquare,
      iconBg: 'bg-accent-amber text-midnight',
      title: t('impact.i3.title'),
      desc: t('impact.i3.desc'),
    },
    {
      icon: Globe2,
      iconBg: 'bg-success text-white',
      title: t('impact.i4.title'),
      desc: t('impact.i4.desc'),
    },
  ];

  return (
    <section id="impact" className="section-wrap section-light bg-cream dark:bg-slate-900 border-t border-divider dark:border-slate-800">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow">{t('impact.eyebrow')}</span>
          <h2 className="section-title text-3xl sm:text-4xl text-balance dark:text-white">
            {t('impact.title')}
          </h2>
          <p className="section-lede dark:text-slate-400">
            {t('impact.desc')}
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
