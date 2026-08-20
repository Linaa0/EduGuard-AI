import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Inbox, 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles,
  Download,
  Eye
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function SubmissionsList() {
  const { recentAssessments, setLecturerTab } = useAppState();
  const [search, setSearch] = useState('');

  const filtered = recentAssessments.filter(a => 
    a.studentName.toLowerCase().includes(search.toLowerCase()) || 
    a.studentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-slate-50 min-h-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Student Submissions Intake</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            28 total submissions received for <strong>Climate Change and Sustainable Development (ENV-101)</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Student</th>
                <th className="px-6 py-3.5">Submission Document</th>
                <th className="px-6 py-3.5">Submitted Timestamp</th>
                <th className="px-6 py-3.5">AI Suggestion</th>
                <th className="px-6 py-3.5">Final Score</th>
                <th className="px-6 py-3.5">Moderation Status</th>
                <th className="px-6 py-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-900">{item.studentName}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{item.studentId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-700">
                    {item.studentName.split(' ')[0]}_Climate_Change_Essay.pdf
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {item.date} 16:42
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-800">
                    {item.score}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-600">
                    {item.finalScore}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setLecturerTab('human-review')}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-semibold text-xs border border-blue-200 transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
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
