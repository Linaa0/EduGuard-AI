import React from 'react';
import { Users, Award, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { teamMembers } from '../../data/teamData';

export default function TeamSection() {
  return (
    <section className="py-20 bg-slate-950 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>The Minds Behind EduGuard AI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Meet the EduGuard AI Team
          </h2>

          <p className="text-base text-slate-400 leading-relaxed">
            A multidisciplinary team passionate about AI ethics, educational excellence, and scalable software engineering.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member) => (
            <div 
              key={member.name}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-5 flex flex-col items-center text-center justify-between space-y-4 hover:border-blue-500/40 transition-all hover:translate-y-[-4px] shadow-lg"
            >
              <div className="space-y-3 flex flex-col items-center">
                {/* Avatar Initial Circle */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 p-0.5 shadow-glow">
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center font-extrabold text-base text-white tracking-wider">
                    {member.initials}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white leading-snug">{member.name}</h3>
                  <p className="text-[11px] font-semibold text-blue-400 mt-1 leading-tight">{member.role}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed text-center">
                  {member.bio}
                </p>
              </div>

              <div className="w-full pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {member.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Badge Footer */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Engineered for the <strong>STP '26 Hackathon Demonstration</strong></span>
        </div>

      </div>
    </section>
  );
}
