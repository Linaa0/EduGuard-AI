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
    startDemoTour,
    t
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
    <div className="p-6 sm:p-8 space-y-8 bg-cream dark:bg-slate-900 min-h-full">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-divider dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-white tracking-tight">{t('dash.title')}</h1>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-800 dark:text-brand-200 border border-brand-200 dark:border-brand-700">
              Dr. Alice Mukamana
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slategray dark:text-slate-400 mt-2">
            {t('dash.course')}: <strong className="text-charcoal dark:text-slate-200">{t('dash.courseName')}</strong> · {t('dash.queue')}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsCreateAssignmentOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('dash.createAssignment')}</span>
          </button>
          
          <button
            onClick={() => {
              setLecturerTab('ai-assessment');
              runAiAssessmentSimulation();
            }}
            className="px-4 py-2.5 rounded-xl bg-navy-900 dark:bg-slate-800 hover:bg-navy-800 dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t('dash.runAI')}</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-card flex flex-col justify-between card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slategray dark:text-slate-400 uppercase tracking-wider">{t('dash.totalStudents')}</span>
            <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-5">
            <div className="text-3xl font-extrabold text-charcoal dark:text-white font-mono">{stats.totalStudents}</div>
            <p className="text-[11px] text-slategray dark:text-slate-400 mt-1.5">{t('dash.enrolled')}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-card flex flex-col justify-between card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slategray dark:text-slate-400 uppercase tracking-wider">{t('dash.activeAssignments')}</span>
            <div className="p-2.5 rounded-xl bg-navy-50 dark:bg-navy-900/40 text-navy-600 dark:text-navy-300">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-5">
            <div className="text-3xl font-extrabold text-charcoal dark:text-white font-mono">{stats.activeAssignments}</div>
            <p className="text-[11px] text-slategray dark:text-slate-400 mt-1.5">{t('dash.currentTerm')}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 shadow-card flex flex-col justify-between relative overflow-hidden card-hover">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-amber-500"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">{t('dash.pendingReviews')}</span>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-5">
            <div className="text-3xl font-extrabold text-amber-900 dark:text-amber-200 font-mono">{stats.pendingReviews}</div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1.5 font-medium">{t('dash.awaitingSignOff')}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-card flex flex-col justify-between card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slategray dark:text-slate-400 uppercase tracking-wider">{t('dash.aiAssessments')}</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-5">
            <div className="text-3xl font-extrabold text-charcoal dark:text-white font-mono">{stats.aiAssessmentsCompleted}</div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5">✓ {t('dash.avgConfidence')}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-card flex flex-col justify-between card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slategray dark:text-slate-400 uppercase tracking-wider">{t('dash.classAverage')}</span>
            <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-5">
            <div className="text-3xl font-extrabold text-charcoal dark:text-white font-mono">{stats.averageClassScore}%</div>
            <p className="text-[11px] text-slategray dark:text-slate-400 mt-1.5">{t('dash.avgRawScore')}</p>
          </div>
        </div>

      </div>

      {/* Submission Queue Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-900 to-brand-950 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 border border-brand-500/40 dark:border-slate-600 text-white shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white shadow-glow shrink-0">
            JC
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {t('dash.pendingAction')}
              </span>
              <span className="text-xs text-slate-400">· ENV-101 Essay</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1.5">{t('dash.essayTitle')}</h3>
            <p className="text-xs text-slate-300 mt-1">
              {t('dash.essayDesc')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setLecturerTab('human-review')}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-glow-emerald transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t('dash.reviewFinalize')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Assessments Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-card overflow-hidden">
        
        <div className="p-5 sm:p-6 border-b border-divider dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <h3 className="font-display text-base font-bold text-charcoal dark:text-white">{t('dash.recentAssessments')}</h3>
            <p className="text-xs text-slategray dark:text-slate-400 mt-1">{t('dash.recentDesc')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            
            <div className="relative">
              <Search className="w-4 h-4 text-slategray absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('dash.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl border border-divider dark:border-slate-600 text-xs bg-cream-50 dark:bg-slate-700 text-charcoal dark:text-slate-200 placeholder:text-slategray dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center p-1 rounded-xl bg-cream-100 dark:bg-slate-700 border border-divider dark:border-slate-600 text-xs">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${filterStatus === 'all' ? 'bg-white dark:bg-slate-600 text-charcoal dark:text-white shadow-sm' : 'text-slategray dark:text-slate-400 hover:text-charcoal dark:hover:text-white'}`}
              >
                {t('dash.filterAll')}
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${filterStatus === 'pending' ? 'bg-white dark:bg-slate-600 text-charcoal dark:text-white shadow-sm' : 'text-slategray dark:text-slate-400 hover:text-charcoal dark:hover:text-white'}`}
              >
                {t('dash.filterPending')}
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${filterStatus === 'approved' ? 'bg-white dark:bg-slate-600 text-charcoal dark:text-white shadow-sm' : 'text-slategray dark:text-slate-400 hover:text-charcoal dark:hover:text-white'}`}
              >
                {t('dash.filterApproved')}
              </button>
              <button
                onClick={() => setFilterStatus('review')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${filterStatus === 'review' ? 'bg-white dark:bg-slate-600 text-charcoal dark:text-white shadow-sm' : 'text-slategray dark:text-slate-400 hover:text-charcoal dark:hover:text-white'}`}
              >
                {t('dash.filterReview')}
              </button>
            </div>

          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-50 dark:bg-slate-700/50 text-slategray dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-divider dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">{t('dash.colStudent')}</th>
                <th className="px-6 py-4">{t('dash.colAssignment')}</th>
                <th className="px-6 py-4">{t('dash.colAISuggested')}</th>
                <th className="px-6 py-4">{t('dash.colAIConfidence')}</th>
                <th className="px-6 py-4">{t('dash.colStatus')}</th>
                <th className="px-6 py-4">{t('dash.colLecturerAction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100 dark:divide-slate-700">
              {filteredAssessments.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-cream-50 dark:hover:bg-slate-700/50 transition-colors ${item.id === 'sub-01' ? 'bg-brand-50/30 dark:bg-brand-900/20' : ''}`}
                >
                  <td className="px-6 py-4.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-navy-900 dark:bg-slate-700 text-white font-bold flex items-center justify-center text-xs">
                        {item.studentName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-charcoal dark:text-white">{item.studentName}</p>
                        <p className="text-[11px] text-slategray dark:text-slate-400 font-mono">{item.studentId}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4.5">
                    <p className="font-semibold text-charcoal dark:text-slate-200">{item.assignment}</p>
                    <p className="text-[11px] text-slategray dark:text-slate-400 mt-0.5">{item.date}</p>
                  </td>

                  <td className="px-6 py-4.5 font-mono font-bold text-charcoal dark:text-white">
                    {item.score}
                  </td>

                  <td className="px-6 py-4.5">
                    <span className="inline-flex items-center gap-1 font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <Sparkles className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                      {item.confidence}
                    </span>
                  </td>

                  <td className="px-6 py-4.5">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-6 py-4.5">
                    <button
                      onClick={() => setLecturerTab('human-review')}
                      className="px-3.5 py-2 rounded-lg bg-cream-100 dark:bg-slate-700 hover:bg-brand-600 hover:text-white text-charcoal dark:text-slate-200 font-semibold text-xs border border-divider dark:border-slate-600 transition-colors flex items-center gap-1.5"
                    >
                      <span>{t('dash.reviewDetails')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4.5 bg-cream-50 dark:bg-slate-700/30 border-t border-divider dark:border-slate-700 text-xs text-slategray dark:text-slate-400 flex items-center justify-between">
          <span>{t('dash.showing')}</span>
          <span className="font-mono text-[11px]">{t('dash.humanLoopActive')}</span>
        </div>

      </div>

    </div>
  );
}
