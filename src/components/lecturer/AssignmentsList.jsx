import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { FileText, Plus, Users, Calendar, ArrowRight, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function AssignmentsList() {
  const { assignment, setIsCreateAssignmentOpen, setLecturerTab } = useAppState();

  const assignments = [
    {
      id: "asg-01",
      title: "Climate Change and Sustainable Development",
      course: "ENV-101 (Intro to Environmental Studies)",
      dueDate: "20 August 2026",
      maxScore: 20,
      totalSubmissions: 28,
      evaluatedCount: 28,
      pendingReview: 3,
      status: "Active"
    },
    {
      id: "asg-02",
      title: "Renewable Energy Transition in East Africa",
      course: "ENV-101 (Intro to Environmental Studies)",
      dueDate: "05 September 2026",
      maxScore: 25,
      totalSubmissions: 0,
      evaluatedCount: 0,
      pendingReview: 0,
      status: "Upcoming"
    },
    {
      id: "asg-03",
      title: "Biodiversity Conservation & National Parks Policy",
      course: "ENV-101 (Intro to Environmental Studies)",
      dueDate: "12 August 2026",
      maxScore: 20,
      totalSubmissions: 30,
      evaluatedCount: 30,
      pendingReview: 0,
      status: "Completed"
    }
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-slate-50 min-h-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Assignments Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Course syllabus assessments and linked AI marking rubrics
          </p>
        </div>

        <button
          onClick={() => setIsCreateAssignmentOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Assignments Cards List */}
      <div className="space-y-4">
        {assignments.map((asg) => (
          <div key={asg.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-500/40 transition-colors">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  asg.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  {asg.status}
                </span>
                <span className="text-xs text-slate-400 font-mono">{asg.course}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{asg.title}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-4">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Due: {asg.dueDate}</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> {asg.totalSubmissions} Submissions</span>
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900 font-mono">{asg.maxScore} Marks</div>
                <div className="text-[11px] text-amber-700 font-semibold">{asg.pendingReview} Pending Reviews</div>
              </div>

              <button
                onClick={() => setLecturerTab('submissions')}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>View Submissions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
