import React, { createContext, useContext, useState } from 'react';
import { initialAssignment, sampleSubmission, allRecentAssessments, lecturerStats, studentPortalData, agentToolSteps } from '../data/mockData';

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  // ============== AUTH STATE ==============
  const [currentUser, setCurrentUser] = useState(null); // null | { id, name, email, role, avatar, institution, department, phone? }
  // 'login' | 'role-select' | 'register'
  const [authView, setAuthView] = useState('login');

  const loginUser = (userData) => {
    setCurrentUser(userData);
    // Auto-navigate to the correct portal based on role
    const role = userData.role;
    if (role === 'student') {
      setCurrentPortal('student');
      setStudentTab('dashboard');
    } else if (role === 'lecturer') {
      setCurrentPortal('lecturer');
      setLecturerTab('dashboard');
    } else if (role === 'admin') {
      setCurrentPortal('admin');
      setAdminTab('dashboard');
    } else if (role === 'parent') {
      setCurrentPortal('parent');
      setParentTab('dashboard');
    }
  };

  const signupUser = (userData) => {
    loginUser(userData);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setCurrentPortal('landing');
  };

  // ============== NAV / PORTAL STATE ==============
  // 'landing' | 'lecturer' | 'student' | 'admin' | 'parent' | 'auth'
  const [currentPortal, setCurrentPortal] = useState('landing');
  const [lecturerTab, setLecturerTab] = useState('dashboard');
  const [studentTab, setStudentTab] = useState('dashboard');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [parentTab, setParentTab] = useState('dashboard');

  // ============== DATA STATE ==============
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
    "crit-3": 4,
    "crit-4": 5
  });
  const [lecturerFeedbackComment, setLecturerFeedbackComment] = useState(sampleSubmission.lecturerComment);
  const [reviewStatus, setReviewStatus] = useState('Approved');

  // ============== HACKATHON DEMO TOUR ==============
  const [isDemoTourActive, setIsDemoTourActive] = useState(false);
  const [demoTourStep, setDemoTourStep] = useState(1);

  // ============== MODALS / UI ==============
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);
  const [selectedResourceModal, setSelectedResourceModal] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // ============== HELPERS ==============
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

  // ============== AI SIMULATION ==============
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

  const updateCriterionScore = (critId, newScore) => {
    setCriterionScores(prev => ({ ...prev, [critId]: Number(newScore) }));
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

  // ============== DEMO TOUR ==============
  const startDemoTour = () => {
    setIsDemoTourActive(true);
    setDemoTourStep(1);
    loginUser({
      id: 'lecturer-demo',
      name: 'Dr. Jeanne Mukamana',
      email: 'teacher@eduguard.ai',
      role: 'lecturer',
      avatar: 'JM',
      institution: 'University of Rwanda — College of Science and Technology',
      department: 'Dept. of Computer Science',
    });
    setCurrentPortal('lecturer');
    setLecturerTab('dashboard');
    showToast("Demo Tour Started", "Step 1: Lecturer Dashboard & Assessment Queue", "info");
  };

  const nextDemoStep = () => {
    if (demoTourStep < 10) {
      goToDemoStep(demoTourStep + 1);
    } else {
      endDemoTour();
    }
  };

  const prevDemoStep = () => {
    if (demoTourStep > 1) goToDemoStep(demoTourStep - 1);
  };

  const goToDemoStep = (stepNumber) => {
    setDemoTourStep(stepNumber);
    switch(stepNumber) {
      case 1:
        setCurrentPortal('lecturer'); setLecturerTab('dashboard'); setIsCreateAssignmentOpen(false); break;
      case 2:
        setCurrentPortal('lecturer'); setLecturerTab('assignments'); setIsCreateAssignmentOpen(true); break;
      case 3:
        setIsCreateAssignmentOpen(false); setCurrentPortal('student'); setStudentTab('submission-detail'); break;
      case 4:
        setCurrentPortal('lecturer'); setLecturerTab('ai-assessment'); runAiAssessmentSimulation(); break;
      case 5:
        setCurrentPortal('lecturer'); setLecturerTab('ai-assessment'); setCurrentToolIndex(7); setAiCompleted(true); break;
      case 6:
        setCurrentPortal('lecturer'); setLecturerTab('human-review'); break;
      case 7:
        setCurrentPortal('lecturer'); setLecturerTab('human-review');
        setCriterionScores({ "crit-1": 4, "crit-2": 4, "crit-3": 4, "crit-4": 5 }); break;
      case 8:
        setCurrentPortal('lecturer'); setLecturerTab('human-review'); modifyAndFinalizeGrade(); break;
      case 9:
        setCurrentPortal('student'); setStudentTab('feedback'); break;
      case 10:
        setCurrentPortal('lecturer'); setLecturerTab('analytics'); break;
      default: break;
    }
  };

  const endDemoTour = () => {
    setIsDemoTourActive(false);
    showToast("Demo Tour Finished", "Feel free to explore all features freely!", "success");
  };

  return (
    <AppStateContext.Provider value={{
      // Auth
      currentUser, loginUser, signupUser, logoutUser,
      authView, setAuthView,
      // Portal / Nav
      currentPortal, setCurrentPortal,
      lecturerTab, setLecturerTab,
      studentTab, setStudentTab,
      adminTab, setAdminTab,
      parentTab, setParentTab,
      // Data
      assignment, setAssignment,
      submission, setSubmission,
      recentAssessments, setRecentAssessments,
      stats, studentData,
      // AI
      isAiRunning, currentToolIndex, aiCompleted, runAiAssessmentSimulation,
      criterionScores, updateCriterionScore, calculateTotalScore,
      lecturerFeedbackComment, setLecturerFeedbackComment,
      reviewStatus, approveGrade, modifyAndFinalizeGrade, rejectToHumanReview,
      // Demo Tour
      isDemoTourActive, demoTourStep, startDemoTour, nextDemoStep, prevDemoStep, goToDemoStep, endDemoTour,
      // Modals & UI
      isCreateAssignmentOpen, setIsCreateAssignmentOpen,
      selectedResourceModal, setSelectedResourceModal,
      isSearchOpen, setIsSearchOpen,
      toasts, showToast, removeToast
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}
