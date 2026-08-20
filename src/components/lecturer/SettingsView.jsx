import React from 'react';
import { Settings, Sliders, Shield, Database, Save, RotateCcw } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function SettingsView() {
  const { showToast } = useAppState();

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Settings Saved", "System calibration parameters updated.", "success");
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-slate-50 min-h-full">
      
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Platform & AI Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Configure AI sensitivity, RAG retrieval thresholds, and grading scales</p>
      </div>

      <form onSubmit={handleSave} className="max-w-4xl space-y-6">
        
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>AI Assessment Agent Calibration</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Minimum Confidence Threshold for Auto-Suggestion</label>
              <select defaultValue="80" className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50">
                <option value="75">75% (Relaxed - Higher recommendation rate)</option>
                <option value="80">80% (Recommended - Standard higher-ed)</option>
                <option value="85">85% (Strict - High manual review rate)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Primary Foundation Model</label>
              <select defaultValue="ejochat" className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50">
                <option value="ejochat">EjoChat Academic LLM (Default)</option>
                <option value="fastapi-qdrant">Qdrant RAG + Deterministic Tool Pipeline</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Academic Governance & Safeguards</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked disabled className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
              <span className="font-semibold text-slate-800">Enforce Mandatory Lecturer Sign-Off before student grade publication (Non-negotiable)</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
              <span className="text-slate-700">Attach criterion-level reasoning and learning resources to every student notification</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
}
