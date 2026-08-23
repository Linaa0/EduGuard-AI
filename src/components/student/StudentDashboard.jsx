import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  Award,
  Calendar
} from 'lucide-react';

export default function StudentDashboard() {
  const { studentData, setStudentTab, submission, t } = useAppState();
  const { student, stats, myAssignments, courses } = studentData;

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-cream dark:bg-slate-900 min-h-full">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-divider dark:border-slate-700">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-700 flex items-center justify-center font-extrabold text-lg text-white shadow-glow">
            JC
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-white tracking-tight">Welcome, {student.name}</h1>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                {student.year}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slategray dark:text-slate-400 mt-2">
              {student.program} • Student ID: <strong className="font-mono text-charcoal dark:text-slate-200">{student.id}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setStudentTab('feedback')}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{t('stuView.latestGrade')} & {t('stuPortal.feedback')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-card flex flex-col justify-between card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slategray dark:text-slate-400 uppercase tracking-wider">Assignments</span>
            <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-5">
            <div className="text-3xl font-extrabold text-charcoal dark:text-white font-mono">{stats.assignments}</div>
            <p className="text-[11px] text-slategray dark:text-slate-400 mt-1.5">Total active this term</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-card flex flex-col justify-between card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slategray dark:text-slate-400 uppercase tracking-wider">Submitted</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-5">
            <div className="text-3xl font-extrabold text-emerald-600 font-mono">{stats.submitted}</div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1.5">✓ On-time submissions</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-card flex flex-col justify-between card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slategray dark:text-slate-400 uppercase tracking-wider">Pending</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-5">
            <div className="text-3xl font-extrabold text-amber-700 font-mono">{stats.pending}</div>
            <p className="text-[11px] text-amber-700 font-medium mt-1.5">Due August 28, 2026</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-card flex flex-col justify-between card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slategray dark:text-slate-400 uppercase tracking-wider">Average Grade</span>
            <div className="p-2.5 rounded-xl bg-navy-50 text-navy-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-5">
            <div className="text-3xl font-extrabold text-navy-700 font-mono">{stats.averageGrade}</div>
            <p className="text-[11px] text-navy-600 font-semibold mt-1.5">Cumulative GPA: {student.gpa}</p>
          </div>
        </div>

      </div>

      <div className="rounded-2xl bg-gradient-to-r from-navy-900 via-brand-950 to-navy-900 border border-brand-500/40 p-6 sm:p-7 text-white shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-glow-emerald shrink-0 mt-1">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Grade Published
              </span>
              <span className="text-xs text-slate-400">• ENV-101</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Climate Change and Sustainable Development</h3>
            <p className="text-xs text-slate-300">
              Due: <strong>20 August 2026</strong> • Status: <span className="text-emerald-400 font-semibold">Submitted & Evaluated</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Grade</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              17 <span className="text-sm font-normal text-slate-300">/ 20</span> <span className="text-sm text-white">(85%)</span>
            </div>
          </div>

          <button
            onClick={() => setStudentTab('feedback')}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-900/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>View Result</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-card p-6 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-divider dark:border-slate-700">
          <h3 className="font-display text-base font-bold text-charcoal dark:text-white">Enrolled Course Assignments</h3>
          <span className="text-xs text-slategray dark:text-slate-400 font-medium">Term 2 — 2026 Academic Year</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-50 dark:bg-slate-700 text-slategray dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-divider dark:border-slate-700">
              <tr>
                <th className="px-4 py-3.5">Assignment</th>
                <th className="px-4 py-3.5">Course</th>
                <th className="px-4 py-3.5">Due Date</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Score</th>
                <th className="px-4 py-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100 dark:divide-slate-700">
              {myAssignments.map((a) => (
                <tr key={a.id} className="hover:bg-cream-50 dark:bg-slate-700 transition-colors">
                  <td className="px-4 py-4 font-bold text-charcoal dark:text-white">
                    {a.title}
                  </td>
                  <td className="px-4 py-4 text-slategray dark:text-slate-400">
                    {a.course}
                  </td>
                  <td className="px-4 py-4 text-slategray dark:text-slate-400">
                    {a.dueDate}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                      a.status === 'Submitted' || a.status === 'Graded' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-800 border border-amber-300'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-mono font-bold text-charcoal dark:text-slate-200">
                    {a.id === 'asg-01' ? '17 / 20 (85%)' : `${a.score} (${a.percentage})`}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => {
                        if (a.id === 'asg-01') {
                          setStudentTab('feedback');
                        }
                      }}
                      className="px-3.5 py-2 rounded-lg bg-cream-100 dark:bg-slate-700 hover:bg-brand-600 hover:text-white text-charcoal dark:text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1"
                    >
                      <span>{a.hasFeedback ? 'View Feedback' : 'Details'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
