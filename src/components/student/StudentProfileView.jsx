import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { User, Award, BookOpen, Calendar, Mail, ShieldCheck } from 'lucide-react';
import { studentPortalData } from '../../data/mockData';

export default function StudentProfileView() {
  const { student, courses } = studentPortalData;

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-cream dark:bg-slate-900 min-h-full">
      
      <div className="pb-4 border-b border-divider dark:border-slate-700">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-white tracking-tight">Academic Student Profile</h1>
        <p className="text-xs sm:text-sm text-slategray dark:text-slate-400 mt-1">Official university academic record and enrolled modules</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-subtle space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-xl text-white shadow-glow">
            JC
          </div>

          <div>
            <h2 className="text-lg font-bold text-charcoal dark:text-white">{student.name}</h2>
            <p className="text-xs text-slategray dark:text-slate-400 font-mono">ID: {student.id}</p>
            <p className="text-xs text-blue-600 font-semibold mt-1">{student.program}</p>
          </div>

          <div className="pt-3 border-t border-divider dark:border-slate-700 space-y-2 text-xs">
            <div className="flex justify-between text-slategray dark:text-slate-400">
              <span>Academic Standing:</span>
              <span className="font-bold text-emerald-600">Good Standing</span>
            </div>
            <div className="flex justify-between text-slategray dark:text-slate-400">
              <span>Cumulative GPA:</span>
              <span className="font-mono font-bold text-charcoal dark:text-white">{student.gpa} / 4.0</span>
            </div>
            <div className="flex justify-between text-slategray dark:text-slate-400">
              <span>Cohort Year:</span>
              <span className="font-bold text-charcoal dark:text-slate-200">{student.year}</span>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-charcoal dark:text-white">Enrolled Courses & Academic Standings</h3>

          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c.code} className="p-3.5 rounded-xl bg-cream-50 dark:bg-slate-700 border border-divider dark:border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                    {c.code}
                  </span>
                  <h4 className="text-xs font-bold text-charcoal dark:text-white mt-1">{c.name}</h4>
                  <p className="text-[11px] text-slategray dark:text-slate-400">Instructor: {c.lecturer}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {c.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
