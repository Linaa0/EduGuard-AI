import React, { createContext, useContext, useState } from 'react';
import { initialAssignment, sampleSubmission, allRecentAssessments, lecturerStats, studentPortalData, agentToolSteps } from '../data/mockData';

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  // Navigation & View State
  const [currentPortal, setCurrentPortal] = useState('landing'); // 'landing' | 'lecturer' | 'student'
  const [lecturerTab, setLecturerTab] = useState('dashboard'); // 'dashboard' | 'assignments' | 'submissions' | 'ai-assessment' | 'human-review' | 'rubrics' | 'students' | 'analytics' | 'resources' | 'settings'
  const [studentTab, setStudentTab] = useState('dashboard'); // 'dashboard' | 'my-assignments' | 'submission-detail' | 'feedback' | 'resources' | 'profile'
  
  // Data State
  const [assignment, setAssignment] = useState(initialAssignment);
  const [submission, setSubmission] = useState(sampleSubmission);
  const [recentAssessments, setRecentAssessments] = useState(allRecentAssessments);
  const [stats, setStats] = useState(lecturerStats);
  const [studentData, setStudentData] = useState(studentPortalData);

  // AI Agent Simulation State
  const [isAiRunning, setIsAiRunning] = useState(false);
  const [currentToolIndex, setCurrentToolIndex] = useState(7); // 7 means all complete
  const [aiCompleted, setAiCompleted] = useState(true);

  // Lecturer Review State
  const [criterionScores, setCriterionScores] = useState({
    "crit-1": 4,
    "crit-2": 4,
    "crit-3": 4, // Teacher modified from 3 to 4
    "crit-4": 5
  });
  const [lecturerFeedbackComment, setLecturerFeedbackComment] = useState(sampleSubmission.lecturerComment);
  const [reviewStatus, setReviewStatus] = useState('Approved'); // 'Pending Review' | 'Approved' | 'Modified' | 'Human Review'

  // Hackathon Demo Tour State (10 Steps)
  const [isDemoTourActive, setIsDemoTourActive] = useState(false);
  const [demoTourStep, setDemoTourStep] = useState(1);

  // Modals & UI Controls
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);
  const [selectedResourceModal, setSelectedResourceModal] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Run AI Simulation
  const runAiAssessmentSimulation = () => {
    setIsAiRunning(true);
    setCurrentToolIndex(0);
    setAiCompleted(false);
    showToast("AI Agent Started", "Executing 7-step autonomous evaluation pipeline...", "info");

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentToolIndex(step);
      if (step >= agentToolSteps.length) {
        clearInterval(interval);
        setIsAiRunning(false);
        setAiCompleted(true);
        showToast("Assessment Complete", "Suggested Score: 16/20 (91% Confidence). Ready for Lecturer Review.", "success");
      }
    }, 600);
  };

  // Human-in-the-Loop Actions
  const updateCriterionScore = (critId, newScore) => {
    setCriterionScores(prev => {
      const updated = { ...prev, [critId]: Number(newScore) };
      return updated;
    });
  };

  const calculateTotalScore = () => {
    return Object.values(criterionScores).reduce((a, b) => a + b, 0);
  };

  const approveGrade = () => {
    const finalScore = calculateTotalScore();
    setReviewStatus('Approved');
    setSubmission(prev => ({
      ...prev,
      status: 'Approved',
      lecturerFinalScore: finalScore,
      lecturerComment: lecturerFeedbackComment,
      modifiedByTeacher: finalScore !== prev.aiSuggestedScore
    }));
    setRecentAssessments(prev => prev.map(item => item.id === 'sub-01' ? {
      ...item,
      status: 'Approved',
      statusType: 'approved',
      finalScore: `${finalScore}/20`
    } : item));
    showToast("Grade Approved & Published", `Final score of ${finalScore}/20 (${(finalScore/20)*100}%) has been published to student portal.`, "success");
  };

  const modifyAndFinalizeGrade = () => {
    const finalScore = calculateTotalScore();
    setReviewStatus('Approved');
    setSubmission(prev => ({
      ...prev,
      status: 'Approved',
      lecturerFinalScore: finalScore,
      lecturerComment: lecturerFeedbackComment,
      modifiedByTeacher: true
    }));
    setRecentAssessments(prev => prev.map(item => item.id === 'sub-01' ? {
      ...item,
      status: 'Approved',
      statusType: 'approved',
      finalScore: `${finalScore}/20`
    } : item));
    showToast("Teacher Override Applied", `Teacher finalized grade: ${finalScore}/20 (${(finalScore/20)*100}%). Student feedback updated.`, "success");
  };

  const rejectToHumanReview = () => {
    setReviewStatus('Human Review');
    setSubmission(prev => ({ ...prev, status: 'Human Review' }));
    setRecentAssessments(prev => prev.map(item => item.id === 'sub-01' ? {
      ...item,
      status: 'Human Review',
      statusType: 'review',
      finalScore: '—'
    } : item));
    showToast("Escalated for Manual Moderation", "Submission flagged for independent 2nd marker review.", "warning");
  };

  // Demo Tour Navigation
  const startDemoTour = () => {
    setIsDemoTourActive(true);
    setDemoTourStep(1);
    setCurrentPortal('lecturer');
    setLecturerTab('dashboard');
    showToast("⚡ Hackathon Guided Tour Started", "Step 1: Lecturer Dashboard & Assessment Queue", "info");
  };

  const nextDemoStep = () => {
    if (demoTourStep < 10) {
      goToDemoStep(demoTourStep + 1);
    } else {
      endDemoTour();
    }
  };

  const prevDemoStep = () => {
    if (demoTourStep > 1) {
      goToDemoStep(demoTourStep - 1);
    }
  };

  const goToDemoStep = (stepNumber) => {
    setDemoTourStep(stepNumber);
    switch(stepNumber) {
      case 1: // Lecturer Dashboard
        setCurrentPortal('lecturer');
        setLecturerTab('dashboard');
        setIsCreateAssignmentOpen(false);
        break;
      case 2: // Create Assignment & Rubric
        setCurrentPortal('lecturer');
        setLecturerTab('assignments');
        setIsCreateAssignmentOpen(true);
        break;
      case 3: // Student Submission
        setIsCreateAssignmentOpen(false);
        setCurrentPortal('student');
        setStudentTab('submission-detail');
        break;
      case 4: // AI Assessment Agent Execution
        setCurrentPortal('lecturer');
        setLecturerTab('ai-assessment');
        runAiAssessmentSimulation();
        break;
      case 5: // AI Result & Confidence
        setCurrentPortal('lecturer');
        setLecturerTab('ai-assessment');
        setCurrentToolIndex(7);
        setAiCompleted(true);
        break;
      case 6: // Lecturer Review
        setCurrentPortal('lecturer');
        setLecturerTab('human-review');
        break;
      case 7: // Modify Evidence score 3->4 (17/20)
        setCurrentPortal('lecturer');
        setLecturerTab('human-review');
        setCriterionScores({ "crit-1": 4, "crit-2": 4, "crit-3": 4, "crit-4": 5 });
        break;
      case 8: // Finalize Grade
        setCurrentPortal('lecturer');
        setLecturerTab('human-review');
        modifyAndFinalizeGrade();
        break;
      case 9: // Student Receives Feedback & Resources
        setCurrentPortal('student');
        setStudentTab('feedback');
        break;
      case 10: // Analytics & Tech Architecture
        setCurrentPortal('lecturer');
        setLecturerTab('analytics');
        break;
      default:
        break;
    }
  };

  const endDemoTour = () => {
    setIsDemoTourActive(false);
    showToast("Demo Tour Finished", "Feel free to explore all features freely!", "success");
  };

  return (
    <AppStateContext.Provider value={{
      currentPortal,
      setCurrentPortal,
      lecturerTab,
      setLecturerTab,
      studentTab,
      setStudentTab,
      assignment,
      setAssignment,
      submission,
      setSubmission,
      recentAssessments,
      setRecentAssessments,
      stats,
      studentData,
      isAiRunning,
      currentToolIndex,
      aiCompleted,
      runAiAssessmentSimulation,
      criterionScores,
      updateCriterionScore,
      calculateTotalScore,
      lecturerFeedbackComment,
      setLecturerFeedbackComment,
      reviewStatus,
      approveGrade,
      modifyAndFinalizeGrade,
      rejectToHumanReview,
      isDemoTourActive,
      demoTourStep,
      startDemoTour,
      nextDemoStep,
      prevDemoStep,
      goToDemoStep,
      endDemoTour,
      isCreateAssignmentOpen,
      setIsCreateAssignmentOpen,
      selectedResourceModal,
      setSelectedResourceModal,
      isSearchOpen,
      setIsSearchOpen,
      toasts,
      showToast,
      removeToast
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}
