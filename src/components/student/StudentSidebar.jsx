import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  LayoutDashboard, 
  FileText, 
  UploadCloud, 
  Award, 
  MessageSquareQuote, 
  BookOpen, 
  User, 
  ArrowLeft,
  GraduationCap
} from 'lucide-react';

export default function StudentSidebar() {
  const { studentTab, setStudentTab, setCurrentPortal, setLecturerTab } = useAppState();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-assignments', label: 'My Assignments', icon: FileText, badge: '5' },
    { id: 'submission-detail', label: 'Submissions', icon: UploadCloud },
    { id: 'feedback', label: 'Grades & Feedback', icon: Award, highlight: true },
    { id: 'resources', label: 'Learning Resources', icon: BookOpen },
    { id: 'profile', label: 'Academic Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)] text-slate-300">
      
      <div className="p-4 space-y-4">
        
        {/* Student Profile Card */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-sm text-white">
            JC
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Jean Claude</h3>
            <p className="text-[11px] text-slate-400 font-mono">STU-8821 • Year 2</p>
          </div>
        </div>

        {/* Student Nav */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = studentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setStudentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 font-semibold border-l-4 border-blue-500 rounded-l-none pl-2.5 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : item.highlight ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Switch back to Lecturer Portal */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <button
          onClick={() => {
            setCurrentPortal('lecturer');
            setLecturerTab('dashboard');
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch to Lecturer Portal</span>
        </button>
      </div>

    </aside>
  );
}
