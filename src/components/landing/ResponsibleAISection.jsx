import React from 'react';
import { 
  ShieldCheck, 
  Eye, 
  HelpCircle, 
  Lock, 
  Scale, 
  UserCheck, 
  AlertTriangle,
  Award
} from 'lucide-react';

export default function ResponsibleAISection() {
  const principles = [
    {
      title: "Human Oversight",
      desc: "University lecturers maintain sole legal and academic authority. The AI never independently finalizes or publishes grades.",
      icon: UserCheck,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30"
    },
    {
      title: "Criterion Explainability",
      desc: "Every suggested score is accompanied by granular, criterion-level evidence rationales rather than ungrounded black-box marks.",
      icon: Eye,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30"
    },
    {
      title: "Full Transparency",
      desc: "All AI-generated recommendations, confidence metrics, and agent traces are explicitly marked and visible to educators.",
      icon: ShieldCheck,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    },
    {
      title: "Uncertainty Handling",
      desc: "Submissions with confidence below 80% are automatically flagged with an amber badge for mandatory human review.",
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30"
    },
    {
      title: "Privacy & Data Security",
      desc: "Student academic records and submissions are encrypted at rest and in transit. Student data is never used to train public LLMs.",
      icon: Lock,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
    },
    {
      title: "Rubric-Grounded Fairness",
      desc: "Scoring is strictly anchored to the lecturer's specific rubric descriptors, eliminating bias from arbitrary general prompts.",
      icon: Scale,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30"
    }
  ];

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Academic Ethics by Design</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Responsible AI & Academic Integrity
          </h2>

          <p className="text-base text-slate-400 leading-relaxed">
            Built to meet higher-education compliance standards, ensuring ethical AI deployment that augments professors rather than replacing them.
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.title}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-lg"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${p.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-900 text-[11px] text-slate-500 font-mono">
                  Standard: Higher-Ed AI Framework
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
