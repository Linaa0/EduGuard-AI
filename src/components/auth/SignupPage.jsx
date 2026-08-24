import React, { useState } from 'react';
import {
  Shield,
  GraduationCap,
  UserCheck,
  Building2,
  Users,
  Check,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  User,
  Loader2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

const roleOptions = [
  {
    id: 'student',
    name: 'STUDENT',
    icon: GraduationCap,
    color: 'teal',
    description: 'Access assignments, submit work, view grades, understand feedback, and access learning resources.',
    features: ['View all course assignments', 'Submit work online', 'AI-enhanced feedback', 'Personalized learning resources'],
  },
  {
    id: 'lecturer',
    name: 'TEACHER / LECTURER',
    icon: UserCheck,
    color: 'primary',
    description: 'Create assignments, manage rubrics, review AI assessments, approve or modify grades, and provide feedback.',
    features: ['Rubric-based assignment creation', 'AI-assisted preliminary grading', 'Human-in-the-loop approval', 'Class performance analytics'],
  },
  {
    id: 'admin',
    name: 'ADMINISTRATOR',
    icon: Building2,
    color: 'amber',
    description: 'Manage users, courses, departments, assessments, system settings, analytics, and institutional data.',
    features: ['Institutional user management', 'Course & department setup', 'System-wide analytics', 'Security & audit trails'],
  },
  {
    id: 'parent',
    name: 'PARENT / GUARDIAN',
    icon: Users,
    color: 'success',
    description: 'Monitor authorized student academic progress, grades, feedback, and performance insights.',
    features: ['Connected student dashboard', 'Academic progress tracking', 'Feedback summary view', 'Attendance & performance alerts'],
  },
];

const colorMap = {
  teal: {
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
    ring: 'group-hover:ring-teal-400 group-hover:border-teal-300',
    selected: 'ring-2 ring-teal-400 border-teal-300 bg-teal-50/50',
    btn: 'btn-teal',
    accent: '#2DD4BF',
    iconBg: 'bg-teal-100 text-teal-700 border border-teal-200',
    stepBg: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  primary: {
    badgeBg: 'bg-primary-50 text-primary border-primary-200',
    ring: 'group-hover:ring-primary group-hover:border-primary-300',
    selected: 'ring-2 ring-primary border-primary-300 bg-primary-50/50',
    btn: 'btn-primary',
    accent: '#1E3A5F',
    iconBg: 'bg-primary-50 text-primary border border-primary-200',
    stepBg: 'bg-primary-50 text-primary border-primary-200',
  },
  amber: {
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    ring: 'group-hover:ring-amber-400 group-hover:border-amber-300',
    selected: 'ring-2 ring-amber-400 border-amber-300 bg-amber-50/50',
    btn: 'btn-amber',
    accent: '#F5A623',
    iconBg: 'bg-amber-50 text-amber-700 border border-amber-200',
    stepBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  success: {
    badgeBg: 'bg-success-50 text-success border-success-200',
    ring: 'group-hover:ring-success group-hover:border-success-300',
    selected: 'ring-2 ring-success border-success-300 bg-success-50/50',
    btn: 'bg-success hover:bg-success-600 text-white shadow-[0_4px_12px_rgba(63,174,123,0.25)]',
    accent: '#3FAE7B',
    iconBg: 'bg-success-50 text-success border border-success-200',
    stepBg: 'bg-success-50 text-success border-success-200',
  },
};

export default function SignupPage() {
  const { setAuthView, setCurrentPortal, signupUser, showToast, t } = useAppState();
  const [step, setStep] = useState('role-select'); // 'role-select' | 'register' | 'success'
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
    agree: false,
    // Student
    studentId: '', university: 'University of Rwanda', faculty: '', programme: '', yearOfStudy: '',
    // Lecturer
    staffId: '', department: '', courses: '',
    // Admin
    adminInstitution: 'University of Rwanda', adminDepartment: '', administratorId: '',
    // Parent
    connectStudentId: '', connectStudentEmail: '', relationship: '',
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinueToRegister = () => {
    if (!selectedRole) return;
    setFormError('');
    setStep('register');
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      return 'Please fill in all required fields.';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (!formData.agree) {
      return 'You must agree to the Terms of Service and Privacy Policy.';
    }
    if (selectedRole === 'student') {
      if (!formData.studentId || !formData.faculty || !formData.programme || !formData.yearOfStudy) {
        return 'Please complete all student registration fields.';
      }
    }
    if (selectedRole === 'lecturer') {
      if (!formData.staffId || !formData.department || !formData.faculty) {
        return 'Please complete all lecturer registration fields.';
      }
    }
    if (selectedRole === 'admin') {
      if (!formData.administratorId || !formData.adminDepartment) {
        return 'Please complete all administrator registration fields.';
      }
    }
    if (selectedRole === 'parent') {
      if (!formData.connectStudentId || !formData.connectStudentEmail || !formData.relationship) {
        return 'Please complete the student connection fields.';
      }
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      setFormError(err);
      return;
    }
    setFormError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    signupUser({
      full_name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: selectedRole,
      department: formData.department || formData.adminDepartment || formData.faculty || undefined,
      student_id: selectedRole === 'student' ? formData.studentId : undefined,
    });

    setLoading(false);
    setStep('success');
    showToast('Account Created', 'Welcome to EduGuard AI!', 'success');
  };

  // ---- Render: Role Select ----
  if (step === 'role-select') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-5xl">
            <div className="text-center mb-12 animate-slideUp">
              <div className="eyebrow !mb-5 inline-flex mx-auto">
                <UserCheck className="w-3.5 h-3.5" />
                {t('signup.eyebrow')}
              </div>
              <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-charcoal mb-4 tracking-tight text-balance">
                {t('signup.whoAreYou')}
              </h1>
              <p className="section-lede text-base lg:text-lg">
                {t('signup.whoAreYouDesc')}
              </p>
            </div>

            {/* Role cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {roleOptions.map((role, idx) => {
                const colors = colorMap[role.color];
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`group relative text-left rounded-2xl border border-divider bg-white dark:bg-slate-800 p-6 lg:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-cardLg animate-slideUp ${isSelected ? colors.selected : ''}`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    {isSelected && (
                      <div
                        className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <Check className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                    )}

                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors.iconBg}`}>
                        <Icon className="w-7 h-7" strokeWidth={2} />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-heading font-bold tracking-wider mb-1.5 ${colors.badgeBg}`}>
                          <Icon className="w-3 h-3" />
                          {t('signup.role')}
                        </div>
                        <h3 className="font-heading font-extrabold text-xl text-charcoal tracking-tight leading-tight">
                          {role.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slategray text-[15px] leading-relaxed mb-4">
                      {role.description}
                    </p>

                    <ul className="space-y-2">
                      {role.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm text-slategray m-0">
                          <div className="w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                               style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}>
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </div>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            {/* Continue button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-divider">
              <button
                onClick={() => setCurrentPortal('landing')}
                className="btn btn-secondary sm:order-1 w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('signup.backToHome')}
              </button>
              <button
                onClick={handleContinueToRegister}
                disabled={!selectedRole}
                className={`btn btn-lg w-full sm:w-auto sm:order-2 ${selectedRole ? colorMap[roleOptions.find(r=>r.id===selectedRole).color].btn : 'btn-primary opacity-50 cursor-not-allowed'}`}
              >
                Continue with {selectedRole ? roleOptions.find(r=>r.id===selectedRole).name.replace(' / ', '/').toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()) : 'Selected Role'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
      </div>
    );
  }

  // ---- Render: Success ----
  if (step === 'success') {
    const role = roleOptions.find(r => r.id === selectedRole);
    const colors = colorMap[role.color];
    return (
      <div className="min-h-screen w-full bg-cream-dot flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="card p-8 text-center animate-slideUp">
            <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-4xl shadow-cardXl"
                 style={{ backgroundColor: colors.accent }}>
              <Check className="w-10 h-10" strokeWidth={2.5} />
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-charcoal mb-3 tracking-tight">
              {t('signup.successTitle')}
            </h2>
            <p className="text-slategray text-base mb-8">
              Your {role.name.toLowerCase()} account has been created.
              Taking you to your personalized dashboard now.
            </p>
            <div className="w-full bg-cream-100 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors.iconBg}`}>
                  {React.createElement(role.icon, { className: 'w-5 h-5', strokeWidth: 2 })}
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-sm text-charcoal">{formData.fullName}</div>
                  <div className="text-xs text-slategray">{formData.email}</div>
                </div>
                <div className={`badge ${colors.badgeBg}`}>{role.name.split(' / ')[0]}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs text-slategray">
                {t('signup.demoNote')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- Render: Registration Form ----
  const role = roleOptions.find(r => r.id === selectedRole);
  const colors = colorMap[role.color];
  const Icon = role.icon;

  return (
    <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-3xl">
          <div className="mb-6">
            <button
              onClick={() => setStep('role-select')}
              className="inline-flex items-center gap-2 text-sm font-medium text-slategray hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('signup.chooseDifferentRole')}
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 animate-fadeIn">
            <div className={`flex items-center gap-3.5 rounded-2xl border p-4 bg-white dark:bg-slate-800 shadow-card ${colors.iconBg.replace('bg-', 'border-').split(' ')[1]}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.iconBg}`}>
                <Icon className="w-6 h-6" strokeWidth={2} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`badge ${colors.badgeBg}`}>
                    <Icon className="w-3 h-3" /> {role.name.split(' / ')[0]}
                  </span>
                </div>
                <div className="font-heading font-bold text-charcoal tracking-tight">
                  Create your {role.name.toLowerCase()} account
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slategray font-medium">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${colors.stepBg} border-2`}>
                <Check className="w-3.5 h-3.5" />
              </div>
              <div className="h-0.5 w-8 bg-divider"></div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 text-charcoal border-2 border-charcoal shadow-sm">
                2
              </div>
            </div>
          </div>

          <div className="card p-6 lg:p-8">
            {formError && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3 animate-fadeIn">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 m-0">{formError}</p>
              </div>
            )}

            {selectedRole === 'admin' && (
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 m-0">
                  <strong className="font-semibold">Administrator accounts require institutional authorization.</strong>{' '}
                  In production, your account will be verified against the institution register before access is granted.
                </p>
              </div>
            )}

            {selectedRole === 'parent' && (
              <div className="mb-6 rounded-xl border border-success-200 bg-success-50/60 p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <p className="text-sm text-success-800 m-0">
                  <strong className="font-semibold">Student authorization may be required</strong> before academic information can be viewed.
                  The student will receive a connection request in their portal.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Common fields */}
              <div>
                <h4 className="font-heading font-bold text-charcoal text-sm uppercase tracking-wider mb-4 pb-2 border-b border-divider">
                  {t('signup.personalInfo')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.fullName')}</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slategray" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={e => updateField('fullName', e.target.value)}
                        placeholder="e.g. Jeanne Mukamana"
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-[15px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.emailAddress')}</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slategray" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => updateField('email', e.target.value)}
                        placeholder="you@ur.ac.rw"
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-[15px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.phoneNumber')}</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slategray" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => updateField('phone', e.target.value)}
                        placeholder="+250 7xx xxx xxx"
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-[15px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.password')}</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slategray" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={e => updateField('password', e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full h-12 pl-11 pr-12 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-[15px]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-slategray hover:bg-cream-100"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.confirmPassword')}</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slategray" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={e => updateField('confirmPassword', e.target.value)}
                        placeholder="Retype your password"
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-[15px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Student fields */}
              {selectedRole === 'student' && (
                <div>
                  <h4 className="font-heading font-bold text-charcoal text-sm uppercase tracking-wider mb-4 pb-2 border-b border-divider">
                    {t('signup.studentDetails')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.studentId')}</label>
                      <input
                        type="text"
                        value={formData.studentId}
                        onChange={e => updateField('studentId', e.target.value)}
                        placeholder="e.g. 2024-ICT-001"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-teal/20 focus:border-teal transition-all text-[15px]"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.university')}</label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={e => updateField('university', e.target.value)}
                        placeholder="University of Rwanda"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-teal/20 focus:border-teal transition-all text-[15px]"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.faculty')}</label>
                      <input
                        type="text"
                        value={formData.faculty}
                        onChange={e => updateField('faculty', e.target.value)}
                        placeholder="School of ICT"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-teal/20 focus:border-teal transition-all text-[15px]"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.programme')}</label>
                      <input
                        type="text"
                        value={formData.programme}
                        onChange={e => updateField('programme', e.target.value)}
                        placeholder="BSc. Computer Science"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-teal/20 focus:border-teal transition-all text-[15px]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.yearOfStudy')}</label>
                      <select
                        value={formData.yearOfStudy}
                        onChange={e => updateField('yearOfStudy', e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal focus:outline-none focus:ring-4 focus:ring-teal/20 focus:border-teal transition-all text-[15px]"
                      >
                        <option value="">Select year</option>
                        <option value="Year 1">Year 1 — Freshman</option>
                        <option value="Year 2">Year 2 — Sophomore</option>
                        <option value="Year 3">Year 3 — Junior</option>
                        <option value="Year 4">Year 4 — Senior</option>
                        <option value="Masters">Masters Program</option>
                        <option value="PhD">PhD Program</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Lecturer fields */}
              {selectedRole === 'lecturer' && (
                <div>
                  <h4 className="font-heading font-bold text-charcoal text-sm uppercase tracking-wider mb-4 pb-2 border-b border-divider">
                    {t('signup.lecturerDetails')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.staffId')}</label>
                      <input
                        type="text"
                        value={formData.staffId}
                        onChange={e => updateField('staffId', e.target.value)}
                        placeholder="e.g. STAFF-ICT-224"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-[15px]"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">University / Institution</label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={e => updateField('university', e.target.value)}
                        placeholder="University of Rwanda"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-[15px]"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.department')}</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={e => updateField('department', e.target.value)}
                        placeholder="Dept. of Computer Science"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-[15px]"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">Faculty / School *</label>
                      <input
                        type="text"
                        value={formData.faculty}
                        onChange={e => updateField('faculty', e.target.value)}
                        placeholder="College of Science and Technology"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-[15px]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm font-semibold text-charcoal">Courses / Modules <span className="text-slategray font-normal">(comma separated)</span></label>
                      <input
                        type="text"
                        value={formData.courses}
                        onChange={e => updateField('courses', e.target.value)}
                        placeholder="e.g. Software Engineering, Data Structures, AI Systems"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-[15px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Admin fields */}
              {selectedRole === 'admin' && (
                <div>
                  <h4 className="font-heading font-bold text-charcoal text-sm uppercase tracking-wider mb-4 pb-2 border-b border-divider">
                    {t('signup.adminDetails')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.university')}</label>
                      <input
                        type="text"
                        value={formData.adminInstitution}
                        onChange={e => updateField('adminInstitution', e.target.value)}
                        placeholder="University of Rwanda"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-amber/20 focus:border-amber-400 transition-all text-[15px]"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">Department / Unit *</label>
                      <input
                        type="text"
                        value={formData.adminDepartment}
                        onChange={e => updateField('adminDepartment', e.target.value)}
                        placeholder="Academic Affairs / Registrar"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-amber/20 focus:border-amber-400 transition-all text-[15px]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.adminId')}</label>
                      <input
                        type="text"
                        value={formData.administratorId}
                        onChange={e => updateField('administratorId', e.target.value)}
                        placeholder="e.g. ADMIN-REG-007"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-amber/20 focus:border-amber-400 transition-all text-[15px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Parent connection fields */}
              {selectedRole === 'parent' && (
                <div>
                  <h4 className="font-heading font-bold text-charcoal text-sm uppercase tracking-wider mb-4 pb-2 border-b border-divider">
                    {t('signup.parentDetails')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">Student ID *</label>
                      <input
                        type="text"
                        value={formData.connectStudentId}
                        onChange={e => updateField('connectStudentId', e.target.value)}
                        placeholder="e.g. 2024-ICT-001"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-success/20 focus:border-success transition-all text-[15px]"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.connectStudentEmail')}</label>
                      <input
                        type="email"
                        value={formData.connectStudentEmail}
                        onChange={e => updateField('connectStudentEmail', e.target.value)}
                        placeholder="student@ur.ac.rw"
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal placeholder:text-slategray/60 focus:outline-none focus:ring-4 focus:ring-success/20 focus:border-success transition-all text-[15px]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 text-sm font-semibold text-charcoal">{t('signup.relationship')}</label>
                      <select
                        value={formData.relationship}
                        onChange={e => updateField('relationship', e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-divider bg-white dark:bg-slate-800 text-charcoal focus:outline-none focus:ring-4 focus:ring-success/20 focus:border-success transition-all text-[15px]"
                      >
                        <option value="">Select relationship</option>
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Guardian">Legal Guardian</option>
                        <option value="Sibling">Sibling (18+)</option>
                        <option value="Sponsor">Sponsor</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms */}
              <div>
                <label className="inline-flex items-start gap-3 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={formData.agree}
                    onChange={e => updateField('agree', e.target.checked)}
                    className="mt-0.5 w-4.5 h-4.5 rounded-md border-divider text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slategray leading-relaxed">
                    I agree to the{' '}
                    <span className="font-semibold text-primary group-hover:underline cursor-pointer">Terms of Service</span>{' '}
                    and{' '}
                    <span className="font-semibold text-primary group-hover:underline cursor-pointer">Privacy Policy</span>.
                    I understand this is a prototype demo platform.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-divider">
                <button
                  type="button"
                  onClick={() => setStep('role-select')}
                  className="btn btn-secondary sm:order-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-lg sm:order-2 justify-center ${colors.btn}`}
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> {t('signup.creating')}</>
                  ) : (
                    <>{t('signup.createAccountBtn')} <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
