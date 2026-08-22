import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  ListTree, 
  Plus, 
  UploadCloud, 
  Edit3, 
  CheckCircle2, 
  FileText, 
  Copy, 
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { rubricPresets } from '../../data/mockData';

export default function RubricsManager() {
  const { assignment, setIsCreateAssignmentOpen, showToast } = useAppState();
  const [selectedRubric, setSelectedRubric] = useState(rubricPresets[0]);

  const handleAssignRubric = (title) => {
    showToast("Rubric Assigned", `"${title}" has been linked to ENV-101 assignments.`, "success");
  };

  const handleUploadRubric = () => {
    showToast("Rubric Uploaded", "Custom rubric CSV/PDF parsed into 4 criteria matrix.", "success");
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-cream dark:bg-slate-900 min-h-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-divider dark:border-slate-700">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-white tracking-tight">Rubric Management System</h1>
          <p className="text-xs sm:text-sm text-slategray dark:text-slate-400 mt-1">
            Standardized academic grading matrices for deterministic AI semantic evaluation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleUploadRubric}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 hover:bg-cream-50 dark:bg-slate-700 text-charcoal dark:text-slate-200 text-xs font-semibold shadow-sm flex items-center gap-2 transition-colors"
          >
            <UploadCloud className="w-4 h-4 text-blue-600" />
            <span>Upload Rubric File</span>
          </button>

          <button
            onClick={() => setIsCreateAssignmentOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Rubric</span>
          </button>
        </div>
      </div>

      {/* Active Rubric Showcase: Climate Change Essay 4 Criteria */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-subtle p-6 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-divider dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <ListTree className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Active in ENV-101
                </span>
                <span className="text-xs text-slategray dark:text-slate-400 font-mono">ID: RUB-ENV101-2026</span>
              </div>
              <h2 className="text-base font-bold text-charcoal dark:text-white mt-0.5">Climate Change Essay Marking Rubric</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-cream-100 dark:bg-slate-700 text-charcoal dark:text-slate-200 border border-divider dark:border-slate-700">
              4 Criteria • 20 Marks Total
            </span>
          </div>
        </div>

        {/* 4 Criteria Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-xl bg-cream-50 dark:bg-slate-700 border border-divider dark:border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal dark:text-white">1. Understanding of Topic</span>
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">5 Marks (25%)</span>
            </div>
            <p className="text-xs text-slategray dark:text-slate-400 leading-relaxed">
              Demonstrates comprehensive grasp of planetary greenhouse drivers, carbon cycle feedback loops, and differentiated impacts across developing regions.
            </p>
            <div className="pt-2 flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Benchmark: IPCC WGII Report</span>
              <span>Level: 4-5 Exemplary</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cream-50 dark:bg-slate-700 border border-divider dark:border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal dark:text-white">2. Quality of Argument</span>
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">5 Marks (25%)</span>
            </div>
            <p className="text-xs text-slategray dark:text-slate-400 leading-relaxed">
              Logical coherence of reasoning, analytical depth, and clear balance between technical carbon mitigation and community-based resilience strategies.
            </p>
            <div className="pt-2 flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Benchmark: Academic Synthesis</span>
              <span>Level: 4-5 Exemplary</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cream-50 dark:bg-slate-700 border border-divider dark:border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal dark:text-white">3. Evidence and Examples</span>
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">5 Marks (25%)</span>
            </div>
            <p className="text-xs text-slategray dark:text-slate-400 leading-relaxed">
              Rigorous use of peer-reviewed literature, localized empirical case studies (e.g. East African agroforestry), and accurate referencing.
            </p>
            <div className="pt-2 flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Benchmark: APA-7th Standards</span>
              <span>Level: 3-5 Proficient</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cream-50 dark:bg-slate-700 border border-divider dark:border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal dark:text-white">4. Structure and Clarity</span>
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">5 Marks (25%)</span>
            </div>
            <p className="text-xs text-slategray dark:text-slate-400 leading-relaxed">
              Clear introduction with an explicit thesis statement, smooth paragraph transitions, academic vocabulary, and a strong concluding summary.
            </p>
            <div className="pt-2 flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Benchmark: University Style Guide</span>
              <span>Level: 4-5 Exemplary</span>
            </div>
          </div>

        </div>

      </div>

      {/* Preset Rubric Library */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-charcoal dark:text-white">Departmental Rubric Library</h3>
            <p className="text-xs text-slategray dark:text-slate-400">Pre-approved university evaluation templates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rubricPresets.map((r) => (
            <div key={r.id} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-subtle flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-colors">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {r.department}
                </span>
                <h4 className="text-sm font-bold text-charcoal dark:text-white">{r.title}</h4>
                <p className="text-xs text-slategray dark:text-slate-400">{r.criteriaCount} criteria • {r.totalMarks} maximum score</p>
              </div>

              <div className="pt-3 border-t border-divider dark:border-slate-700 flex items-center justify-between">
                <button
                  onClick={() => handleAssignRubric(r.title)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Assign to Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
