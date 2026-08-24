import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { translations } from '../data/translations';
import { initialAssignment, sampleSubmission, allRecentAssessments, lecturerStats, studentPortalData, agentToolSteps } from '../data/mockData';

const AppStateContext = createContext();

function usePersisted(key, initial) {
  const [val, setVal] = useState(() => {
    try { return localStorage.getItem(key) || initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, val); } catch {} }, [key, val]);
  return [val, setVal];
}

// Check if backend is reachable
async function checkBackend() {
  try {
    const res = await api.health();
    return res.status !== 'offline';
  } catch {
    return false;
  }
}

export function AppStateProvider({ children }) {
  // ============== THEME STATE ==============
  const [theme, setTheme] = usePersisted('eduguard-theme', 'light');
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // ============== LANGUAGE STATE ==============
  const [language, setLanguage] = usePersisted('eduguard-lang', 'en');
  const t = useCallback((key) => {
    if (language === 'en') return translations.en[key] || key;
    return translations.rw?.[key] || translations.en[key] || key;
  }, [language]);

  // ============== BACKEND STATUS ==============
  const [backendOnline, setBackendOnline] = useState(false);
  useEffect(() => {
    checkBackend().then(setBackendOnline);
    const interval = setInterval(() => checkBackend().then(setBackendOnline), 30000);
    return () => clearInterval(interval);
  }, []);

  // ============== AUTH STATE ==============
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = usePersisted('eduguard_token', '');
  const [authLoading, setAuthLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    async function restoreSession() {
      if (authToken) {
        try {
          const user = await api.auth.me();
          setCurrentUser(user);
        } catch {
          // Token expired or invalid — fall back to demo mode
          setAuthToken('');
        }
      }
      setAuthLoading(false);
    }
    restoreSession();
  }, []);

  const loginUser = async (email, password) => {
    if (backendOnline) {
      try {
        const { access_token } = await api.auth.login(email, password);
        api.auth.setToken(access_token);
        setAuthToken(access_token);
        const user = await api.auth.me();
        setCurrentUser(user);
        navigateToRole(user.role);
        return { success: true, user };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
    // Mock fallback
    const role = email.includes('teacher') ? 'lecturer' : email.includes('admin') ? 'admin' : email.includes('parent') ? 'parent' : 'student';
    const mockUser = getMockUser(role);
    setCurrentUser(mockUser);
    navigateToRole(role);
    return { success: true, user: mockUser };
  };

  const demoLogin = async (role) => {
    if (backendOnline) {
      try {
        const { access_token } = await api.auth.demoLogin(role);
        api.auth.setToken(access_token);
        setAuthToken(access_token);
        const user = await api.auth.me();
        setCurrentUser(user);
        navigateToRole(role);
        return;
      } catch {
        // Fall through to mock
      }
    }
    const mockUser = getMockUser(role);
    setCurrentUser(mockUser);
    navigateToRole(role);
  };

  const signupUser = async (userData) => {
    if (backendOnline) {
      try {
        await api.auth.register(userData);
        // Auto-login after signup
        return await loginUser(userData.email, userData.password);
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
    // Mock fallback
    const mockUser = { id: `${userData.role}-new`, ...userData, avatar: userData.full_name?.charAt(0) || 'U' };
    setCurrentUser(mockUser);
    navigateToRole(userData.role);
    return { success: true, user: mockUser };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setAuthToken('');
    api.auth.logout();
    setCurrentPortal('landing');
  };

  const navigateToRole = (role) => {
    if (role === 'student') { setCurrentPortal('student'); setStudentTab('dashboard'); }
    else if (role === 'lecturer') { setCurrentPortal('lecturer'); setLecturerTab('dashboard'); }
    else if (role === 'admin') { setCurrentPortal('admin'); setAdminTab('dashboard'); }
    else if (role === 'parent') { setCurrentPortal('parent'); setParentTab('dashboard'); }
  };

  // ============== NAV / PORTAL STATE ==============
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
  const [submissions, setSubmissions] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [rubrics, setRubrics] = useState([]);

  // ============== API DATA FETCHING ==============
  const fetchSubmissions = useCallback(async (params = {}) => {
    if (!backendOnline) return;
    try {
      const data = await api.submissions.list(params);
      setSubmissions(data);
    } catch (err) {
      console.warn('Failed to fetch submissions:', err.message);
    }
  }, [backendOnline]);

  const fetchAssignments = useCallback(async (params = {}) => {
    if (!backendOnline) return;
    try {
      const data = await api.assignments.list(params);
      setAssignments(data);
    } catch (err) {
      console.warn('Failed to fetch assignments:', err.message);
    }
  }, [backendOnline]);

  const fetchCourses = useCallback(async (params = {}) => {
    if (!backendOnline) return;
    try {
      const data = await api.courses.list(params);
      setCourses(data);
    } catch (err) {
      console.warn('Failed to fetch courses:', err.message);
    }
  }, [backendOnline]);

  const fetchUsers = useCallback(async (params = {}) => {
    if (!backendOnline) return;
    try {
      const data = await api.users.list(params);
      setUsers(data);
    } catch (err) {
      console.warn('Failed to fetch users:', err.message);
    }
  }, [backendOnline]);

  const fetchRubrics = useCallback(async (params = {}) => {
    if (!backendOnline) return;
    try {
      const data = await api.rubrics.list(params);
      setRubrics(data);
    } catch (err) {
      console.warn('Failed to fetch rubrics:', err.message);
    }
  }, [backendOnline]);

  // ============== AI ASSESSMENT (REAL + SIMULATION) ==============
  const [isAiRunning, setIsAiRunning] = useState(false);
  const [currentToolIndex, setCurrentToolIndex] = useState(7);
  const [aiCompleted, setAiCompleted] = useState(true);
  const [aiResult, setAiResult] = useState(null);

  const runAiAssessment = async (submissionId) => {
    if (backendOnline && submissionId) {
      setIsAiRunning(true);
      setAiCompleted(false);
      setAiResult(null);
      showToast("AI Agent Started", "Executing 7-step autonomous evaluation pipeline...", "info");

      try {
        const result = await api.submissions.runAssessment(submissionId);
        setAiResult(result);
        setIsAiRunning(false);
        setAiCompleted(true);
        showToast("Assessment Complete", `Suggested Score: ${result.overall_score}/${result.overall_max_score} (${Math.round(result.overall_confidence * 100)}% Confidence). Ready for Lecturer Review.`, "success");
        return result;
      } catch (err) {
        setIsAiRunning(false);
        setAiCompleted(true);
        showToast("Assessment Failed", err.message, "error");
        return null;
      }
    }
    // Mock simulation fallback
    runAiAssessmentSimulation();
  };

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

  // ============== LECTURER REVIEW (REAL + MOCK) ==============
  const [criterionScores, setCriterionScores] = useState({
    "crit-1": 4, "crit-2": 4, "crit-3": 4, "crit-4": 5
  });
  const [lecturerFeedbackComment, setLecturerFeedbackComment] = useState(sampleSubmission.lecturerComment);
  const [reviewStatus, setReviewStatus] = useState('Approved');

  const updateCriterionScore = (critId, newScore) => {
    setCriterionScores(prev => ({ ...prev, [critId]: Number(newScore) }));
  };

  const calculateTotalScore = () => {
    return Object.values(criterionScores).reduce((a, b) => a + b, 0);
  };

  const approveGrade = async (submissionId) => {
    const finalScore = calculateTotalScore();
    if (backendOnline && submissionId) {
      try {
        const lecturerCriterionScores = {};
        Object.entries(criterionScores).forEach(([k, v]) => { lecturerCriterionScores[k] = v; });
        await api.submissions.review(submissionId, {
          final_score: finalScore,
          lecturer_criterion_scores: lecturerCriterionScores,
          lecturer_comment: lecturerFeedbackComment,
          publish_to_student: true,
        });
        fetchSubmissions();
        showToast("Grade Approved & Published", `Final score: ${finalScore}/20 has been published to student portal.`, "success");
        return;
      } catch (err) {
        showToast("Review Failed", err.message, "error");
        return;
      }
    }
    // Mock fallback
    setReviewStatus('Approved');
    setSubmission(prev => ({
      ...prev, status: 'Approved', lecturerFinalScore: finalScore,
      lecturerComment: lecturerFeedbackComment, modifiedByTeacher: finalScore !== prev.aiSuggestedScore
    }));
    showToast("Grade Approved & Published", `Final score of ${finalScore}/20 (${(finalScore/20)*100}%) published.`, "success");
  };

  const modifyAndFinalizeGrade = async (submissionId) => {
    const finalScore = calculateTotalScore();
    if (backendOnline && submissionId) {
      try {
        const lecturerCriterionScores = {};
        Object.entries(criterionScores).forEach(([k, v]) => { lecturerCriterionScores[k] = v; });
        await api.submissions.review(submissionId, {
          final_score: finalScore,
          lecturer_criterion_scores: lecturerCriterionScores,
          lecturer_comment: lecturerFeedbackComment,
          publish_to_student: true,
        });
        fetchSubmissions();
        showToast("Teacher Override Applied", `Finalized grade: ${finalScore}/20. Student feedback updated.`, "success");
        return;
      } catch (err) {
        showToast("Review Failed", err.message, "error");
        return;
      }
    }
    // Mock fallback
    setReviewStatus('Approved');
    setSubmission(prev => ({
      ...prev, status: 'Approved', lecturerFinalScore: finalScore,
      lecturerComment: lecturerFeedbackComment, modifiedByTeacher: true
    }));
    showToast("Teacher Override Applied", `Finalized: ${finalScore}/20.`, "success");
  };

  const rejectToHumanReview = async (submissionId) => {
    if (backendOnline && submissionId) {
      try {
        await api.submissions.updateStatus(submissionId, { status: 'Human Review', comment: 'Escalated for manual moderation' });
        fetchSubmissions();
        showToast("Escalated", "Submission flagged for independent 2nd marker review.", "warning");
        return;
      } catch (err) {
        showToast("Status Update Failed", err.message, "error");
        return;
      }
    }
    // Mock fallback
    setReviewStatus('Human Review');
    setSubmission(prev => ({ ...prev, status: 'Human Review' }));
    showToast("Escalated for Manual Moderation", "Submission flagged for 2nd marker review.", "warning");
  };

  // ============== FILE UPLOAD ==============
  const uploadSubmission = async (assignmentId, contentText, files) => {
    if (backendOnline) {
      try {
        const result = await api.submissions.create({
          assignment_id: assignmentId,
          content_text: contentText || undefined,
        });
        fetchSubmissions({ assignment_id: assignmentId });
        showToast("Submission Received", "Your work has been submitted for AI assessment.", "success");
        return result;
      } catch (err) {
        showToast("Submission Failed", err.message, "error");
        return null;
      }
    }
    showToast("Demo Mode", "Backend offline. Submission simulated.", "info");
    return { id: 'mock-submission' };
  };

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
    setTimeout(() => { setToasts(prev => prev.filter(t => t.id !== id)); }, 4000);
  };

  const removeToast = (id) => { setToasts(prev => prev.filter(t => t.id !== id)); };

  const startDemoTour = () => {
    setIsDemoTourActive(true);
    setDemoTourStep(1);
    demoLogin('lecturer');
    showToast("Demo Tour Started", "Step 1: Lecturer Dashboard & Assessment Queue", "info");
  };

  const nextDemoStep = () => {
    if (demoTourStep < 10) goToDemoStep(demoTourStep + 1);
    else endDemoTour();
  };

  const prevDemoStep = () => { if (demoTourStep > 1) goToDemoStep(demoTourStep - 1); };

  const goToDemoStep = (stepNumber) => {
    setDemoTourStep(stepNumber);
    switch(stepNumber) {
      case 1: setCurrentPortal('lecturer'); setLecturerTab('dashboard'); setIsCreateAssignmentOpen(false); break;
      case 2: setCurrentPortal('lecturer'); setLecturerTab('assignments'); setIsCreateAssignmentOpen(true); break;
      case 3: setIsCreateAssignmentOpen(false); setCurrentPortal('student'); setStudentTab('submission-detail'); break;
      case 4: setCurrentPortal('lecturer'); setLecturerTab('ai-assessment'); runAiAssessmentSimulation(); break;
      case 5: setCurrentPortal('lecturer'); setLecturerTab('ai-assessment'); setCurrentToolIndex(7); setAiCompleted(true); break;
      case 6: setCurrentPortal('lecturer'); setLecturerTab('human-review'); break;
      case 7: setCurrentPortal('lecturer'); setLecturerTab('human-review'); setCriterionScores({ "crit-1": 4, "crit-2": 4, "crit-3": 4, "crit-4": 5 }); break;
      case 8: setCurrentPortal('lecturer'); setLecturerTab('human-review'); modifyAndFinalizeGrade(); break;
      case 9: setCurrentPortal('student'); setStudentTab('feedback'); break;
      case 10: setCurrentPortal('lecturer'); setLecturerTab('analytics'); break;
      default: break;
    }
  };

  const endDemoTour = () => {
    setIsDemoTourActive(false);
    showToast("Demo Tour Finished", "Feel free to explore all features!", "success");
  };

  return (
    <AppStateContext.Provider value={{
      // Auth
      currentUser, loginUser, demoLogin, signupUser, logoutUser,
      authLoading, backendOnline,
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
      submissions, fetchSubmissions,
      assignments, fetchAssignments,
      courses, fetchCourses,
      users, fetchUsers,
      rubrics, fetchRubrics,
      // AI
      isAiRunning, currentToolIndex, aiCompleted, aiResult,
      runAiAssessment, runAiAssessmentSimulation,
      criterionScores, updateCriterionScore, calculateTotalScore,
      lecturerFeedbackComment, setLecturerFeedbackComment,
      reviewStatus, approveGrade, modifyAndFinalizeGrade, rejectToHumanReview,
      // File upload
      uploadSubmission,
      // Demo Tour
      isDemoTourActive, demoTourStep, startDemoTour, nextDemoStep, prevDemoStep, goToDemoStep, endDemoTour,
      // Theme & Language
      theme, toggleTheme,
      language, setLanguage, t,
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

function getMockUser(role) {
  const users = {
    lecturer: { id: 'lecturer-demo', name: 'Dr. Jeanne Mukamana', email: 'teacher@eduguard.ai', role: 'lecturer', avatar: 'JM', institution: 'University of Rwanda — College of Science and Technology', department: 'Dept. of Computer Science' },
    student: { id: 'student-demo', name: 'Jean-Paul Niyonsaba', email: 'student@eduguard.ai', role: 'student', avatar: 'JN', institution: 'University of Rwanda — College of Science and Technology', department: 'School of ICT' },
    admin: { id: 'admin-demo', name: 'Dr. Emmanuel Rwigamba', email: 'admin@eduguard.ai', role: 'admin', avatar: 'ER', institution: 'University of Rwanda — College of Science and Technology', department: 'Academic Affairs' },
    parent: { id: 'parent-demo', name: 'Ms. Olive Uwase', email: 'parent@eduguard.ai', role: 'parent', avatar: 'OU', institution: 'University of Rwanda — College of Science and Technology', department: '—' },
  };
  return users[role] || users.student;
}

export function useAppState() {
  return useContext(AppStateContext);
}
