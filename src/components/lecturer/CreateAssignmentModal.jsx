import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  X, 
  Plus, 
  Trash2, 
  ListTree, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2,
  Calendar,
  Layers,
  BookOpen
} from 'lucide-react';

export default function CreateAssignmentModal() {
  const { 
    isCreateAssignmentOpen, 
    setIsCreateAssignmentOpen, 
    showToast,
    assignment,
    setAssignment
  } = useAppState();

  const [title, setTitle] = useState(assignment.title);
  const [courseCode, setCourseCode] = useState(assignment.courseCode);
  const [courseName, setCourseName] = useState(assignment.courseName);
  const [description, setDescription] = useState(assignment.description);
  const [maxScore, setMaxScore] = useState(assignment.maxScore);
  const [dueDate, setDueDate] = useState("2026-08-20");

  const [rubricItems, setRubricItems] = useState([
    { id: 1, name: "Understanding of Topic", score: 5, desc: "Demonstration of foundational scientific causes, greenhouse effects, and socio-economic ramifications." },
    { id: 2, name: "Quality of Argument", score: 5, desc: "Logical coherence of reasoning, analytical depth, and structured perspective." },
    { id: 3, name: "Evidence and Examples", score: 5, desc: "Use of peer-reviewed data, empirical examples, localized case studies, and citations." },
    { id: 4, name: "Structure and Clarity", score: 5, desc: "Academic prose, clear thesis statement, coherent transitions, and strong conclusion." }
  ]);

  if (!isCreateAssignmentOpen) return null;

  const totalRubricScore = rubricItems.reduce((sum, item) => sum + Number(item.score || 0), 0);

  const handleAddCriterion = () => {
    const nextId = Date.now();
    setRubricItems(prev => [...prev, { id: nextId, name: "New Rubric Criterion", score: 5, desc: "Criterion assessment descriptor." }]);
  };

  const handleRemoveCriterion = (id) => {
    if (rubricItems.length <= 1) return;
    setRubricItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateCriterion = (id, field, value) => {
    setRubricItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSaveDraft = () => {
    showToast("Draft Saved", "Assignment draft saved to database.", "info");
    setIsCreateAssignmentOpen(false);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    setAssignment(prev => ({
      ...prev,
      title,
      courseCode,
      courseName,
      description,
      maxScore: totalRubricScore,
      dueDate
    }));
    showToast("Assignment Published", `"${title}" has been published to 130 students.`, "success");
    setIsCreateAssignmentOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 text-slate-900">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">Create New Assignment & Rubric</h2>
              <p className="text-xs text-slate-400">Configure parameters for automated AI evaluation & human sign-off</p>
            </div>
          </div>

          <button
            onClick={() => setIsCreateAssignmentOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handlePublish} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* General Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Assignment Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Climate Change and Sustainable Development"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Course Code & Name</label>
              <input
                type="text"
                required
                value={`${courseCode} — ${courseName}`}
                onChange={(e) => {
                  const parts = e.target.value.split('—');
                  setCourseCode(parts[0]?.trim() || 'ENV-101');
                  setCourseName(parts[1]?.trim() || 'Introduction to Environmental Studies');
                }}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Due Date</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Assignment Description & Prompt</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Discuss the major causes and effects of climate change and propose practical solutions."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white leading-relaxed"
              />
            </div>

          </div>

          {/* Upload Assignment Materials */}
          <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center space-y-1.5 cursor-pointer">
            <UploadCloud className="w-6 h-6 text-blue-600" />
            <p className="text-xs font-semibold text-slate-800">Upload Assignment Brief / Lecture Materials</p>
            <p className="text-[11px] text-slate-500">PDF, DOCX up to 25MB. Indexed into Qdrant RAG store automatically.</p>
          </div>

          {/* Marking Rubric Matrix Builder */}
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <ListTree className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Marking Rubric Definition</h3>
                </div>
                <p className="text-xs text-slate-500">Criteria used by the AI Agent for semantic assessment</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                  Total: {totalRubricScore} Marks
                </span>
                <button
                  type="button"
                  onClick={handleAddCriterion}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Criterion</span>
                </button>
              </div>
            </div>

            {/* Rubric Items List */}
            <div className="space-y-3">
              {rubricItems.map((crit, index) => (
                <div key={crit.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-5 h-5 rounded-md bg-slate-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={crit.name}
                        onChange={(e) => handleUpdateCriterion(crit.id, 'name', e.target.value)}
                        placeholder="Criterion name..."
                        className="font-bold text-xs text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none flex-1 px-1 py-0.5"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-slate-500">Marks:</span>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={crit.score}
                          onChange={(e) => handleUpdateCriterion(crit.id, 'score', e.target.value)}
                          className="w-12 px-2 py-0.5 rounded border border-slate-300 font-mono font-bold text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCriterion(crit.id)}
                        disabled={rubricItems.length <= 1}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 disabled:opacity-30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={crit.desc}
                    onChange={(e) => handleUpdateCriterion(crit.id, 'desc', e.target.value)}
                    placeholder="Pedagogical descriptor for AI semantic matching..."
                    className="w-full text-[11px] text-slate-600 px-2 py-1 rounded bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
            >
              Save Draft
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCreateAssignmentOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Assignment</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
