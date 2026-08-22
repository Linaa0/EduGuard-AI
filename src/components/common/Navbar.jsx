import React, { useState } from 'react';
import {
  Shield,
  Menu,
  X,
  LogIn,
  UserPlus,
  ArrowRight,
  Play,
} from 'lucide-react';
import { useNavigate } from '../../hooks/useNavigate';
import ThemeToggle from '../common/ThemeToggle';
import { useAppState } from '../../context/AppStateContext';

const NavLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: "Who It's For", href: '#who-its-for' },
  { label: 'Responsible AI', href: '#responsible-ai' },
  { label: 'Impact', href: '#impact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { setAuthView, setCurrentPortal, currentPortal, currentUser, logoutUser, showToast } = useAppState();
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-divider shadow-[0_1px_2px_rgba(16,35,59,0.04)]">
      <div className="site-container flex items-center justify-between h-16 gap-6">
        {/* Logo — flex-shrink-0 */}
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); goHome(); }}
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-[0_4px_12px_rgba(30,58,95,0.2)] transition-transform duration-200 group-hover:scale-105">
            <Shield className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <div className="leading-tight">
            <div className="font-heading font-extrabold text-[17px] text-midnight tracking-tight">
              EduGuard<span className="text-teal">AI</span>
            </div>
            <div className="text-[11px] font-medium text-slategray tracking-wide -mt-0.5 hidden sm:block">
              AI Assesses · Teachers Decide · Students Understand
            </div>
          </div>
        </a>

        {/* Nav links — hidden below xl, flexbox row with gap */}
        <nav className="hidden xl:flex items-center gap-1 flex-shrink-0">
          {NavLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => { e.preventDefault(); go(href); }}
              className="nav-link whitespace-nowrap"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Spacer — pushes right-side controls to the right */}
        <div className="flex-1 min-w-0" />

        {/* Right-side controls — fixed gap, no overlap */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <ThemeToggle />

          {currentUser ? (
            <>
              <button
                onClick={goToDashboard}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-cream-100 hover:bg-cream-200 border border-divider transition-colors"
              >
                <div className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center text-[11px] font-heading font-bold">
                  {currentUser.avatar || currentUser.name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-semibold text-charcoal">{roleLabel(currentUser.role)} Portal</span>
              </button>
              <button onClick={handleLogout} className="btn btn-secondary !py-2 !px-3.5">
                <LogIn className="w-4 h-4 rotate-180" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </>
          ) : (
            <>
              {/* Log In — secondary/ghost */}
              <button onClick={onLogin} className="btn btn-secondary hidden sm:inline-flex !py-2 !px-4">
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </button>

              {/* Sign Up — outline/secondary, NOT solid primary */}
              <button onClick={onSignup} className="btn btn-secondary hidden sm:inline-flex !py-2 !px-4">
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>

              {/* See How It Works — the ONE solid CTA */}
              <button onClick={onDemo} className="btn btn-teal hidden md:inline-flex !py-2 !px-4">
                <Play className="w-4 h-4" />
                <span className="hidden lg:inline">See How It Works</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Mobile hamburger — visible below xl */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-midnight hover:bg-cream-100 border border-divider"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-divider bg-white animate-fadeIn">
          <div className="site-container py-4 flex flex-col gap-1">
            {NavLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => { e.preventDefault(); go(href); }}
                className="nav-link !text-[15px] !py-2.5"
              >
                {label}
              </a>
            ))}

            <div className="mt-3 pt-4 border-t border-divider space-y-2">
              {currentUser ? (
                <>
                  <button onClick={goToDashboard} className="btn btn-primary w-full justify-center">
                    Open {roleLabel(currentUser.role)} Portal
                  </button>
                  <button onClick={handleLogout} className="btn btn-secondary w-full justify-center">
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={onLogin} className="btn btn-secondary w-full justify-center">
                    Log In
                  </button>
                  <button onClick={onSignup} className="btn btn-secondary w-full justify-center">
                    Sign Up
                  </button>
                  <button onClick={onDemo} className="btn btn-teal w-full justify-center">
                    See How It Works
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
