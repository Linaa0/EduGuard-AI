import React, { useState } from 'react';
import {
  Shield, Mail, Lock, Eye, EyeOff, Check, ArrowRight,
  UserCheck, GraduationCap, Building2, Users, Loader2, AlertCircle, LogIn
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

const roleOptions = [
  { id: 'student', label: 'Student', icon: GraduationCap, color: 'teal', email: 'student@eduguard.ai', desc: 'Access assignments, submit work, view grades & feedback' },
  { id: 'lecturer', label: 'Teacher / Lecturer', icon: UserCheck, color: 'primary', email: 'teacher@eduguard.ai', desc: 'Create rubrics, review AI assessments, approve grades' },
  { id: 'admin', label: 'Administrator', icon: Building2, color: 'amber', email: 'admin@eduguard.ai', desc: 'Manage users, courses, analytics & system settings' },
  { id: 'parent', label: 'Parent / Guardian', icon: Users, color: 'success', email: 'parent@eduguard.ai', desc: 'Monitor student progress, grades & performance insights' },
];

export default function LoginPage() {
  const { loginUser, demoLogin, showToast, setAuthView, t, backendOnline } = useAppState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuickRoleLogin = async (roleId) => {
    setSelectedRole(roleId);
    setLoading(true);
    setError('');

    if (backendOnline) {
      const role = roleOptions.find(r => r.id === roleId);
      const result = await loginUser(role.email, 'demo1234');
      if (!result.success) {
        // Try demo-login endpoint
        await demoLogin(roleId);
      }
    } else {
      await demoLogin(roleId);
    }

    setLoading(false);
    showToast('Welcome Back', `Signed in as ${roleOptions.find(r => r.id === roleId)?.label}`, 'success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const result = await loginUser(email, password);

    if (result.success) {
      showToast('Welcome Back', `Signed in successfully`, 'success');
    } else {
      setError(result.error || 'Invalid email or password.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-slate-900 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-navy relative overflow-hidden flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-white tracking-tight">EduGuard AI</span>
          </div>

          <h1 className="text-4xl font-heading font-bold text-white leading-tight mb-6">
            {t('login.welcomeBack')}<br />
            <span className="text-teal-300">{t('login.toYourPortal')}</span>
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed max-w-md">
            {t('login.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {[
            t('login.feature1'),
            t('login.feature2'),
            t('login.feature3'),
          ].map((feat, i) => (
            <div key={i} className="flex items-center gap-3 text-blue-100">
              <Check className="w-4 h-4 text-teal-300 flex-shrink-0" />
              <span className="text-sm">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-heading font-bold text-charcoal dark:text-white">EduGuard AI</span>
          </div>

          <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-2">{t('login.title')}</h2>
          <p className="text-slategray dark:text-slate-400 mb-8">{t('login.desc')}</p>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Quick Role Buttons */}
          <div className="mb-6">
            <p className="text-xs font-bold text-slategray dark:text-slate-400 uppercase tracking-wider mb-3">{t('login.quickLogin')}</p>
            <div className="grid grid-cols-2 gap-2">
              {roleOptions.map(role => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleQuickRoleLogin(role.id)}
                    disabled={loading}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-sm transition-all
                      ${selectedRole === role.id
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : 'border-slate-200 dark:border-slate-700 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-800'}
                      disabled:opacity-50`}
                  >
                    <Icon className={`w-4 h-4 text-${role.color}`} />
                    <span className="font-medium text-charcoal dark:text-white text-xs">{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-3 bg-cream dark:bg-slate-900 text-slategray">{t('login.or')}</span></div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-slate-200 mb-1.5">{t('login.email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slategray" />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-charcoal dark:text-white text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                  placeholder="you@university.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal dark:text-slate-200 mb-1.5">{t('login.password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slategray" />
                <input
                  type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-charcoal dark:text-white text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                  placeholder="Enter password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slategray hover:text-charcoal dark:hover:text-white">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/30" />
                <span className="text-sm text-slategray dark:text-slate-400">{t('login.remember')}</span>
              </label>
              <button type="button" className="text-sm text-primary hover:text-primary-dark font-medium">{t('login.forgot')}</button>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium text-sm transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              {loading ? t('login.signingIn') : t('login.signIn')}
            </button>
          </form>

          <p className="text-center text-sm text-slategray dark:text-slate-400 mt-6">
            {t('login.noAccount')}{' '}
            <button onClick={() => setAuthView('register')} className="text-primary hover:text-primary-dark font-medium">{t('login.signUp')}</button>
          </p>

          <p className="text-center text-xs text-slategray/60 dark:text-slate-500 mt-4">{t('login.copyright')}</p>
        </div>
      </div>
    </div>
  );
}
