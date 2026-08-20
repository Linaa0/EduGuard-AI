import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  ShieldCheck, 
  Search, 
  Bell, 
  Sparkles, 
  GraduationCap, 
  UserCheck, 
  Globe, 
  Cpu, 
  ChevronDown,
  Play,
  CheckCircle2
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentPortal, 
    setCurrentPortal, 
    setLecturerTab, 
    setStudentTab,
    startDemoTour, 
    isDemoTourActive,
    setIsSearchOpen 
  } = useAppState();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const notifications = [
    { id: 1, title: "New Submission", text: "Jean Claude submitted Climate Change Essay (ENV-101)", time: "10 mins ago", unread: true },
    { id: 2, title: "AI Assessment Ready", text: "16/20 suggested for Jean Claude (91% confidence)", time: "8 mins ago", unread: true },
    { id: 3, title: "Rubric Updated", text: "ENV-101 4-criterion grading matrix synchronized", time: "1 hour ago", unread: false }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setCurrentPortal('landing')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200 border border-blue-400/30">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-white font-sans">EduGuard</span>
                  <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">AI</span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">AI Assesses. Teachers Decide. Students Understand.</p>
              </div>
            </button>

            {/* AI Engine Status Ping */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-slate-200">AI Assessment Engine:</span>
              <span className="text-emerald-400 font-semibold">Online</span>
            </div>
          </div>

          {/* Center: Portal Navigation Tabs */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-slate-800/90 border border-slate-700/70 text-xs font-medium">
            <button
              onClick={() => setCurrentPortal('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentPortal === 'landing' 
                  ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Landing</span>
            </button>

            <button
              onClick={() => {
                setCurrentPortal('lecturer');
                setLecturerTab('dashboard');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentPortal === 'lecturer' 
                  ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Lecturer Portal</span>
            </button>

            <button
              onClick={() => {
                setCurrentPortal('student');
                setStudentTab('dashboard');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentPortal === 'student' 
                  ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </button>
          </nav>

          {/* Right Actions & Profile */}
          <div className="flex items-center gap-3">
            
            {/* Hackathon Tour CTA */}
            <button
              onClick={startDemoTour}
              className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                isDemoTourActive 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500 animate-pulse' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-blue-400/40 hover:shadow-glow'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isDemoTourActive ? 'Demo Active' : 'Launch Demo Tour'}</span>
            </button>

            {/* Quick Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Search (Ctrl + K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-900"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-4 text-slate-100 z-50 animate-in fade-in-50 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold text-xs uppercase tracking-wider text-slate-300">Notifications</span>
                    </div>
                    <span className="text-[11px] text-blue-400 hover:underline cursor-pointer">Mark all read</span>
                  </div>
                  <div className="divide-y divide-slate-800/80 mt-2 max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="py-2.5 px-1 hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-white">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-snug">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center font-bold text-xs text-white shadow-inner">
                  {currentPortal === 'student' ? 'JC' : 'AM'}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-semibold text-white leading-tight">
                    {currentPortal === 'student' ? 'Jean Claude' : 'Dr. Alice Mukamana'}
                  </p>
                  <p className="text-[10px] text-slate-400 leading-none">
                    {currentPortal === 'student' ? 'Student (ENV-101)' : 'Senior Lecturer'}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 text-slate-200">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs text-slate-400">Switch Persona Mode</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCurrentPortal('lecturer');
                        setLecturerTab('dashboard');
                        setIsRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
                        currentPortal === 'lecturer' ? 'bg-blue-600/30 text-blue-300 font-semibold' : 'hover:bg-slate-800'
                      }`}
                    >
                      <UserCheck className="w-4 h-4 text-blue-400" />
                      <div className="text-left">
                        <p className="text-white">Lecturer: Dr. Alice</p>
                        <p className="text-[10px] text-slate-400">Course Leader & Marker</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentPortal('student');
                        setStudentTab('dashboard');
                        setIsRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
                        currentPortal === 'student' ? 'bg-blue-600/30 text-blue-300 font-semibold' : 'hover:bg-slate-800'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <div className="text-left">
                        <p className="text-white">Student: Jean Claude</p>
                        <p className="text-[10px] text-slate-400">Undergraduate Year 2</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
