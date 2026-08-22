import React from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';

// Shared
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import DashboardTopBar from './components/common/DashboardTopBar';
import DemoTourBar from './components/common/DemoTourBar';
import ToastContainer from './components/common/Toast';
import SearchModal from './components/common/SearchModal';
import CreateAssignmentModal from './components/lecturer/CreateAssignmentModal';
import LearningResourcesModal from './components/student/LearningResourcesModal';

// Auth
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';

// Landing
import LandingPage from './components/landing/LandingPage';

// Lecturer
import LecturerDashboard from './components/lecturer/LecturerDashboard';
import AssignmentsList from './components/lecturer/AssignmentsList';
import SubmissionsList from './components/lecturer/SubmissionsList';
import AIAssessmentAgentView from './components/lecturer/AIAssessmentAgentView';
import HumanInTheLoopReview from './components/lecturer/HumanInTheLoopReview';
import RubricsManager from './components/lecturer/RubricsManager';
import FeedbackModerationView from './components/lecturer/FeedbackModerationView';
import StudentsDirectory from './components/lecturer/StudentsDirectory';
import AnalyticsDashboard from './components/lecturer/AnalyticsDashboard';
import SettingsView from './components/lecturer/SettingsView';

// Student
import StudentSidebar from './components/student/StudentSidebar';
import StudentDashboard from './components/student/StudentDashboard';
import StudentSubmissionView from './components/student/StudentSubmissionView';
import StudentFeedbackView from './components/student/StudentFeedbackView';
import StudentResourcesView from './components/student/StudentResourcesView';
import StudentProfileView from './components/student/StudentProfileView';

// Admin
import AdminSidebar from './components/admin/AdminSidebar';
import {
  AdminDashboardView, AdminUsersView, AdminStudentsView, AdminTeachersView,
  AdminCoursesView, AdminDepartmentsView, AdminAssessmentsView,
  AdminAnalyticsView, AdminSettingsView
} from './components/admin/AdminViews';

// Parent
import ParentSidebar from './components/parent/ParentSidebar';
import {
  ParentDashboardView, ParentStudentView, ParentProgressView,
  ParentGradesView, ParentFeedbackView, ParentAttendanceView,
  ParentNotificationsView, ParentProfileView
} from './components/parent/ParentViews';

function RoleMeta({ role }) {
  if (role === 'admin') return { title: 'Admin Console', subtitle: 'Institutional management & analytics' };
  if (role === 'parent') return { title: 'Parent Portal', subtitle: 'Student progress monitoring & insights' };
  if (role === 'lecturer') return { title: 'Lecturer Workspace', subtitle: 'Teaching, grading & student feedback' };
  if (role === 'student') return { title: 'Student Portal', subtitle: 'Assignments, grades & learning resources' };
  return { title: 'Dashboard', subtitle: '' };
}

function LecturerContent() {
  const { lecturerTab } = useAppState();
  const meta = RoleMeta('lecturer');
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-cream min-h-screen">
        <DashboardTopBar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 overflow-x-hidden bg-cream">
          {lecturerTab === 'dashboard' && <LecturerDashboard />}
          {lecturerTab === 'assignments' && <AssignmentsList />}
          {lecturerTab === 'submissions' && <SubmissionsList />}
          {lecturerTab === 'ai-assessment' && <AIAssessmentAgentView />}
          {lecturerTab === 'human-review' && <HumanInTheLoopReview />}
          {lecturerTab === 'rubrics' && <RubricsManager />}
          {lecturerTab === 'feedback' && <FeedbackModerationView />}
          {lecturerTab === 'students' && <StudentsDirectory />}
          {lecturerTab === 'analytics' && <AnalyticsDashboard />}
          {lecturerTab === 'resources' && <StudentResourcesView />}
          {lecturerTab === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

function StudentContent() {
  const { studentTab } = useAppState();
  const meta = RoleMeta('student');
  return (
    <div className="flex w-full min-h-screen">
      <StudentSidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-cream min-h-screen">
        <DashboardTopBar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 overflow-x-hidden bg-cream">
          {studentTab === 'dashboard' && <StudentDashboard />}
          {studentTab === 'my-assignments' && <StudentDashboard />}
          {studentTab === 'submission-detail' && <StudentSubmissionView />}
          {studentTab === 'feedback' && <StudentFeedbackView />}
          {studentTab === 'resources' && <StudentResourcesView />}
          {studentTab === 'profile' && <StudentProfileView />}
        </main>
      </div>
    </div>
  );
}

function AdminContent() {
  const { adminTab } = useAppState();
  const meta = RoleMeta('admin');
  return (
    <div className="flex w-full min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-cream min-h-screen">
        <DashboardTopBar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 overflow-x-hidden bg-cream">
          {adminTab === 'dashboard' && <AdminDashboardView />}
          {adminTab === 'users' && <AdminUsersView />}
          {adminTab === 'students' && <AdminStudentsView />}
          {adminTab === 'teachers' && <AdminTeachersView />}
          {adminTab === 'courses' && <AdminCoursesView />}
          {adminTab === 'departments' && <AdminDepartmentsView />}
          {adminTab === 'assessments' && <AdminAssessmentsView />}
          {adminTab === 'analytics' && <AdminAnalyticsView />}
          {adminTab === 'settings' && <AdminSettingsView />}
        </main>
      </div>
    </div>
  );
}

function ParentContent() {
  const { parentTab } = useAppState();
  const meta = RoleMeta('parent');
  return (
    <div className="flex w-full min-h-screen">
      <ParentSidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-cream min-h-screen">
        <DashboardTopBar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 overflow-x-hidden bg-cream">
          {parentTab === 'dashboard' && <ParentDashboardView />}
          {parentTab === 'my-student' && <ParentStudentView />}
          {parentTab === 'progress' && <ParentProgressView />}
          {parentTab === 'grades' && <ParentGradesView />}
          {parentTab === 'feedback' && <ParentFeedbackView />}
          {parentTab === 'attendance' && <ParentAttendanceView />}
          {parentTab === 'notifications' && <ParentNotificationsView />}
          {parentTab === 'profile' && <ParentProfileView />}
        </main>
      </div>
    </div>
  );
}

function AuthContent() {
  const { authView } = useAppState();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {authView === 'role-select' || authView === 'register' ? (
        <SignupPage />
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

function MainContent() {
  const { currentPortal } = useAppState();

  if (currentPortal === 'auth') {
    return <AuthContent />;
  }

  if (currentPortal === 'lecturer') {
    return <LecturerContent />;
  }

  if (currentPortal === 'student') {
    return <StudentContent />;
  }

  if (currentPortal === 'admin') {
    return <AdminContent />;
  }

  if (currentPortal === 'parent') {
    return <ParentContent />;
  }

  // Landing
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <LandingPage />
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <div className="min-h-screen bg-cream font-sans text-charcoal selection:bg-teal selection:text-midnight antialiased">
        <MainContent />
        <CreateAssignmentModal />
        <LearningResourcesModal />
        <SearchModal />
        <DemoTourBar />
        <ToastContainer />
      </div>
    </AppStateProvider>
  );
}
