import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Award,
  Layers,
  Scale
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const gradeDistribution = [
    { range: "90-100% (A)", count: 22, pct: "17%", color: "bg-emerald-600" },
    { range: "80-89% (B+)", count: 48, pct: "37%", color: "bg-blue-600" },
    { range: "70-79% (B)", count: 36, pct: "28%", color: "bg-indigo-500" },
    { range: "60-69% (C)", count: 18, pct: "14%", color: "bg-amber-500" },
    { range: "< 60% (Needs Review)", count: 6, pct: "4%", color: "bg-rose-500" },
  ];

  const criteriaAverages = [
    { name: "Understanding of Topic", avg: "4.2 / 5", pct: "84%", note: "Strong conceptual foundation" },
    { name: "Quality of Argument", avg: "3.9 / 5", pct: "78%", note: "Good analytical rigor" },
    { name: "Evidence and Examples", avg: "3.2 / 5", pct: "64%", note: "Area of common weakness (citations)" },
    { name: "Structure and Clarity", avg: "4.5 / 5", pct: "90%", note: "High proficiency in formatting" },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-slate-50 min-h-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Academic Analytics & Insights</h1>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
              ENV-101 Cohort
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time telemetry on grading distributions, rubric gap analysis, and AI confidence calibration
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
          Sample Demo Data • STP '26 Hackathon
        </div>
      </div>

      {/* 6 Top Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Class Average</span>
          <div className="text-2xl font-black text-slate-900 font-mono">72.4%</div>
          <p className="text-[10px] text-emerald-600 font-semibold">+3.1% vs prev semester</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Highest Score</span>
          <div className="text-2xl font-black text-emerald-600 font-mono">19 / 20</div>
          <p className="text-[10px] text-slate-400">95% • Exemplary</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Lowest Score</span>
          <div className="text-2xl font-black text-slate-700 font-mono">11 / 20</div>
          <p className="text-[10px] text-amber-600">55% • Human Review Flagged</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Avg AI Confidence</span>
          <div className="text-2xl font-black text-blue-600 font-mono">92.1%</div>
          <p className="text-[10px] text-blue-600 font-semibold">✓ High semantic precision</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Assessments Done</span>
          <div className="text-2xl font-black text-slate-900 font-mono">186</div>
          <p className="text-[10px] text-slate-400">Across 8 assignments</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-subtle space-y-2 bg-amber-50/40">
          <span className="text-[11px] font-semibold text-amber-800 uppercase">Human Reviews</span>
          <div className="text-2xl font-black text-amber-700 font-mono">24</div>
          <p className="text-[10px] text-amber-700 font-semibold">14% human override rate</p>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 6 Cols: Grade Distribution Histogram */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 shadow-subtle p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Cohort Grade Distribution</h3>
              <p className="text-xs text-slate-500">130 evaluated student submissions in ENV-101</p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Bell Curve
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {gradeDistribution.map((item) => (
              <div key={item.range} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.range}</span>
                  <span className="font-mono text-slate-500">{item.count} students ({item.pct})</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: item.pct }}></div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Data reflects finalized lecturer grades. Overridden AI scores update distribution models instantly.
          </p>
        </div>

        {/* Right 6 Cols: Rubric Gap Analysis */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 shadow-subtle p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Rubric Criterion Performance</h3>
              <p className="text-xs text-slate-500">Identifies class-wide comprehension gaps for future lectures</p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Gap Analysis
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {criteriaAverages.map((crit) => (
              <div key={crit.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{crit.name}</span>
                  <span className="font-mono font-bold text-blue-600">{crit.avg} ({crit.pct})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: crit.pct }}></div>
                </div>
                <p className="text-[11px] text-slate-500">Note: {crit.note}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
            <span className="font-semibold">Suggested Pedagogical Intervention:</span>
            <span className="text-[11px] text-blue-700">Host workshop on Academic Evidence & Citations</span>
          </div>
        </div>

      </div>

    </div>
  );
}
