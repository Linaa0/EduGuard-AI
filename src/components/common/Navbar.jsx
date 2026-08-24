import React, { useState } from 'react';
import {
  Shield,
  Menu,
  X,
  LogIn,
  UserPlus,
  ArrowRight,
  Play,
  Globe,
} from 'lucide-react';
import { useNavigate } from '../../hooks/useNavigate';
import ThemeToggle from '../common/ThemeToggle';
import { useAppState } from '../../context/AppStateContext';

const NavLinks = [
  { label: 'Problem', href: '#problem', tKey: 'nav.problem' },
  { label: 'Solution', href: '#solution', tKey: 'nav.solution' },
  { label: 'How It Works', href: '#how-it-works', tKey: 'nav.howItWorks' },
  { label: "Who It's For", href: '#who-its-for', tKey: 'nav.whoItsFor' },
  { label: 'Responsible AI', href: '#responsible-ai', tKey: 'nav.responsibleAI' },
  { label: 'Impact', href: '#impact', tKey: 'nav.impact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { setAuthView, setCurrentPortal, currentPortal, currentUser, logoutUser, showToast, language, setLanguage, t } = useAppState();
  const [mobileOpen, setMobileOpen] = useState(false);

  const goHome = () => {
    setCurrentPortal('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const go = (href) => {
    setMobileOpen(false);
    if (currentPortal !== 'landing') {
      setCurrentPortal('landing');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    navigate(href);
  };

  const onLogin = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    setAuthView('login');
    setCurrentPortal('auth');
  };

  const onSignup = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    setAuthView('role-select');
    setCurrentPortal('auth');
  };

  const onDemo = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    setAuthView('role-select');
    setCurrentPortal('auth');
  };

  const roleLabel = (role) => {
    if (role === 'student') return 'Student';
    if (role === 'lecturer') return 'Lecturer';
    if (role === 'admin') return 'Admin';
    if (role === 'parent') return 'Parent';
    return 'Dashboard';
  };

  const handleLogout = () => {
    logoutUser();
    showToast('Signed Out', 'You have been logged out.', 'info');
  };

  const goToDashboard = () => {
    if (!currentUser) return;
    const role = currentUser.role;
    if (role === 'student') setCurrentPortal('student');
    else if (role === 'lecturer') setCurrentPortal('lecturer');
    else if (role === 'admin') setCurrentPortal('admin');
    else if (role === 'parent') setCurrentPortal('parent');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/80 shadow-[0_1px_3px_rgba(16,35,59,0.06)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">

        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); goHome(); }}
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-[0_4px_12px_rgba(30,58,95,0.25)] transition-transform duration-200 group-hover:scale-105">
            <Shield className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <div className="leading-tight">
            <div className="font-heading font-extrabold text-[17px] text-midnight dark:text-white tracking-tight">
              EduGuard<span className="text-teal">AI</span>
            </div>
            <div className="text-[11px] font-medium text-slategray dark:text-slate-400 tracking-wide -mt-0.5 hidden sm:block">
              {t('app.tagline')}
            </div>
          </div>
        </a>

        {/* Nav links — visible at lg+ */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NavLinks.map(({ label, href, tKey }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => { e.preventDefault(); go(href); }}
              className="nav-link whitespace-nowrap text-[13.5px] dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 px-3 py-2"
            >
              {tKey ? t(tKey) : label}
            </a>
          ))}
        </nav>

        {/* Right-side controls */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slategray dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-midnight dark:hover:text-white transition-colors text-[11px] font-bold tracking-wide"
            title={language === 'en' ? 'Switch to Kinyarwanda' : 'Switch to English'}
          >
            {language === 'en' ? 'RW' : 'EN'}
          </button>

          <ThemeToggle />

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

          {currentUser ? (
            <>
              <button
                onClick={goToDashboard}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <div className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center text-[11px] font-heading font-bold">
                  {currentUser.avatar || currentUser.name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-semibold text-charcoal dark:text-slate-200">{roleLabel(currentUser.role)} Portal</span>
              </button>
              <button onClick={handleLogout} className="btn btn-secondary dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 !py-2 !px-3 text-sm hidden sm:inline-flex">
                <LogIn className="w-4 h-4 rotate-180" />
                <span className="hidden md:inline">{t('nav.logout')}</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={onLogin} className="btn btn-secondary dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 hidden sm:inline-flex !py-2 !px-3.5 text-sm">
                <LogIn className="w-4 h-4" />
                <span>{t('nav.login')}</span>
              </button>

              <button onClick={onSignup} className="btn btn-secondary dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 hidden sm:inline-flex !py-2 !px-3.5 text-sm">
                <UserPlus className="w-4 h-4" />
                <span className="hidden md:inline">{t('nav.signup')}</span>
              </button>

              <button onClick={onDemo} className="btn btn-teal hidden sm:inline-flex !py-2 !px-4 text-sm">
                <Play className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{t('nav.demo')}</span>
                <span className="lg:hidden">Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-midnight dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors ml-1"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 animate-fadeIn">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
            {NavLinks.map(({ label, href, tKey }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => { e.preventDefault(); go(href); }}
                className="nav-link text-[15px] py-2.5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
              >
                {tKey ? t(tKey) : label}
              </a>
            ))}

            <div className="mt-3 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
              {currentUser ? (
                <>
                  <button onClick={goToDashboard} className="btn btn-primary w-full justify-center">
                    {t('nav.openPortal')} {roleLabel(currentUser.role)}
                  </button>
                  <button onClick={handleLogout} className="btn btn-secondary dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 w-full justify-center">
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={onLogin} className="btn btn-secondary dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 w-full justify-center">
                    {t('nav.login')}
                  </button>
                  <button onClick={onSignup} className="btn btn-secondary dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 w-full justify-center">
                    {t('nav.signup')}
                  </button>
                  <button onClick={onDemo} className="btn btn-teal w-full justify-center">
                    {t('nav.demo')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
