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
  const { studentData, setStudentTab, submission } = useAppState();
  const { student, stats, myAssignments, courses } = studentData;

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-slate-50 min-h-full">
      
      {/* Student Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-extrabold text-lg text-white shadow-glow">
            JC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Welcome, {student.name}</h1>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                {student.year}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {student.program} • Student ID: <strong className="font-mono text-slate-700">{student.id}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setStudentTab('feedback')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>View Latest Grade & Feedback</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assignments</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">{stats.assignments}</div>
            <p className="text-[11px] text-slate-500 mt-1">Total active this term</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Submitted</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-emerald-600 font-mono">{stats.submitted}</div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">✓ On-time submissions</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-amber-700 font-mono">{stats.pending}</div>
            <p className="text-[11px] text-amber-700 font-medium mt-1">Due August 28, 2026</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Grade</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-indigo-700 font-mono">{stats.averageGrade}</div>
            <p className="text-[11px] text-indigo-600 font-semibold mt-1">Cumulative GPA: {student.gpa}</p>
          </div>
        </div>

      </div>

      {/* Primary Highlight Card: Climate Change Essay Result */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border border-blue-500/40 p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-glow-emerald shrink-0 mt-1">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Grade Published
              </span>
              <span className="text-xs text-slate-400">• ENV-101</span>
            </div>
            <h3 className="text-lg font-bold text-white">Climate Change and Sustainable Development</h3>
            <p className="text-xs text-slate-300">
              Due: <strong>20 August 2026</strong> • Status: <span className="text-emerald-400 font-semibold">Submitted & Evaluated</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Grade</span>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              17 <span className="text-sm font-normal text-slate-300">/ 20</span> <span className="text-sm text-white">(85%)</span>
            </div>
          </div>

          <button
            onClick={() => setStudentTab('feedback')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-900/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>View Result</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* All Assignments Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-subtle p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Enrolled Course Assignments</h3>
          <span className="text-xs text-slate-500 font-medium">Term 2 — 2026 Academic Year</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Assignment</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myAssignments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-slate-900">
                    {a.title}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">
                    {a.course}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">
                    {a.dueDate}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      a.status === 'Submitted' || a.status === 'Graded' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-800 border border-amber-300'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-slate-800">
                    {a.id === 'asg-01' ? '17 / 20 (85%)' : `${a.score} (${a.percentage})`}
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => {
                        if (a.id === 'asg-01') {
                          setStudentTab('feedback');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1"
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
