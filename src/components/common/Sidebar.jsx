import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Sparkles,
  ListTree,
  UserCheck,
  MessageSquareQuote,
  Users,
  BarChart3,
  BookOpen,
  Settings,
  PlusCircle,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export default function Sidebar() {
  const { 
    lecturerTab, 
    setLecturerTab, 
    setIsCreateAssignmentOpen, 
    submission,
    setCurrentPortal,
    setStudentTab
  } = useAppState();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assignments', label: 'Assignments', icon: FileText, badge: '8 Active' },
    { id: 'submissions', label: 'Submissions', icon: Inbox, badge: '28' },
    { id: 'ai-assessment', label: 'AI Assessments', icon: Sparkles, highlight: true },
    { id: 'human-review', label: 'Human Review', icon: UserCheck, alertBadge: '3 Pending' },
    { id: 'rubrics', label: 'Rubrics', icon: ListTree },
    { id: 'feedback', label: 'Feedback Moderation', icon: MessageSquareQuote },
    { id: 'students', label: 'Students', icon: Users, badge: '130' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] text-slate-300">
      
      {/* Top Section */}
      <div className="p-4 space-y-4">
        
        {/* Quick Action Button */}
        <button
          onClick={() => setIsCreateAssignmentOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-900/30 transition-all hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Assignment</span>
        </button>

        {/* Course Header Banner */}
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">Current Course</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/40 font-mono">ENV-101</span>
          </div>
          <h3 className="text-xs font-bold text-white mt-1 leading-snug">Intro to Environmental Studies</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Section A • 130 Students</p>
        </div>

        {/* Main Navigation Items */}
        <nav className="space-y-1 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = lecturerTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setLecturerTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 font-semibold border-l-4 border-blue-500 rounded-l-none pl-2.5 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.alertBadge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                    {item.alertBadge}
                  </span>
                )}

                {item.badge && !item.alertBadge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Card: Principle & Student View Quick Jump */}
      <div className="p-4 space-y-3 border-t border-slate-800/80 bg-slate-950/40">
        
        {/* Core Principle Callout */}
        <div className="p-2.5 rounded-lg bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/30">
          <div className="flex items-center gap-1.5 text-blue-400 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Human-In-The-Loop</span>
          </div>
          <p className="text-[10px] text-slate-300 mt-1 font-mono tracking-tight">
            AI RECOMMENDS → TEACHER DECIDES
          </p>
        </div>

        {/* Quick jump to student view */}
        <button
          onClick={() => {
            setCurrentPortal('student');
            setStudentTab('dashboard');
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700/50 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Switch to Student View</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

    </aside>
  );
}
