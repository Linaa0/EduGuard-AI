import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import {
  Shield,
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  BookOpen,
  Building,
  FileCheck,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export default function AdminSidebar() {
  const { adminTab, setAdminTab, currentUser, logoutUser, setCurrentPortal, showToast, t } = useAppState();

  const navItems = [
    { id: 'dashboard', label: t('sidebar.nav.dashboard'), icon: LayoutDashboard },
    { id: 'users', label: t('admin.nav.users'), icon: Users, badge: '1,284' },
    { id: 'students', label: t('admin.nav.students'), icon: GraduationCap, badge: '1,102' },
    { id: 'teachers', label: t('admin.nav.teachers'), icon: UserCheck, badge: '86' },
    { id: 'courses', label: t('admin.nav.courses'), icon: BookOpen, badge: '142' },
    { id: 'departments', label: t('admin.nav.departments'), icon: Building },
    { id: 'assessments', label: t('admin.nav.assessments'), icon: FileCheck, badge: '528' },
    { id: 'analytics', label: t('admin.nav.analytics'), icon: BarChart3 },
    { id: 'settings', label: t('admin.nav.settings'), icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-midnight flex flex-col text-slate-300">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <button
          onClick={() => setCurrentPortal('landing')}
          className="flex items-center gap-2.5 group w-full text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-500/90 flex items-center justify-center text-midnight shadow-tealGlow">
            <Shield className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <div className="leading-tight">
            <div className="font-heading font-extrabold text-[15px] text-white tracking-tight">
              EduGuard<span className="text-teal-400">AI</span>
            </div>
            <div className="text-[10px] font-medium text-white/50 tracking-wide">
              {t('admin.subtitle')}
            </div>
          </div>
        </button>
      </div>

      {/* User mini card */}
      {currentUser && (
        <div className="mx-3 mt-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center font-heading font-bold text-sm text-amber-950 shadow-md">
              {currentUser.avatar || currentUser.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-heading font-bold text-[13px] text-white truncate leading-tight">
                {currentUser.name?.split(' ').slice(0,2).join(' ') || 'Admin User'}
              </div>
              <div className="inline-flex items-center gap-1 mt-0.5 text-[10px] font-semibold text-amber-300">
                <Building className="w-3 h-3" />
                {t('admin.subtitle')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <div className="p-3 flex-1 overflow-y-auto">
        <div className="text-[10px] font-heading font-bold uppercase tracking-widest text-white/30 px-2 py-2">
          {t('sidebar.management')}
        </div>
        <nav className="space-y-0.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = adminTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
                className={`w-full flex items-center justify-between group px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-300 shadow-[inset_0_0_0_1px_rgba(45,212,191,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-teal-300' : ''}`} />
                  {item.label}
                </span>
                {item.badge && !isActive && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-white/5 text-white/60 border border-white/10">
                    {item.badge}
                  </span>
                )}
                {item.badge && isActive && (
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-teal-500/25 text-teal-200">
                    {item.badge}
                  </span>
                )}
                {isActive && !item.badge && (
                  <ChevronRight className="w-3.5 h-3.5 text-teal-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* System status card */}
        <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-br from-teal-500/10 via-white/5 to-transparent border border-teal-500/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)] animate-pulse"></div>
            <span className="text-[11px] font-heading font-bold tracking-wider text-teal-300 uppercase">{t('admin.systemStatus')}</span>
          </div>
          <div className="text-xs text-slate-300 leading-snug">
            486 active assessments · 98.4% uptime · Next sync: 2 min
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
          <span>{t('admin.landingPage')}</span>
        </button>
        <button
          onClick={() => { logoutUser(); setCurrentPortal('landing'); showToast('Signed Out', 'Logged out of admin console', 'info'); }}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[12px] font-semibold text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('nav.logout')}</span>
        </button>
      </div>
    </aside>
  );
}
