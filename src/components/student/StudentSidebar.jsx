import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  LayoutDashboard, 
  FileText, 
  UploadCloud, 
  Award, 
  MessageSquareQuote, 
  BookOpen, 
  User, 
  ArrowLeft,
  GraduationCap
} from 'lucide-react';

export default function StudentSidebar() {
  const { studentTab, setStudentTab, setCurrentPortal, setLecturerTab, t } = useAppState();

  const navItems = [
    { id: 'dashboard', label: t('sidebar.nav.dashboard'), icon: LayoutDashboard },
    { id: 'my-assignments', label: t('nav.problem'), icon: FileText, badge: '5' },
    { id: 'submission-detail', label: t('sidebar.nav.submissions'), icon: UploadCloud },
    { id: 'feedback', label: t('sidebar.nav.feedback'), icon: Award, highlight: true },
    { id: 'resources', label: t('sidebar.nav.resources'), icon: BookOpen },
    { id: 'profile', label: t('stuPortal.profile'), icon: User },
  ];

  return (
    <aside className="w-64 bg-navy-900 dark:bg-slate-900 border-r border-navy-800 dark:border-slate-700 flex flex-col justify-between shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto text-slate-300">
      
      <div className="p-4 space-y-4">
        
        <div className="p-3.5 rounded-xl bg-navy-800/80 dark:bg-slate-800 border border-navy-700/60 dark:border-slate-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-sm text-white">
            JC
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Jean Claude</h3>
            <p className="text-[11px] text-slate-400 font-mono">STU-8821 · Year 2</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = studentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setStudentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-brand-600/20 text-brand-400 font-semibold border-l-4 border-brand-500 rounded-l-none pl-2.5 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-navy-800/60 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : item.highlight ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-navy-800 dark:bg-slate-700 text-slate-400 border border-navy-700 dark:border-slate-600">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      <div className="p-4 border-t border-navy-800/80 dark:border-slate-700 bg-navy-950/40 dark:bg-slate-950/40">
        <button
          onClick={() => {
            setCurrentPortal('lecturer');
            setLecturerTab('dashboard');
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-navy-800 dark:bg-slate-800 hover:bg-navy-700 dark:hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-navy-700 dark:border-slate-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('sidebar.humanLoop')}</span>
        </button>
      </div>

    </aside>
  );
}
