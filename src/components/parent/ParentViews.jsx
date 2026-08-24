import React from 'react';
import {
  GraduationCap,
  Award,
  TrendingUp,
  Clock,
  MessageSquareQuote,
  CalendarCheck,
  Bell,
  User,
  Search,
  MoreHorizontal,
  FileText,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Sparkles,
  HeartHandshake,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

// ======================= PARENT DASHBOARD VIEW =======================
export function ParentDashboardView() {
  const { currentUser, showToast, t } = useAppState();
  const stats = [
    { label: t('parView.overallGPA'), value: '3.68', change: '+0.24', trend: 'up', icon: Award, color: 'success', note: 'Previous: 3.44' },
    { label: t('parView.assignmentsDue'), value: '3', change: 'This week', trend: 'up', icon: FileText, color: 'teal', note: 'Submit by Oct 28' },
    { label: t('parView.attendanceRate'), value: '94%', change: '-1%', trend: 'down', icon: CalendarCheck, color: 'primary', note: 'Class avg: 89%' },
    { label: t('parView.newFeedback'), value: '5', change: 'This week', trend: 'up', icon: MessageSquareQuote, color: 'amber', note: 'Read & discussed' },
  ];

  const grades = [
    { course: 'Software Engineering', grade: 'A-', score: '82%', credits: 4, trend: 'up' },
    { course: 'Data Structures', grade: 'B+', score: '76%', credits: 4, trend: 'up' },
    { course: 'Discrete Math', grade: 'B', score: '71%', credits: 3, trend: 'same' },
    { course: 'Technical Writing', grade: 'A', score: '89%', credits: 2, trend: 'up' },
    { course: 'Intro to Environment', grade: 'A-', score: '83%', credits: 3, trend: 'same' },
  ];

  return (
    <div className="p-5 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <span className="eyebrow !mb-2 inline-flex">
            <HeartHandshake className="w-3.5 h-3.5" />
            Parent Dashboard
          </span>
          <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-charcoal tracking-tight leading-tight">
            Welcome back, {currentUser?.name || 'Parent'}
          </h2>
          <p className="text-slategray mt-1.5 max-w-2xl">
            Connected to <span className="font-semibold text-charcoal">Jean-Paul Niyonsaba (STU-8821)</span> · Year 2 · School of ICT · University of Rwanda.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => showToast('Contact', 'Opening teacher messaging...', 'info')} className="btn btn-secondary">
            <MessageSquareQuote className="w-4 h-4" />
            Contact Lecturer
          </button>
          <button onClick={() => showToast('Report', 'Downloading semester report...', 'info')} className="btn btn-primary">
            <FileText className="w-4 h-4" />
            Semester Report
          </button>
        </div>
      </div>

      {/* Student snapshot card */}
      <div className="card p-6 bg-gradient-to-br from-success-50/60 via-white to-teal-50/40 border-success-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-4 md:col-span-1">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-teal-500 flex items-center justify-center font-heading font-extrabold text-2xl text-white shadow-cardLg">
                JP
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-full bg-success text-white flex items-center justify-center shadow-card border-2 border-white">
                <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-charcoal leading-tight">
                Jean-Paul Niyonsaba
              </h3>
              <p className="text-sm text-slategray mt-1">BSc. Computer Science · Year 2</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="badge badge-primary">2024-ICT-001</span>
                <span className="badge badge-success">Good Standing</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(s => {
              const Ic = s.icon;
              const colorMap = {
                teal: 'bg-teal-50 text-teal-700 border-teal-200',
                primary: 'bg-primary-50 text-primary border-primary-200',
                amber: 'bg-amber-50 text-amber-700 border-amber-200',
                success: 'bg-success-50 text-success border-success-200',
              };
              const trendMap = {
                up: 'text-success',
                down: 'text-red-600',
                same: 'text-slategray',
              };
              const TrendIc = s.trend === 'up' ? ArrowUpRight : s.trend === 'down' ? ArrowDownRight : null;
              return (
                <div key={s.label} className="rounded-xl bg-white dark:bg-slate-800 border border-divider p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${colorMap[s.color]}`}>
                      <Ic className="w-4.5 h-4.5" />
                    </div>
                    {TrendIc && <span className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${trendMap[s.trend]}`}>
                      <TrendIc className="w-3.5 h-3.5" /> {s.change}
                    </span>}
                  </div>
                  <div className="font-heading font-extrabold text-2xl text-charcoal leading-none">{s.value}</div>
                  <div className="text-[12px] font-semibold text-charcoal/80 mt-1">{s.label}</div>
                  <div className="text-[11px] text-slategray mt-0.5">{s.note}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grades + Recent Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Grades table */}
        <div className="card p-5 lg:col-span-3">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h4 className="font-heading font-bold text-lg text-charcoal leading-tight">
                Current Semester Grades
              </h4>
              <p className="text-sm text-slategray mt-1">Ongoing assessment results · Updated daily</p>
            </div>
            <span className="badge badge-teal">
              <Sparkles className="w-3 h-3" />
              AI-Assisted Grading
            </span>
          </div>
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-left border-collapse min-w-full">
              <thead>
                <tr className="text-[11px] font-heading font-bold uppercase tracking-wider text-slategray bg-cream-50 border-y border-divider">
                  <th className="py-2.5 px-5">Course</th>
                  <th className="py-2.5 px-3">Credits</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Grade</th>
                  <th className="py-2.5 px-5 text-right">Trend</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((g, i) => (
                  <tr key={i} className="border-b border-divider last:border-b-0 hover:bg-cream-50/70 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                          <BookOpen className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-charcoal leading-tight">{g.course}</div>
                          <div className="text-[11px] text-slategray">{g.credits} credits</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-sm font-semibold text-charcoal">{g.credits}</td>
                    <td className="py-3.5 px-3">
                      <div>
                        <div className="font-bold text-sm text-charcoal leading-none">{g.score}</div>
                        <div className="h-1.5 w-20 mt-1.5 rounded-full bg-cream-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              g.score.startsWith('8') || g.score.startsWith('9') ? 'bg-success'
                              : g.score.startsWith('7') ? 'bg-teal'
                              : 'bg-amber-400'
                            }`}
                            style={{ width: g.score }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg font-heading font-extrabold text-sm border ${
                        g.grade.startsWith('A') ? 'bg-success-50 text-success border-success-200'
                        : g.grade.startsWith('B') ? 'bg-teal-50 text-teal-700 border-teal-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {g.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                        g.trend === 'up' ? 'text-success' : g.trend === 'down' ? 'text-red-600' : 'text-slategray'
                      }`}>
                        {g.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : g.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> : <span>—</span>}
                        {g.trend === 'up' ? 'Improving' : g.trend === 'down' ? 'Declining' : 'Steady'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent feedback */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h4 className="font-heading font-bold text-lg text-charcoal leading-tight">
                Lecturer Feedback
              </h4>
              <p className="text-sm text-slategray mt-1">AI summaries with human final touch</p>
            </div>
            <button onClick={() => showToast('Feedback', 'Opening full feedback history...', 'info')} className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
              All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Software Engineering — Lab #3', grade: 'A-', when: '2 days ago', msg: 'Excellent systems design diagrams. Consider adding exception handling in the data layer next time. Great work overall!', by: 'Dr. J. Mukamana', type: 'success' },
              { title: 'Data Structures — Midterm', grade: 'B+', when: '5 days ago', msg: 'Strong grasp of sorting algorithms. Weakness in AVL tree balancing — recommend reviewing lecture 7 resources.', by: 'Dr. P. Rwibasira', type: 'teal' },
              { title: 'Discrete Math — Problem Set 5', grade: 'B', when: '1 week ago', msg: 'Correct approach but algebraic errors in proof 2. Try writing each step explicitly.', by: 'Mr. E. Maniraguha', type: 'amber' },
            ].map((f, i) => {
              const typeMap = {
                success: 'border-success-200 bg-success-50/40',
                teal: 'border-teal-200 bg-teal-50/40',
                amber: 'border-amber-200 bg-amber-50/40',
              };
              return (
                <div key={i} className={`p-4 rounded-xl border ${typeMap[f.type]} transition-all hover:shadow-card cursor-pointer`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-charcoal leading-tight truncate">{f.title}</div>
                      <div className="text-[11px] text-slategray mt-0.5">by {f.by} · {f.when}</div>
                    </div>
                    <span className={`inline-flex items-center justify-center w-9 h-8 rounded-lg font-heading font-extrabold text-xs flex-shrink-0 border ${
                      f.grade.startsWith('A') ? 'bg-success-50 text-success border-success-200' :
                      f.grade.startsWith('B') ? 'bg-teal-50 text-teal-700 border-teal-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {f.grade}
                    </span>
                  </div>
                  <p className="text-[13px] text-slategray leading-relaxed">
                    "{f.msg}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming + Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading font-bold text-lg text-charcoal leading-tight">
              Upcoming Submissions
            </h4>
            <Clock className="w-4.5 h-4.5 text-slategray" />
          </div>
          <div className="space-y-3">
            {[
              { title: 'CSE-201 — Final Project Proposal', due: 'Oct 28, 2026', urgency: 'urgent', progress: 'Draft started' },
              { title: 'CSE-204 — Algorithm Worksheet', due: 'Oct 30, 2026', urgency: 'soon', progress: 'Not started' },
              { title: 'ENV-101 — Group Research Paper', due: 'Nov 05, 2026', urgency: 'later', progress: '40% complete' },
            ].map((t, i) => {
              const bg = t.urgency === 'urgent' ? 'border-red-200 bg-red-50/50'
                       : t.urgency === 'soon' ? 'border-amber-200 bg-amber-50/40'
                       : 'border-divider bg-white';
              const badgeCls = t.urgency === 'urgent' ? 'bg-red-50 text-red-600 border-red-200'
                              : t.urgency === 'soon' ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-primary-50 text-primary border-primary-200';
              return (
                <div key={i} className={`p-4 rounded-xl border ${bg} flex items-center justify-between gap-4 hover:shadow-card transition-all cursor-pointer`}>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-divider flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-charcoal leading-tight truncate">{t.title}</div>
                      <div className="text-[11px] text-slategray mt-0.5">{t.progress}</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold border ${badgeCls}`}>
                      {t.due.split(',')[0]}
                    </span>
                    <div className="text-[11px] text-slategray mt-1">{t.due.split(',')[1]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading font-bold text-lg text-charcoal leading-tight">
              Attendance Overview
            </h4>
            <CalendarCheck className="w-4.5 h-4.5 text-slategray" />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { lbl: 'Present', val: '94%', color: 'bg-success-50 text-success border-success-200' },
              { lbl: 'Absent', val: '4%', color: 'bg-red-50 text-red-600 border-red-200' },
              { lbl: 'Excused', val: '2%', color: 'bg-amber-50 text-amber-700 border-amber-200' },
            ].map(s => (
              <div key={s.lbl} className={`p-4 rounded-xl border text-center ${s.color}`}>
                <div className="font-heading font-extrabold text-2xl leading-none">{s.val}</div>
                <div className="text-[11px] font-bold mt-1.5 uppercase tracking-wider">{s.lbl}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slategray">Semester attendance trend</span>
              <span className="text-success">+2% vs last semester</span>
            </div>
            <div className="grid grid-cols-10 gap-1.5">
              {[92,90,95,96,93,94,97,92,95,94].map((v, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-full relative h-24 bg-cream-100 rounded-md overflow-hidden">
                    <div
                      className={`w-full absolute bottom-0 rounded-md transition-all ${v >= 95 ? 'bg-success' : v >= 90 ? 'bg-teal' : 'bg-amber-400'}`}
                      style={{ height: `${v}%` }}
                    ></div>
                  </div>
                  <div className="text-[9px] font-semibold text-slategray">W{i+1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ======================= PARENT PROFILE / STUDENT DETAILS VIEW =======================
export function ParentStudentView() {
  return (
    <div className="p-5 lg:p-8 max-w-[1100px] mx-auto space-y-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="eyebrow !mb-2 inline-flex"><Users className="w-3.5 h-3.5" /> Connected Student</span>
          <h2 className="font-heading font-extrabold text-2xl text-charcoal">Student Profile</h2>
        </div>
      </div>
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6 pb-6 border-b border-divider">
          <div className="w-24 h-24 rounded-2xl bg-teal-500 flex items-center justify-center font-heading font-extrabold text-3xl text-white shadow-cardLg mx-auto md:mx-0">
            JP
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-heading font-extrabold text-2xl text-charcoal">Jean-Paul Niyonsaba</h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap justify-center md:justify-start">
              <span className="badge badge-primary">2024-ICT-001</span>
              <span className="badge badge-teal">Year 2</span>
              <span className="badge badge-success">Good Standing</span>
            </div>
            <div className="text-sm text-slategray mt-2">BSc. Computer Science · School of ICT · College of Science and Technology</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { lbl: 'Date of Birth', val: 'April 14, 2004' },
            { lbl: 'Nationality', val: 'Rwandan' },
            { lbl: 'Programme Duration', val: '4 Years (2024 – 2028)' },
            { lbl: 'Expected Graduation', val: 'July 2028' },
            { lbl: 'Faculty Advisor', val: 'Dr. Jeanne Mukamana' },
            { lbl: 'Accommodation', val: 'On Campus — Gikondo Hostel' },
          ].map(x => (
            <div key={x.lbl} className="p-4 rounded-xl border border-divider bg-cream-50/50">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slategray mb-1">{x.lbl}</div>
              <div className="font-bold text-charcoal">{x.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ======================= PROGRESS / ATTENDANCE / FEEDBACK GENERIC VIEW =======================
function SimpleParentCard({ eyebrow, icon: Icon, title, subtitle, contentColor = 'teal', hint, children }) {
  return (
    <div className="p-5 lg:p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          {eyebrow && (
            <span className="eyebrow !mb-2 inline-flex">
              <Icon className="w-3.5 h-3.5" /> {eyebrow}
            </span>
          )}
          <h2 className="font-heading font-extrabold text-2xl lg:text-3xl text-charcoal tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && <p className="text-slategray mt-1.5 max-w-2xl">{subtitle}</p>}
        </div>
      </div>
      <div className="card p-8">
        {children || (
          <div className="w-full min-h-[360px] flex flex-col items-center justify-center text-center">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 bg-${contentColor}-50 text-${contentColor}-600 border border-${contentColor}-200`}>
              <Icon className="w-9 h-9" />
            </div>
            <h4 className="font-heading font-bold text-xl text-charcoal mb-2">Feature View</h4>
            <p className="text-slategray max-w-lg mb-4">
              {hint || 'This view contains detailed information for the selected section.'}
            </p>
            <button className="btn btn-primary">
              <FileText className="w-4 h-4" /> Download Detailed Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ParentProgressView() {
  return (
    <SimpleParentCard
      eyebrow="Academic Tracking"
      icon={TrendingUp}
      title="Academic Progress"
      subtitle="Semester-over-semester GPA trend, course completion, and on-track-to-graduate status."
      contentColor="success"
      hint="Track Jean-Paul's academic journey from Year 1 to present. Compare GPA against class averages and program benchmarks. Identify weak subjects early and access learning resources."
    />
  );
}

export function ParentGradesView() {
  return (
    <SimpleParentCard
      eyebrow="Academic Records"
      icon={Award}
      title="Full Grade History"
      subtitle="All assessed work across every semester, including assignments, tests, midterms, and final exams."
      contentColor="primary"
      hint="Complete transcript view with grade distribution, course-by-course breakdown, and lecturer comments per graded item. Includes provisional and finalized grades."
    />
  );
}

export function ParentFeedbackView() {
  return (
    <SimpleParentCard
      eyebrow="Communication"
      icon={MessageSquareQuote}
      title="Feedback Summary"
      subtitle="Consolidated AI-assisted and lecturer-provided feedback on graded submissions."
      contentColor="teal"
      hint="See every piece of feedback Jean-Paul has received. Track themes, recommended learning resources, and improvement suggestions from lecturers."
    />
  );
}

export function ParentAttendanceView() {
  return (
    <SimpleParentCard
      eyebrow="Engagement"
      icon={CalendarCheck}
      title="Attendance & Class Participation"
      subtitle="Attendance records, class engagement, and activity metrics across all registered courses."
      contentColor="amber"
      hint="Daily attendance, absences (excused / unexcused), late arrivals, and participation scores. Spot trends early and intervene when engagement drops."
    />
  );
}

export function ParentNotificationsView() {
  const items = [
    { title: 'CSE-201 Grade Published', msg: 'Lab #3 scored 82/100 (A-). Dr. Mukamana left detailed feedback.', when: '2 days ago', type: 'success', ico: Award },
    { title: 'Assignment Due Soon', msg: 'Final Project Proposal is due in 6 days (Oct 28). Draft started.', when: '3 days ago', type: 'amber', ico: FileText },
    { title: 'Attendance Alert', msg: 'Jean-Paul arrived late to Discrete Math on Monday — 1st occurrence.', when: '4 days ago', type: 'primary', ico: AlertTriangle },
    { title: 'Parent Connection Confirmed', msg: 'Your connection request was approved. You can now view academic records.', when: '2 weeks ago', type: 'teal', ico: Shield },
  ];
  return (
    <div className="p-5 lg:p-8 max-w-[1100px] mx-auto space-y-6">
      <div>
        <span className="eyebrow !mb-2 inline-flex"><Bell className="w-3.5 h-3.5" /> Updates</span>
        <h2 className="font-heading font-extrabold text-2xl text-charcoal">Notifications</h2>
        <p className="text-slategray mt-1.5">Important updates about your connected student.</p>
      </div>
      <div className="space-y-3">
        {items.map((n, i) => {
          const Ic = n.ico;
          const cls = n.type === 'success' ? 'border-success-200 bg-success-50/40'
                   : n.type === 'amber' ? 'border-amber-200 bg-amber-50/40'
                   : n.type === 'teal' ? 'border-teal-200 bg-teal-50/40'
                   : 'border-primary-200 bg-primary-50/40';
          const iconCls = n.type === 'success' ? 'bg-success text-white'
                       : n.type === 'amber' ? 'bg-amber-400 text-white'
                       : n.type === 'teal' ? 'bg-teal text-white'
                       : 'bg-primary text-white';
          return (
            <div key={i} className={`card p-4 flex items-start gap-4 ${cls} cursor-pointer hover:shadow-cardLg transition-all`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconCls}`}>
                <Ic className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 mb-0.5">
                  <h4 className="font-heading font-bold text-base text-charcoal leading-tight">{n.title}</h4>
                  <span className="text-[11px] text-slategray flex-shrink-0">{n.when}</span>
                </div>
                <p className="text-sm text-slategray leading-relaxed">{n.msg}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ParentProfileView() {
  const { currentUser, showToast, t } = useAppState();
  return (
    <div className="p-5 lg:p-8 max-w-[1000px] mx-auto space-y-6">
      <div>
        <span className="eyebrow !mb-2 inline-flex"><User className="w-3.5 h-3.5" /> Account</span>
        <h2 className="font-heading font-extrabold text-2xl text-charcoal">My Profile</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card p-6 text-center">
          <div className="w-24 h-24 rounded-2xl bg-primary text-white flex items-center justify-center font-heading font-extrabold text-3xl mx-auto mb-4 shadow-cardLg">
            {currentUser?.avatar || currentUser?.name?.charAt(0) || 'P'}
          </div>
          <h3 className="font-heading font-bold text-xl text-charcoal leading-tight">
            {currentUser?.name || 'Parent / Guardian'}
          </h3>
          <div className="text-sm text-slategray mt-0.5">{currentUser?.email}</div>
          <div className="mt-3">
            <span className="badge badge-success">
              <HeartHandshake className="w-3 h-3" /> Verified Guardian
            </span>
          </div>
          <button onClick={() => showToast('Photo', 'Upload profile photo dialog', 'info')} className="btn btn-secondary w-full mt-5">
            <User className="w-4 h-4" /> Change Photo
          </button>
        </div>
        <div className="card p-6 lg:col-span-2">
          <h4 className="font-heading font-bold text-lg text-charcoal mb-5">Account Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { lbl: 'Full Name', val: currentUser?.name || 'Ms. Olive Uwase' },
              { lbl: 'Email Address', val: currentUser?.email || 'parent@eduguard.ai' },
              { lbl: 'Phone Number', val: '+250 788 123 456' },
              { lbl: 'Relationship to Student', val: 'Mother' },
              { lbl: 'Connected Student', val: 'Jean-Paul Niyonsaba (2024-ICT-001)' },
              { lbl: 'Authorization Status', val: 'Approved' },
            ].map(x => (
              <div key={x.lbl}>
                <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slategray">{x.lbl}</label>
                <input
                  type="text"
                  defaultValue={x.val}
                  className="w-full h-11 px-4 rounded-xl border border-divider bg-cream-50 text-charcoal focus:outline-none focus:ring-4 focus:ring-success/10 focus:border-success text-sm"
                  readOnly
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-2 justify-end">
            <button className="btn btn-secondary">Cancel</button>
            <button onClick={() => showToast('Saved', 'Profile changes saved (demo only)', 'success')} className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
