import React, { useState } from 'react';
import { Users, Search, Award, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function StudentsDirectory() {
  const { setCurrentPortal, setStudentTab } = useAppState();
  const [search, setSearch] = useState('');

  const students = [
    { id: "STU-8821", name: "Jean Claude", email: "j.claude@student.univ.edu", gpa: "3.72", status: "Submitted (17/20)", highlight: true },
    { id: "STU-8822", name: "Alice Kayitesi", email: "a.kayitesi@student.univ.edu", gpa: "3.89", status: "Approved (18/20)" },
    { id: "STU-8823", name: "Eric Mugisha", email: "e.mugisha@student.univ.edu", gpa: "3.15", status: "Human Review Flagged (13/20)" },
    { id: "STU-8824", name: "Deborah Umutoni", email: "d.umutoni@student.univ.edu", gpa: "3.64", status: "Approved (15/20)" },
    { id: "STU-8825", name: "Fabrice Habimana", email: "f.habimana@student.univ.edu", gpa: "2.95", status: "Human Review Flagged (11/20)" },
    { id: "STU-8826", name: "Grace Uwase", email: "g.uwase@student.univ.edu", gpa: "3.78", status: "Approved (17/20)" }
  ];

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-slate-50 min-h-full">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Student Cohort Roster</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">130 enrolled undergraduate students in ENV-101 (Section A)</p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-subtle overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-3.5">Student</th>
              <th className="px-6 py-3.5">ID & Email</th>
              <th className="px-6 py-3.5">Cumulative GPA</th>
              <th className="px-6 py-3.5">Climate Change Essay Status</th>
              <th className="px-6 py-3.5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((s) => (
              <tr key={s.id} className={`hover:bg-slate-50 transition-colors ${s.highlight ? 'bg-blue-50/40' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                      {s.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-bold text-slate-900">{s.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  <div className="font-mono text-slate-700">{s.id}</div>
                  <div className="text-[11px] text-slate-400">{s.email}</div>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-slate-800">
                  {s.gpa} / 4.0
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    s.status.includes('Approved') || s.status.includes('Submitted') 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border border-amber-300'
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {s.id === 'STU-8821' && (
                    <button
                      onClick={() => {
                        setCurrentPortal('student');
                        setStudentTab('dashboard');
                      }}
                      className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px] hover:bg-blue-500 transition-colors"
                    >
                      View Student Portal
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
