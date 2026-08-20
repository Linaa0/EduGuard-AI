import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  FileText, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Calendar, 
  Award, 
  BookOpen, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function StudentSubmissionView() {
  const { submission, assignment, setStudentTab } = useAppState();

  return (
    <div className="p-6 sm:p-8 space-y-8 bg-slate-50 min-h-full">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Assignment Submission</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Submitted Successfully
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Course: <strong>ENV-101 (Introduction to Environmental Studies)</strong> • Lecturer: <strong>Dr. Alice Mukamana</strong>
          </p>
        </div>

        <button
          onClick={() => setStudentTab('feedback')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>View AI Assessment & Lecturer Grade</span>
        </button>
      </div>

      {/* Submission Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Assignment Instructions & Uploaded File */}
        <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200 shadow-subtle p-6 space-y-6">
          
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-mono">Assignment Prompt</span>
            <h2 className="text-lg font-bold text-slate-900">{assignment.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {assignment.description}
            </p>
          </div>

          {/* Uploaded Document Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                  PDF
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{submission.fileName}</h4>
                  <p className="text-[11px] text-slate-500">{submission.fileSize} • Uploaded on {submission.submittedAt}</p>
                </div>
              </div>

              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified & Parsed
              </span>
            </div>

            {/* Document Content Box */}
            <div className="p-4 rounded-lg bg-slate-900 text-slate-300 font-mono text-xs max-h-80 overflow-y-auto leading-relaxed border border-slate-800">
              <pre className="whitespace-pre-wrap font-sans text-xs">
                {submission.contentSnippet}
              </pre>
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Submission Meta & Quick Result Card */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="rounded-2xl bg-white border border-slate-200 shadow-subtle p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Submission Metadata</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Student:</span>
                <span className="font-bold text-slate-800">{submission.studentName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Student ID:</span>
                <span className="font-mono text-slate-800">{submission.studentId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Submission Time:</span>
                <span className="text-slate-800">{submission.submittedAt}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Course:</span>
                <span className="text-slate-800">ENV-101</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-700 font-bold">Graded (17/20)</span>
              </div>
            </div>

            <button
              onClick={() => setStudentTab('feedback')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <span>View Full Feedback Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
