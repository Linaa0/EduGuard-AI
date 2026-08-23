import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import {
  Shield,
  LayoutDashboard,
  GraduationCap,
  TrendingUp,
  Award,
  MessageSquareQuote,
  CalendarCheck,
  Bell,
  User,
  LogOut,
  ChevronRight,
  HeartHandshake,
  ArrowLeft
} from 'lucide-react';

export default function ParentSidebar() {
  const { parentTab, setParentTab, currentUser, logoutUser, setCurrentPortal, showToast, t } = useAppState();

  const navItems = [
    { id: 'dashboard', label: t('sidebar.nav.dashboard'), icon: LayoutDashboard },
    { id: 'my-student', label: t('parent.nav.myStudent'), icon: GraduationCap },
    { id: 'progress', label: t('parent.nav.progress'), icon: TrendingUp, highlight: true },
    { id: 'grades', label: t('parent.nav.grades'), icon: Award, badge: 'Updated' },
    { id: 'feedback', label: t('parent.nav.feedback'), icon: MessageSquareQuote },
    { id: 'attendance', label: t('parent.nav.attendance'), icon: CalendarCheck },
    { id: 'notifications', label: t('parent.nav.notifications'), icon: Bell, alertBadge: '3 New' },
    { id: 'profile', label: t('parent.nav.profile'), icon: User },
  ];

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-midnight flex flex-col text-slate-300">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <button
          onClick={() => setCurrentPortal('landing')}
          className="flex items-center gap-2.5 group w-full text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-success flex items-center justify-center text-white shadow-[0_0_0_1px_rgba(63,174,123,0.25),0_6px_16px_-4px_rgba(63,174,123,0.3)]">
            <Shield className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <div className="leading-tight">
            <div className="font-heading font-extrabold text-[15px] text-white tracking-tight">
              EduGuard<span className="text-success">AI</span>
            </div>
            <div className="text-[10px] font-medium text-white/50 tracking-wide">
              {t('parent.subtitle')}
            </div>
          </div>
        </button>
      </div>

      {/* Student mini card */}
      <div className="mx-3 mt-3 p-3 rounded-xl bg-gradient-to-br from-success/12 to-white/5 border border-success/25">
        <div className="flex items-center gap-1 mb-2">
          <HeartHandshake className="w-3.5 h-3.5 text-success" />
          <span className="text-[10px] font-heading font-bold tracking-wider text-success/90 uppercase">
            {t('parent.connectedStudent')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center font-heading font-bold text-sm text-white shadow-md">
            JP
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-heading font-bold text-[13px] text-white truncate leading-tight">
              Jean-Paul N.
            </div>
            <div className="text-[10px] text-white/60 leading-tight">
              Year 2 · School of ICT
            </div>
          </div>
        </div>
      </div>

      {/* User mini card */}
      {currentUser && (
        <div className="mx-3 mt-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-heading font-bold text-sm text-white border border-white/10">
              {currentUser.avatar || currentUser.name?.charAt(0) || 'P'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-heading font-bold text-[12px] text-white truncate leading-tight">
                {currentUser.name?.split(' ').slice(0,2).join(' ') || 'Guardian'}
              </div>
              <div className="text-[10px] text-white/50">{t('parent.subtitle')}</div>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <div className="p-3 flex-1 overflow-y-auto">
        <div className="text-[10px] font-heading font-bold uppercase tracking-widest text-white/30 px-2 py-2">
          {t('sidebar.monitor')}
        </div>
        <nav className="space-y-0.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = parentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setParentTab(item.id)}
                className={`w-full flex items-center justify-between group px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-success/15 text-success-200 shadow-[inset_0_0_0_1px_rgba(63,174,123,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-success-100' : item.highlight ? 'text-amber-300' : ''}`} />
                  {item.label}
                </span>
                {item.alertBadge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-success/25 text-success-100 animate-pulse">
                    {item.alertBadge}
                  </span>
                )}
                {item.badge && !item.alertBadge && !isActive && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-teal-500/20 text-teal-300">
                    {item.badge}
                  </span>
                )}
                {isActive && !item.badge && !item.alertBadge && (
                  <ChevronRight className="w-3.5 h-3.5 text-success-100" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Tips card */}
        <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-br from-amber-400/10 via-white/5 to-transparent border border-amber-400/20">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] font-heading font-bold tracking-wider text-amber-300 uppercase">
              {t('parent.insight')}
            </span>
          </div>
          <div className="text-xs text-slate-300 leading-snug">
            {t('parViews.studentProgress')}
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <button
          onClick={() => setCurrentPortal('landing')}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[12px] font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('parent.landingPage')}</span>
        </button>
        <button
          onClick={() => { logoutUser(); setCurrentPortal('landing'); showToast('Signed Out', 'Logged out of parent portal', 'info'); }}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[12px] font-semibold text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('nav.logout')}</span>
        </button>
      </div>
    </aside>
  );
}
