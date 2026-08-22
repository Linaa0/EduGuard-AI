import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  Settings,
  HelpCircle,
  Shield,
  GraduationCap,
  UserCheck,
  Building2,
  Users
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

const roleMeta = {
  student:  { label: 'Student',            icon: GraduationCap, color: 'text-teal-600 dark:text-teal-400',   bg: 'bg-teal-50 dark:bg-teal-900/30',    border: 'border-teal-200 dark:border-teal-800' },
  lecturer: { label: 'Teacher / Lecturer', icon: UserCheck,     color: 'text-primary dark:text-primary-300',bg: 'bg-primary-50 dark:bg-primary-900/30', border: 'border-primary-200 dark:border-primary-800' },
  admin:    { label: 'Administrator',      icon: Building2,     color: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-50 dark:bg-amber-900/30',   border: 'border-amber-200 dark:border-amber-800' },
  parent:   { label: 'Parent / Guardian',  icon: Users,         color: 'text-success dark:text-success',    bg: 'bg-success-50 dark:bg-success-900/30', border: 'border-success-200 dark:border-success-800' },
};

export default function DashboardTopBar({ title, subtitle }) {
  const { currentUser, logoutUser, showToast, setCurrentPortal, t } = useAppState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (!currentUser) return null;
  const role = roleMeta[currentUser.role] || roleMeta.student;
  const RoleIcon = role.icon;

  const handleLogout = () => {
    setMenuOpen(false);
    logoutUser();
    setCurrentPortal('landing');
    showToast('Signed Out', 'You have been logged out successfully.', 'info');
  };

  const notifications = [
    { id: 1, title: 'New grade published', text: 'Software Engineering assignment scored', time: '12 min ago', type: 'teal' },
    { id: 2, title: currentUser.role === 'lecturer' ? '3 submissions ready for review' : (currentUser.role === 'student' ? 'New assignment posted' : 'Weekly progress report'), text: 'Click to view details', time: '1 hr ago', type: 'amber' },
    { id: 3, title: 'System update', text: 'New feedback features available', time: 'Yesterday', type: 'primary' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-divider dark:border-slate-700">
      <div className="h-16 px-4 lg:px-6 flex items-center justify-between gap-3">
        {/* Left: Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <div>
              <h2 className="font-heading font-bold text-[17px] text-charcoal dark:text-white tracking-tight leading-tight truncate">
                {title || t('sidebar.nav.dashboard')}
              </h2>
              {subtitle && (
                <p className="text-[12px] text-slategray leading-tight truncate hidden sm:block">{subtitle}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slategray" />
            <input
              type="text"
              placeholder={t('search.placeholder')}
              className="h-9 w-56 pl-9 pr-3 rounded-lg border border-divider dark:border-slate-600 bg-cream-50 dark:bg-slate-700 text-[13px] text-charcoal dark:text-slate-200 placeholder:text-slategray/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setNotifOpen(v => !v); setMenuOpen(false); }}
              className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-divider dark:border-slate-600 bg-white dark:bg-slate-700 text-slategray dark:text-slate-300 hover:text-midnight dark:hover:text-white hover:bg-cream-100 dark:hover:bg-slate-600 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal shadow-[0_0_0_2px_#fff] dark:shadow-[0_0_0_2px_#1e293b]"></span>
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-divider dark:border-slate-600 bg-white dark:bg-slate-800 shadow-cardXl overflow-hidden animate-fadeIn z-50">
                <div className="px-4 py-3 border-b border-divider dark:border-slate-700 flex items-center justify-between bg-cream-50 dark:bg-slate-700">
                  <div className="font-heading font-bold text-sm text-charcoal dark:text-white">Notifications</div>
                  <button className="text-xs font-semibold text-primary hover:underline">Mark all read</button>
                </div>
                <ul className="max-h-80 overflow-y-auto">
                  {notifications.map(n => (
                    <li key={n.id} className="px-4 py-3 border-b border-divider dark:border-slate-700 last:border-b-0 hover:bg-cream-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          n.type === 'teal' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' :
                          n.type === 'amber' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                          'bg-primary-50 dark:bg-primary-900/30 text-primary dark:text-primary-300'
                        }`}>
                          <Bell className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-charcoal dark:text-white leading-tight">{n.title}</div>
                          <div className="text-xs text-slategray mt-0.5">{n.text}</div>
                          <div className="text-[11px] text-slategray/80 mt-1">{n.time}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-2.5 border-t border-divider dark:border-slate-700 bg-cream-50 dark:bg-slate-700">
                  <button className="text-xs font-semibold text-primary hover:underline w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile / Account menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => { setMenuOpen(v => !v); setNotifOpen(false); }}
              className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-xl border border-divider dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-cream-50 dark:hover:bg-slate-600 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-heading font-bold text-sm shadow-sm">
                {currentUser.avatar || currentUser.name?.charAt(0) || 'U'}
              </div>
              <div className="text-left hidden sm:block leading-tight pr-0.5">
                <div className="font-semibold text-[13px] text-charcoal dark:text-white leading-tight">
                  {currentUser.name?.split(' ')[0] || 'User'}
                </div>
                <div className={`inline-flex items-center gap-1 text-[10px] font-semibold ${role.color}`}>
                  <RoleIcon className="w-3 h-3" />
                  {role.label.split(' / ')[0]}
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slategray transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-divider dark:border-slate-600 bg-white dark:bg-slate-800 shadow-cardXl overflow-hidden animate-fadeIn z-50">
                <div className={`px-4 py-4 border-b border-divider dark:border-slate-700 ${role.bg}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-heading font-bold text-lg shadow-md">
                      {currentUser.avatar || currentUser.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-bold text-charcoal dark:text-white leading-tight truncate">{currentUser.name}</div>
                      <div className="text-xs text-slategray mt-0.5 truncate">{currentUser.email}</div>
                      <div className={`mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold ${role.color} ${role.bg} ${role.border} border`}>
                        <RoleIcon className="w-3 h-3" />
                        {role.label}
                      </div>
                    </div>
                  </div>
                  {currentUser.institution && (
                    <div className="mt-3 pt-3 border-t border-white/60">
                      <div className="flex items-center gap-1.5 text-[11px] text-slategray">
                        <Shield className="w-3.5 h-3.5" />
                        <span className="truncate">{currentUser.institution}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="py-1.5">
                  <button
                    onClick={() => { setMenuOpen(false); showToast('Profile', 'Profile view selected', 'info'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-cream-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-charcoal dark:text-white leading-tight">My Profile</div>
                      <div className="text-[11px] text-slategray">View & edit personal details</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setMenuOpen(false); showToast('Account Settings', 'Account settings view selected', 'info'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-cream-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slategray flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-charcoal dark:text-white leading-tight">Account Settings</div>
                      <div className="text-[11px] text-slategray">Security, notifications, preferences</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setMenuOpen(false); showToast('Help Center', 'Contact support or view documentation', 'info'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-cream-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-charcoal dark:text-white leading-tight">Help & Support</div>
                      <div className="text-[11px] text-slategray">Docs, FAQs, contact support</div>
                    </div>
                  </button>
                </div>

                <div className="p-2 border-t border-divider dark:border-slate-700 bg-cream-50 dark:bg-slate-700">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 font-semibold text-sm transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('nav.logout')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
