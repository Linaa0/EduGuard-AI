import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Search, X, FileText, User, ListTree, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setCurrentPortal, setLecturerTab, setStudentTab } = useAppState();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const searchItems = [
    { title: "Climate Change and Sustainable Development", type: "Assignment", target: () => { setCurrentPortal('lecturer'); setLecturerTab('assignments'); } },
    { title: "Jean Claude (STU-8821)", type: "Student", target: () => { setCurrentPortal('student'); setStudentTab('dashboard'); } },
    { title: "ENV-101 4-Criterion Rubric Matrix", type: "Rubric", target: () => { setCurrentPortal('lecturer'); setLecturerTab('rubrics'); } },
    { title: "AI Assessment Agent Runner", type: "AI Tool", target: () => { setCurrentPortal('lecturer'); setLecturerTab('ai-assessment'); } },
    { title: "Human-in-the-Loop Moderation Queue", type: "Review", target: () => { setCurrentPortal('lecturer'); setLecturerTab('human-review'); } },
    { title: "Class Grade Distribution & AI Telemetry", type: "Analytics", target: () => { setCurrentPortal('lecturer'); setLecturerTab('analytics'); } }
  ];

  const filtered = query.trim() === '' 
    ? searchItems 
    : searchItems.filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || i.type.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Search Input Box */}
        <div className="flex items-center px-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search assignments, students, rubrics, or AI features..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent px-3 py-4 text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto divide-y divide-slate-800/50">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.target();
                  setIsSearchOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {item.type === 'Assignment' && <FileText className="w-4 h-4" />}
                    {item.type === 'Student' && <User className="w-4 h-4" />}
                    {item.type === 'Rubric' && <ListTree className="w-4 h-4" />}
                    {!['Assignment', 'Student', 'Rubric'].includes(item.type) && <Search className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">{item.title}</p>
                    <p className="text-[11px] text-slate-400">{item.type}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-slate-400 text-xs">
              No matching records found for "{query}".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>EduGuard AI Academic Search</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
}
