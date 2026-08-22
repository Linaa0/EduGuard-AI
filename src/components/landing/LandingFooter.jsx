import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export default function LandingFooter() {
  const { startDemoTour, setCurrentPortal, setLecturerTab, setStudentTab } = useAppState();

  return (
    <footer className="footer-bg text-on-dark border-t border-white/10">
      <div className="site-container section-wrap">
        <div className="rounded-2xl bg-primary/40 border border-teal/30 p-8 sm:p-12 lg:p-14 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-teal/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal/15 border border-teal/30 text-teal text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ready for the Next Generation of Academic Assessment?</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-dark leading-tight text-balance">
            AI Assesses.{' '}
            <span className="text-accent-amber">Teachers Decide.</span>{' '}
            <span className="text-teal">Students Understand.</span>
          </h2>

          <p className="text-base sm:text-lg text-on-dark-muted max-w-2xl mx-auto leading-relaxed mb-0">
            Building a more transparent, efficient, and student-centered academic assessment experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button onClick={startDemoTour} className="btn btn-teal btn-lg w-full sm:w-auto">
              <span>Launch EduGuard Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-8">
        <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-dark-muted">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-bold text-on-dark">EduGuard AI</span>
            <span>University Academic Assessment & Feedback System</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => { setCurrentPortal('lecturer'); setLecturerTab('dashboard'); }}
              className="footer-link"
            >
              Lecturer Portal
            </button>
            <button
              onClick={() => { setCurrentPortal('student'); setStudentTab('dashboard'); }}
              className="footer-link"
            >
              Student Portal
            </button>
            <button onClick={startDemoTour} className="footer-link !text-teal font-semibold">
              Guided Demo
            </button>
          </div>

          <p className="mb-0">Built with academic rigor for STP &apos;26 Hackathon</p>
        </div>
      </div>
    </footer>
  );
}
