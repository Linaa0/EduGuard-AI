import React, { useState } from 'react';
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
  UserCheck,
  GraduationCap,
  Building2,
  Users,
  Loader2,
  AlertCircle,
  LogIn
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

const roleOptions = [
  { id: 'student', label: 'Student', icon: GraduationCap, color: 'teal', email: 'student@eduguard.ai', desc: 'Access assignments, submit work, view grades & feedback' },
  { id: 'lecturer', label: 'Teacher / Lecturer', icon: UserCheck, color: 'primary', email: 'teacher@eduguard.ai', desc: 'Create rubrics, review AI assessments, approve grades' },
  { id: 'admin', label: 'Administrator', icon: Building2, color: 'amber', email: 'admin@eduguard.ai', desc: 'Manage users, courses, analytics & system settings' },
  { id: 'parent', label: 'Parent / Guardian', icon: Users, color: 'success', email: 'parent@eduguard.ai', desc: 'Monitor student progress, grades & performance insights' },
];

const DEMO_PASSWORD = 'demo1234';

export default function LoginPage() {
  const { loginUser, showToast, setAuthView } = useAppState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuickRoleLogin = async (roleId) => {
    setSelectedRole(roleId);
    const role = roleOptions.find(r => r.id === roleId);
    if (!role) return;
    setEmail(role.email);
    setPassword(DEMO_PASSWORD);
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 800));

    loginUser({
      id: `${roleId}-demo`,
      name: role.label === 'Teacher / Lecturer' ? 'Dr. Jeanne Mukamana' :
            roleId === 'student' ? 'Jean-Paul Niyonsaba' :
            roleId === 'admin' ? 'Dr. Emmanuel Rwigamba' : 'Ms. Olive Uwase',
      email: role.email,
      role: roleId,
      avatar: role.label.charAt(0),
      institution: 'University of Rwanda — College of Science and Technology',
      department: roleId === 'student' ? 'School of ICT' :
                  roleId === 'lecturer' ? 'Dept. of Computer Science' :
                  roleId === 'admin' ? 'Academic Affairs' : '—',
    });

    setLoading(false);
    showToast('Welcome Back', `Signed in as ${role.label}`, 'success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const matchedRole = roleOptions.find(r => r.email.toLowerCase() === email.toLowerCase());
    const demoRole = selectedRole || (matchedRole ? matchedRole.id : 'student');

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    if (password.length < 4) {
      setLoading(false);
      setError('Invalid credentials. Try the demo accounts below or use any email with password "demo1234".');
      return;
    }

    loginUser({
      id: `${demoRole}-${Date.now()}`,
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      role: demoRole,
      avatar: email.charAt(0).toUpperCase(),
      institution: 'University of Rwanda — College of Science and Technology',
      department: demoRole === 'student' ? 'School of ICT' :
                  demoRole === 'lecturer' ? 'Dept. of Computer Science' :
                  demoRole === 'admin' ? 'Academic Affairs' : '—',
    });

    setLoading(false);
    showToast('Welcome Back', `Signed in successfully as ${demoRole.charAt(0).toUpperCase() + demoRole.slice(1)}`, 'success');
  };

  const roleBadgeClass = (roleId, color) => {
    const map = {
      teal: 'bg-teal-50 text-teal-700 border-teal-200',
      primary: 'bg-primary-50 text-primary border-primary-200',
      amber: 'bg-amber-50 text-amber-700 border-amber-200',
      success: 'bg-success-50 text-success border-success-200',
    };
    return map[color] || map.primary;
  };

  const roleSelectedClass = (roleId, color) => {
    const map = {
      teal: selectedRole === roleId ? 'ring-2 ring-teal-400 border-teal-300 bg-teal-50/60' : '',
      primary: selectedRole === roleId ? 'ring-2 ring-primary border-primary-300 bg-primary-50/60' : '',
      amber: selectedRole === roleId ? 'ring-2 ring-amber-400 border-amber-300 bg-amber-50/60' : '',
      success: selectedRole === roleId ? 'ring-2 ring-success border-success-300 bg-success-50/60' : '',
    };
    return map[color] || '';
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-cream-dot">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left side: Brand panel */}
        <div className="relative hidden lg:flex lg:w-1/2 hero-bg flex-col justify-between p-12 text-white overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-16">
              <div className="w-10 h-10 rounded-xl bg-teal-500/90 flex items-center justify-center text-midnight shadow-tealGlow">
                <Shield className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <div>
                <div className="font-heading font-extrabold text-xl tracking-tight">
                  EduGuard<span className="text-teal">AI</span>
                </div>
                <div className="text-[11px] font-medium text-white/60 tracking-wide -mt-0.5">
                  University of Rwanda
                </div>
              </div>
            </div>

            <div className="max-w-md">
              <div className="eyebrow !text-teal-300 !bg-teal-500/15 !border-teal-500/30 mb-6">
                <Shield className="w-3.5 h-3.5" />
                Academic Platform Access
              </div>
              <h1 className="text-white text-4xl font-extrabold leading-tight mb-5 text-balance">
                AI Assesses.
                <br />
                <span className="text-teal">Teachers Decide.</span>
                <br />
                Students Understand.
              </h1>
              <p className="text-white/70 text-base leading-relaxed mb-10">
                Secure, role-based access to Rwanda's responsible AI assessment platform.
                Built for lecturers, students, administrators, and guardians.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-300 flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">Human-in-the-Loop Oversight</div>
                    <div className="text-xs text-white/60">AI suggests, lecturers make the final call</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/25 flex items-center justify-center text-amber-300 flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">Rwanda HEC Aligned</div>
                    <div className="text-xs text-white/60">Responsible AI for higher education</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white/80 flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">SDG 4: Quality Education</div>
                    <div className="text-xs text-white/60">Faster feedback, clearer learning</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10">
            <p className="text-xs text-white/40">
              © 2026 EduGuard AI · Built for Ejo Labs STP'26 · Prototype Demo
            </p>
          </div>
        </div>

        {/* Right side: Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center gap-2.5 mb-10">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                <Shield className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <div>
                <div className="font-heading font-extrabold text-xl text-midnight tracking-tight">
                  EduGuard<span className="text-teal">AI</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-heading font-extrabold text-3xl text-charcoal mb-2 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-slategray text-base">
                Sign in to your EduGuard AI account
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 m-0">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-charcoal">
                  Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slategray" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@ur.ac.rw"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-divider bg-white text-charcoal placeholder:text-slategray/70 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-[15px]"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-charcoal">Password</label>
                  <button
                    type="button"
                    onClick={() => showToast('Password Reset', 'Contact your institution administrator or use demo password: demo1234', 'info')}
                    className="text-xs font-semibold text-primary hover:text-primary-800 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slategray" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-divider bg-white text-charcoal placeholder:text-slategray/70 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-[15px]"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-slategray hover:bg-cream-100 hover:text-midnight transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-divider text-primary focus:ring-primary focus:ring-offset-0"
                  />
                  <span className="text-sm text-slategray">Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg w-full h-12"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Signing In...</>
                ) : (
                  <><LogIn className="w-4 h-4" /> Log In</>
                )}
              </button>
            </form>

            {/* Continue with Google */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-divider"></div>
              <span className="text-xs text-slategray font-medium">OR CONTINUE WITH</span>
              <div className="flex-1 h-px bg-divider"></div>
            </div>

            <button
              type="button"
              onClick={() => showToast('Google SSO', 'Institutional Google SSO will be connected in production. Using demo login instead.', 'info')}
              className="w-full h-12 rounded-xl border border-divider bg-white text-charcoal font-semibold flex items-center justify-center gap-2.5 hover:bg-cream-100 transition-colors mb-8"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.8 6.4 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.1l6.6 4.8C14.7 15.1 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.8 6.4 29.2 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.1z"/>
                <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.3 0-9.7-3.5-11.3-8.3l-6.5 5C9.5 38.8 16.2 43.5 24 43.5z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2c-.4.4 6.6-4.8 6.6-14.8 0-1.2-.1-2.4-.4-3.5z"/>
              </svg>
              Continue with Google
            </button>

            {/* Role quick-login */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="eyebrow !mb-0 !py-1 !px-3 !text-[11px]">
                  <LogIn className="w-3 h-3" />
                  Demo Quick Login: Click a role
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {roleOptions.map(role => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleQuickRoleLogin(role.id)}
                      className={`group p-3.5 rounded-xl border border-divider bg-white text-left transition-all hover:-translate-y-0.5 hover:shadow-card ${roleSelectedClass(role.id, role.color)}`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${roleBadgeClass(role.id, role.color)}`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="font-heading font-bold text-sm text-charcoal leading-tight mb-1">{role.label}</div>
                      <div className="text-[11px] text-slategray leading-snug">{role.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-center pt-4 border-t border-divider">
              <p className="text-sm text-slategray">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthView('role-select')}
                  className="font-semibold text-primary hover:text-primary-800 transition-colors inline-flex items-center gap-1"
                >
                  Create an account <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
