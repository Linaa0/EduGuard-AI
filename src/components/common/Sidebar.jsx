import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Sparkles,
  ListTree,
  UserCheck,
  MessageSquareQuote,
  Users,
  BarChart3,
  BookOpen,
  Settings,
  PlusCircle,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export default function Sidebar() {
  const { 
    lecturerTab, 
    setLecturerTab, 
    setIsCreateAssignmentOpen,
    setCurrentPortal,
    setStudentTab,
    t
  } = useAppState();

  const navItems = [
    { id: 'dashboard', label: t('sidebar.nav.dashboard'), icon: LayoutDashboard },
    { id: 'assignments', label: t('sidebar.nav.assignments'), icon: FileText, badge: '8' },
    { id: 'submissions', label: t('sidebar.nav.submissions'), icon: Inbox, badge: '28' },
    { id: 'ai-assessment', label: t('sidebar.nav.aiAssessments'), icon: Sparkles, highlight: true },
    { id: 'human-review', label: t('sidebar.nav.humanReview'), icon: UserCheck, alertBadge: '3' },
    { id: 'rubrics', label: t('sidebar.nav.rubrics'), icon: ListTree },
    { id: 'feedback', label: t('sidebar.nav.feedback'), icon: MessageSquareQuote },
    { id: 'students', label: t('sidebar.nav.students'), icon: Users, badge: '130' },
    { id: 'analytics', label: t('sidebar.nav.analytics'), icon: BarChart3 },
    { id: 'resources', label: t('sidebar.nav.resources'), icon: BookOpen },
    { id: 'settings', label: t('sidebar.nav.settings'), icon: Settings },
  ];

  return (
    <aside className="w-64 bg-navy-900 dark:bg-slate-900 border-r border-navy-800 dark:border-slate-700 flex flex-col justify-between shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto text-slate-300">
      
      <div className="p-4 space-y-4">
        
        <button
          onClick={() => setIsCreateAssignmentOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md shadow-brand-900/30 transition-all hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('sidebar.createAssignment')}</span>
        </button>

        <div className="p-3 rounded-xl bg-navy-800/60 dark:bg-slate-800 border border-navy-700/60 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-400">{t('sidebar.currentCourse')}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-900/40 text-brand-300 border border-brand-700/40 font-mono">ENV-101</span>
          </div>
          <h3 className="text-xs font-bold text-white mt-1 leading-snug">Intro to Environmental Studies</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Section A · 130 Students</p>
        </div>

        <nav className="space-y-1 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = lecturerTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setLecturerTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-brand-600/20 text-brand-400 font-semibold border-l-4 border-brand-500 rounded-l-none pl-2.5 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-navy-800/60 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.alertBadge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse-soft">
                    {item.alertBadge}
                  </span>
                )}

                {item.badge && !item.alertBadge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-navy-800 dark:bg-slate-700 text-slate-400 border border-navy-700 dark:border-slate-600">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 space-y-3 border-t border-navy-800/80 dark:border-slate-700 bg-navy-950/40 dark:bg-slate-950/40">
        
        <div className="p-2.5 rounded-lg bg-gradient-to-r from-brand-950/40 to-navy-900 dark:from-slate-800 dark:to-slate-900 border border-brand-500/30 dark:border-slate-600">
          <div className="flex items-center gap-1.5 text-brand-400 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('sidebar.humanLoop')}</span>
          </div>
          <p className="text-[10px] text-slate-300 mt-1 font-mono tracking-tight">
            {t('sidebar.humanLoopDesc')}
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentPortal('student');
            setStudentTab('dashboard');
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-navy-800/70 dark:bg-slate-800 hover:bg-navy-800 dark:hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-navy-700/50 dark:border-slate-600 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{t('sidebar.switchStudent')}</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

    </aside>
  );
}
