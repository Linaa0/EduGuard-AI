import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Edit3, 
  FileText, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  Scale, 
  RotateCcw,
  Sliders,
  Send,
  Eye,
  FileCheck
} from 'lucide-react';

export default function HumanInTheLoopReview() {
  const { 
    submission, 
    assignment, 
    criterionScores, 
    updateCriterionScore, 
    calculateTotalScore,
    lecturerFeedbackComment,
    setLecturerFeedbackComment,
    reviewStatus,
    approveGrade,
    modifyAndFinalizeGrade,
    rejectToHumanReview,
    setCurrentPortal,
    setStudentTab,
    showToast
  } = useAppState();

  const [activeTab, setActiveTab] = useState('submission'); // 'submission' | 'rubric'

  const totalScore = calculateTotalScore();
  const isScoreModified = totalScore !== submission.aiSuggestedScore;

  const handleQuickBumpEvidence = () => {
    updateCriterionScore("crit-3", 4);
    showToast("Evidence Score Adjusted", "Bumped Evidence & Examples from 3 to 4. Total score is now 17/20.", "info");
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-cream dark:bg-slate-900 min-h-full">
      
      {/* Top Banner: Core Principle */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-500/40 p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Human-in-the-Loop Moderation
            </span>
            <span className="text-xs text-slate-400">• Step 6 & 7 of Assessment Workflow</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>AI RECOMMENDS</span>
            <span className="text-blue-400 font-mono">→</span>
            <span className="text-emerald-400">TEACHER DECIDES</span>
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            “AI-generated assessment requires lecturer review before publication. The AI never independently finalizes or publishes a student grade.”
          </p>
        </div>

        {/* Current Score Summary Pill */}
        <div className="flex items-center gap-4 bg-slate-950/80 px-5 py-3 rounded-xl border border-slate-800 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Suggestion</span>
            <span className="font-mono text-base font-bold text-slate-300">16 / 20</span>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">Lecturer Grade</span>
            <span className="font-mono text-xl font-black text-emerald-400">{totalScore} / 20</span>
          </div>
        </div>
      </div>

      {/* Split Screen Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (5 Cols): Student Submission Viewer */}
        <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-subtle p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-divider dark:border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                PDF
              </div>
              <div>
                <h3 className="text-xs font-bold text-charcoal dark:text-white">{submission.fileName}</h3>
                <p className="text-[10px] text-slategray dark:text-slate-400">{submission.fileSize} • Submitted {submission.submittedAt}</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slategray dark:text-slate-400 bg-cream-100 dark:bg-slate-700 px-2 py-0.5 rounded">
              {submission.studentName} ({submission.studentId})
            </span>
          </div>

          {/* Document Content / Excerpt */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs max-h-[520px] overflow-y-auto leading-relaxed border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800 text-[11px] text-blue-400 font-bold">
              [DOCUMENT PREVIEW — EXTRACTED VECTOR TEXT]
            </div>

            <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300 leading-relaxed">
              {submission.contentSnippet}
            </pre>

            {/* AI Citation Marker Highlight */}
            <div className="mt-4 p-3 rounded-lg bg-blue-950/60 border border-blue-500/40 text-[11px] text-blue-300 font-sans space-y-1">
              <p className="font-bold flex items-center gap-1 text-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Grounding Note on Section 3 (Evidence):</span>
              </p>
              <p className="text-slate-300">
                Student referenced agroforestry and community carbon initiatives in East Africa. AI initially awarded 3/5 due to absence of numerical carbon tables. Lecturer can override this based on qualitative case-study merit.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slategray dark:text-slate-400 pt-1">
            <span>Assignment: Climate Change Essay</span>
            <span>Course: ENV-101</span>
          </div>
        </div>

        {/* Right Column (7 Cols): Lecturer Moderation & Rubric Sliders */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-divider dark:border-slate-700 shadow-subtle p-6 space-y-6">
            
            {/* Header with Quick Override Demo Helper */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-divider dark:border-slate-700">
              <div>
                <h3 className="text-base font-bold text-charcoal dark:text-white">Marking Rubric Moderation</h3>
                <p className="text-xs text-slategray dark:text-slate-400">Adjust any criterion score before publishing the official grade</p>
              </div>

              {/* One-click Demo Trigger for Judges */}
              <button
                onClick={handleQuickBumpEvidence}
                className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Simulate Dr. Alice modifying Evidence & Examples from 3/5 to 4/5"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                <span>Demo Override (+1 Evidence Mark)</span>
              </button>
            </div>

            {/* Rubric Criteria Interactive Cards */}
            <div className="space-y-4">
              
              {/* Criterion 1 */}
              <div className="p-4 rounded-xl bg-cream-50 dark:bg-slate-700 border border-divider dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-charcoal dark:text-white">1. Understanding of Topic</span>
                    <p className="text-[11px] text-slategray dark:text-slate-400">Foundational scientific causes and planetary drivers.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slategray dark:text-slate-400">Score:</span>
                    <select
                      value={criterionScores["crit-1"]}
                      onChange={(e) => updateCriterionScore("crit-1", e.target.value)}
                      className="px-2.5 py-1 rounded-lg border border-slate-300 font-mono font-bold text-xs bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} / 5</option>)}
                    </select>
                  </div>
                </div>
                <p className="text-[11px] text-slategray dark:text-slate-400 italic bg-white dark:bg-slate-800 p-2 rounded-lg border border-divider dark:border-slate-700/60">
                  AI Note: “Demonstrates a strong understanding of the major causes and effects of climate change.”
                </p>
              </div>

              {/* Criterion 2 */}
              <div className="p-4 rounded-xl bg-cream-50 dark:bg-slate-700 border border-divider dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-charcoal dark:text-white">2. Quality of Argument</span>
                    <p className="text-[11px] text-slategray dark:text-slate-400">Logical flow, analytical depth, and policy synthesis.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slategray dark:text-slate-400">Score:</span>
                    <select
                      value={criterionScores["crit-2"]}
                      onChange={(e) => updateCriterionScore("crit-2", e.target.value)}
                      className="px-2.5 py-1 rounded-lg border border-slate-300 font-mono font-bold text-xs bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} / 5</option>)}
                    </select>
                  </div>
                </div>
                <p className="text-[11px] text-slategray dark:text-slate-400 italic bg-white dark:bg-slate-800 p-2 rounded-lg border border-divider dark:border-slate-700/60">
                  AI Note: “The argument is clear and generally well supported, although some claims could be developed further.”
                </p>
              </div>

              {/* Criterion 3 (The Override Demonstrator) */}
              <div className={`p-4 rounded-xl border transition-all space-y-2 ${
                criterionScores["crit-3"] === 4 
                  ? 'bg-blue-50/70 border-blue-300 shadow-sm' 
                  : 'bg-cream-50 dark:bg-slate-700 border-divider dark:border-slate-700'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-charcoal dark:text-white">3. Evidence and Examples</span>
                      {criterionScores["crit-3"] === 4 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white animate-fade-in">
                          Modified by Lecturer (4/5)
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slategray dark:text-slate-400">Empirical examples, localized case studies, and citations.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slategray dark:text-slate-400">Score:</span>
                    <select
                      value={criterionScores["crit-3"]}
                      onChange={(e) => updateCriterionScore("crit-3", e.target.value)}
                      className="px-2.5 py-1 rounded-lg border border-blue-400 font-mono font-bold text-xs bg-white dark:bg-slate-800 text-blue-700 focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} / 5</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <p className="text-[11px] text-slategray dark:text-slate-400 italic bg-white dark:bg-slate-800 p-2 rounded-lg border border-divider dark:border-slate-700/60">
                    AI Note: “Relevant examples are included, but additional evidence and supporting sources would strengthen the response.”
                  </p>
                  {criterionScores["crit-3"] === 4 && (
                    <p className="text-[11px] text-blue-800 font-medium px-2 py-1 bg-blue-100/70 rounded-lg">
                      ✓ Dr. Alice Mukamana: Upgraded to 4/5 for compelling local case analysis on East African agroforestry.
                    </p>
                  )}
                </div>
              </div>

              {/* Criterion 4 */}
              <div className="p-4 rounded-xl bg-cream-50 dark:bg-slate-700 border border-divider dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-charcoal dark:text-white">4. Structure and Clarity</span>
                    <p className="text-[11px] text-slategray dark:text-slate-400">Academic prose, thesis statement, and conclusion.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slategray dark:text-slate-400">Score:</span>
                    <select
                      value={criterionScores["crit-4"]}
                      onChange={(e) => updateCriterionScore("crit-4", e.target.value)}
                      className="px-2.5 py-1 rounded-lg border border-slate-300 font-mono font-bold text-xs bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} / 5</option>)}
                    </select>
                  </div>
                </div>
                <p className="text-[11px] text-slategray dark:text-slate-400 italic bg-white dark:bg-slate-800 p-2 rounded-lg border border-divider dark:border-slate-700/60">
                  AI Note: “The submission has a clear introduction, logical organization, and strong conclusion.”
                </p>
              </div>

            </div>

            {/* Lecturer Custom Pedagogical Comment */}
            <div className="space-y-2 pt-2 border-t border-divider dark:border-slate-700">
              <label className="text-xs font-bold text-charcoal dark:text-slate-200 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Lecturer Feedback & Qualitative Remark</span>
              </label>
              <textarea
                rows={3}
                value={lecturerFeedbackComment}
                onChange={(e) => setLecturerFeedbackComment(e.target.value)}
                placeholder="Add personalized comments that the student will see alongside their rubric score..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-cream-50 dark:bg-slate-700 focus:bg-white dark:bg-slate-800 leading-relaxed"
              />
            </div>

            {/* Moderation Actions Bar */}
            <div className="pt-4 border-t border-divider dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              
              <button
                type="button"
                onClick={rejectToHumanReview}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Reject / Escalate to 2nd Marker</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={modifyAndFinalizeGrade}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Finalize Grade ({totalScore}/20 — {(totalScore/20)*100}%)</span>
                </button>
              </div>

            </div>

          </div>

          {/* Quick Jump to Student Portal */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-blue-900">Preview Student Experience</p>
              <p className="text-[11px] text-blue-700">See exactly how Jean Claude receives this finalized grade and study guidance.</p>
            </div>

            <button
              onClick={() => {
                setCurrentPortal('student');
                setStudentTab('feedback');
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <span>View Student Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
