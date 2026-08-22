import React from 'react';
import { Users } from 'lucide-react';
import { teamMembers } from '../../data/teamData';

export default function TeamSection() {
  return (
    <section id="team" className="section-wrap section-light bg-cream border-t border-divider">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>The Minds Behind EduGuard AI</span>
          </div>

          <h2 className="section-title text-3xl sm:text-4xl text-balance">
            Meet the EduGuard AI Team
          </h2>

          <p className="section-lede mb-0">
            A multidisciplinary team passionate about AI ethics, educational excellence, and scalable software engineering.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member) => (
            <div 
              key={member.name}
              className="team-card h-full flex flex-col"
            >
              <div className="space-y-3 flex flex-col items-center flex-1">
                <div className="team-avatar bg-primary">
                  {member.initials}
                </div>

                <div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="text-[11px] font-semibold text-primary mt-1 leading-tight mb-0">{member.role}</p>
                </div>

                <p className="text-xs text-slategray leading-relaxed text-center mb-0">
                  {member.bio}
                </p>
              </div>

              <div className="w-full pt-3 border-t border-divider">
                <span className="badge badge-primary">{member.badge}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-slategray">
          <span>Engineered for the <strong className="text-charcoal">STP &apos;26 Hackathon Demonstration</strong></span>
        </div>

      </div>
    </section>
  );
}
