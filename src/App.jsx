import React from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import DemoTourBar from './components/common/DemoTourBar';
import ToastContainer from './components/common/Toast';
import SearchModal from './components/common/SearchModal';
import CreateAssignmentModal from './components/lecturer/CreateAssignmentModal';
import LearningResourcesModal from './components/student/LearningResourcesModal';

// Landing View
import LandingPage from './components/landing/LandingPage';

// Lecturer Views
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

// Student Views
import StudentSidebar from './components/student/StudentSidebar';
import StudentDashboard from './components/student/StudentDashboard';
import StudentSubmissionView from './components/student/StudentSubmissionView';
import StudentFeedbackView from './components/student/StudentFeedbackView';
import StudentResourcesView from './components/student/StudentResourcesView';
import StudentProfileView from './components/student/StudentProfileView';

function MainContent() {
  const { currentPortal, lecturerTab, studentTab } = useAppState();

  if (currentPortal === 'landing') {
    return <LandingPage />;
  }

  if (currentPortal === 'lecturer') {
    return (
      <div className="flex w-full min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
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
    );
  }

  if (currentPortal === 'student') {
    return (
      <div className="flex w-full min-h-[calc(100vh-4rem)]">
        <StudentSidebar />
        <main className="flex-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {studentTab === 'dashboard' && <StudentDashboard />}
          {studentTab === 'my-assignments' && <StudentDashboard />}
          {studentTab === 'submission-detail' && <StudentSubmissionView />}
          {studentTab === 'feedback' && <StudentFeedbackView />}
          {studentTab === 'resources' && <StudentResourcesView />}
          {studentTab === 'profile' && <StudentProfileView />}
        </main>
      </div>
    );
  }

  return <LandingPage />;
}

export default function App() {
  return (
    <AppStateProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
        <Navbar />
        <div className="flex-1 flex flex-col">
          <MainContent />
        </div>
        <CreateAssignmentModal />
        <LearningResourcesModal />
        <SearchModal />
        <DemoTourBar />
        <ToastContainer />
      </div>
    </AppStateProvider>
  );
}
