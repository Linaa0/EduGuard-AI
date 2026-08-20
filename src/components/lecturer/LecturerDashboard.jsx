import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Users, 
  FileText, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  PlusCircle, 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  RotateCcw,
  Award
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function LecturerDashboard() {
  const { 
    stats, 
    recentAssessments, 
    setLecturerTab, 
    setIsCreateAssignmentOpen, 
    runAiAssessmentSimulation,
    startDemoTour
  } = useAppState();

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssessments = recentAssessments.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.assignment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'pending' && item.status.includes('Pending')) ||
      (filterStatus === 'approved' && item.status.includes('Approved')) ||
      (filterStatus === 'review' && item.status.includes('Human Review'));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-slate-50 min-h-full">
      
      {/* Top Banner / Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Lecturer Assessment Center</h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Dr. Alice Mukamana
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Course: <strong>ENV-101 (Introduction to Environmental Studies)</strong> • Active Assessment Queue
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateAssignmentOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
          
          <button
            onClick={() => {
              setLecturerTab('ai-assessment');
              runAiAssessmentSimulation();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Run AI Agent</span>
          </button>
        </div>
      </div>

      {/* 5 Core Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Students</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">{stats.totalStudents}</div>
            <p className="text-[11px] text-slate-500 mt-1">Enrolled across 2 cohorts</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Assignments</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">{stats.activeAssignments}</div>
            <p className="text-[11px] text-slate-500 mt-1">Current term 2026</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-subtle flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-amber-500"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Pending Reviews</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-amber-900 font-mono">{stats.pendingReviews}</div>
            <p className="text-[11px] text-amber-700 mt-1 font-medium">Awaiting Lecturer Sign-Off</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Assessments</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">{stats.aiAssessmentsCompleted}</div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">✓ Avg Confidence 92%</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Class Average</span>
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 font-mono">{stats.averageClassScore}%</div>
            <p className="text-[11px] text-slate-500 mt-1">14.4 / 20 avg raw score</p>
          </div>
        </div>

      </div>

      {/* Golden Path Highlight Callout: Jean Claude's Review Ready */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 border border-blue-500/40 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-glow shrink-0">
            JC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Awaiting Lecturer Action
              </span>
              <span className="text-xs text-slate-400">• ENV-101 Essay</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">Jean Claude — Climate Change Essay (16/20 Suggested)</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              AI completed evaluation with <strong>91% confidence</strong>. Click to review, modify criteria, and finalize grade.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setLecturerTab('human-review')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-glow-emerald transition-all hover:scale-105"
          >
            <span>Review & Finalize</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recent Assessments Table */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-subtle overflow-hidden">
        
        {/* Table Controls */}
        <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Student Assessments</h3>
            <p className="text-xs text-slate-500 mt-0.5">Showing latest evaluated submissions in Introduction to Environmental Studies</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            {/* Search filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student or essay..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${filterStatus === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${filterStatus === 'pending' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${filterStatus === 'approved' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilterStatus('review')}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${filterStatus === 'review' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Human Review
              </button>
            </div>

          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Student</th>
                <th className="px-6 py-3.5">Assignment</th>
                <th className="px-6 py-3.5">AI Suggested</th>
                <th className="px-6 py-3.5">AI Confidence</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Lecturer Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssessments.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-slate-50/80 transition-colors ${item.id === 'sub-01' ? 'bg-blue-50/30' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                        {item.studentName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{item.studentName}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{item.studentId}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">{item.assignment}</p>
                    <p className="text-[11px] text-slate-400">{item.date}</p>
                  </td>

                  <td className="px-6 py-4 font-mono font-bold text-slate-800">
                    {item.score}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      {item.confidence}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => setLecturerTab('human-review')}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-semibold text-xs border border-slate-200 transition-colors flex items-center gap-1.5"
                    >
                      <span>Review Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing 6 of 28 submissions</span>
          <span className="font-mono text-[11px]">EduGuard AI Human-in-the-Loop Moderation Active</span>
        </div>

      </div>

    </div>
  );
}
