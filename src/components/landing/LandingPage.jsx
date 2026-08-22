import React from 'react';
import HeroSection from './HeroSection';
import ProblemSection from './ProblemSection';
import HowItWorksSection from './HowItWorksSection';
import AIAgentSection from './AIAgentSection';
import HumanInTheLoopSection from './HumanInTheLoopSection';
import StudentFeedbackSection from './StudentFeedbackSection';
import TechArchitectureSection from './TechArchitectureSection';
import ResponsibleAISection from './ResponsibleAISection';
import WhoItsForSection from './WhoItsForSection';
import ImpactSection from './ImpactSection';
import TeamSection from './TeamSection';
import LandingFooter from './LandingFooter';
import { useAppState } from '../../context/AppStateContext';

export default function LandingPage() {
  const { startDemoTour } = useAppState();

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <HeroSection onExploreDemo={startDemoTour} onHowItWorks={scrollToHowItWorks} />
      <ProblemSection />
      <HowItWorksSection />
      <AIAgentSection />
      <HumanInTheLoopSection />
      <StudentFeedbackSection />
      <WhoItsForSection />
      <ResponsibleAISection />
      <ImpactSection />
      <TechArchitectureSection />
      <TeamSection />
      <LandingFooter />
    </div>
  );
}
