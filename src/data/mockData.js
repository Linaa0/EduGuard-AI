export const initialAssignment = {
  id: "asg-01",
  title: "Climate Change and Sustainable Development",
  courseCode: "ENV-101",
  courseName: "Introduction to Environmental Studies",
  lecturerName: "Dr. Alice Mukamana",
  description: "Discuss the major causes and effects of climate change and propose practical solutions with specific reference to developing economies and community resilience strategies.",
  maxScore: 20,
  dueDate: "20 August 2026",
  status: "Active",
  totalSubmissions: 28,
  pendingReviews: 3,
  rubric: [
    {
      id: "crit-1",
      name: "Understanding of Topic",
      maxScore: 5,
      description: "Demonstration of foundational scientific causes, greenhouse effects, and socio-economic ramifications.",
      aiScore: 4,
      aiFeedback: "Demonstrates a strong understanding of the major causes and effects of climate change.",
      weight: "25%"
    },
    {
      id: "crit-2",
      name: "Quality of Argument",
      maxScore: 5,
      description: "Logical coherence of reasoning, analytical depth, and structured perspective on mitigation vs. adaptation.",
      aiScore: 4,
      aiFeedback: "The argument is clear and generally well supported, although some claims could be developed further.",
      weight: "25%"
    },
    {
      id: "crit-3",
      name: "Evidence and Examples",
      maxScore: 5,
      description: "Use of peer-reviewed data, empirical examples, localized case studies, and accurate citations.",
      aiScore: 3,
      aiFeedback: "Relevant examples are included, but additional evidence and supporting sources would strengthen the response.",
      weight: "25%"
    },
    {
      id: "crit-4",
      name: "Structure and Clarity",
      maxScore: 5,
      description: "Academic prose, clear thesis statement, coherent transitions, formatting, and impactful conclusion.",
      aiScore: 5,
      aiFeedback: "The submission has a clear introduction, logical organization, and strong conclusion.",
      weight: "25%"
    }
  ]
};

export const sampleSubmission = {
  id: "sub-01",
  studentId: "STU-8821",
  studentName: "Jean Claude",
  studentEmail: "j.claude@student.univ.edu",
  studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  assignmentTitle: "Climate Change and Sustainable Development",
  courseCode: "ENV-101",
  fileName: "Jean_Claude_Climate_Change_Essay.pdf",
  fileSize: "1.4 MB",
  submittedAt: "19 August 2026, 16:42",
  status: "Pending Review", // 'Pending Review' | 'Approved' | 'Modified' | 'Human Review'
  aiSuggestedScore: 16,
  aiConfidence: 91,
  lecturerFinalScore: 17,
  lecturerComment: "Well-reasoned analysis of East African climate adaptation mechanisms. Good initiative on referencing localized carbon mitigation strategies in Section 3.",
  modifiedByTeacher: true,
  contentSnippet: `CLIMATE CHANGE AND SUSTAINABLE DEVELOPMENT: BALANCING ADAPTATION AND COMMUNITY RESILIENCE
Author: Jean Claude (Student ID: STU-8821)
Course: ENV-101 — Introduction to Environmental Studies
Lecturer: Dr. Alice Mukamana

1. INTRODUCTION & THESIS
Anthropogenic greenhouse gas emissions have escalated global temperatures at an unprecedented rate, with disproportionate impacts on emerging economies. This essay argues that achieving sustainable development requires integrating decentralized renewable energy solutions with community-based watershed management.

2. MAJOR CAUSES AND SECTORAL CONTRIBUTIONS
Combustion of fossil fuels for power and transportation accounts for over 70% of global greenhouse emissions. Deforestation in tropical basins further diminishes critical carbon sinks, compounding atmospheric carbon dioxide concentration beyond 420 ppm.

3. IMPACTS ON DEVELOPING REGIONS
Agricultural vulnerability in sub-Saharan Africa illustrates the asymmetry of climate disruption. Shifting precipitation patterns threaten food security and economic stability. Localized adaptation initiatives, such as Agroforestry in Rwanda and East Africa, demonstrate viable pathways for carbon sequestration alongside soil restoration.

4. PROPOSED PRACTICAL SOLUTIONS
To balance mitigation and socio-economic development, universities and regional governments should accelerate investment in solar mini-grids, drought-resistant crop varieties, and municipal green corridors.

5. CONCLUSION
Addressing climate change demands both technological modernization and equitable policy frameworks that empower frontline communities to build enduring ecological resilience.`
};

export const allRecentAssessments = [
  {
    id: "sub-01",
    studentName: "Jean Claude",
    studentId: "STU-8821",
    assignment: "Climate Change Essay",
    score: "16/20",
    finalScore: "17/20",
    confidence: "91%",
    status: "Pending Review",
    statusType: "pending",
    date: "20 Aug 2026",
    needsHumanReview: false
  },
  {
    id: "sub-02",
    studentName: "Alice Kayitesi",
    studentId: "STU-8822",
    assignment: "Climate Change Essay",
    score: "18/20",
    finalScore: "18/20",
    confidence: "95%",
    status: "Approved",
    statusType: "approved",
    date: "20 Aug 2026",
    needsHumanReview: false
  },
  {
    id: "sub-03",
    studentName: "Eric Mugisha",
    studentId: "STU-8823",
    assignment: "Climate Change Essay",
    score: "13/20",
    finalScore: "—",
    confidence: "78%",
    status: "Human Review",
    statusType: "review",
    date: "19 Aug 2026",
    needsHumanReview: true
  },
  {
    id: "sub-04",
    studentName: "Deborah Umutoni",
    studentId: "STU-8824",
    assignment: "Climate Change Essay",
    score: "15/20",
    finalScore: "15/20",
    confidence: "88%",
    status: "Approved",
    statusType: "approved",
    date: "19 Aug 2026",
    needsHumanReview: false
  },
  {
    id: "sub-05",
    studentName: "Fabrice Habimana",
    studentId: "STU-8825",
    assignment: "Climate Change Essay",
    score: "11/20",
    finalScore: "—",
    confidence: "65%",
    status: "Human Review",
    statusType: "review",
    date: "18 Aug 2026",
    needsHumanReview: true
  },
  {
    id: "sub-06",
    studentName: "Grace Uwase",
    studentId: "STU-8826",
    assignment: "Climate Change Essay",
    score: "17/20",
    finalScore: "17/20",
    confidence: "92%",
    status: "Approved",
    statusType: "approved",
    date: "18 Aug 2026",
    needsHumanReview: false
  }
];

export const lecturerStats = {
  totalStudents: 130,
  activeAssignments: 8,
  pendingReviews: 24,
  aiAssessmentsCompleted: 186,
  averageClassScore: 72,
  timeSavedHours: 42,
  humanOverrideRate: "14%"
};

export const studentPortalData = {
  student: {
    name: "Jean Claude",
    id: "STU-8821",
    program: "B.Sc. Environmental Science & Sustainability",
    year: "Year 2",
    gpa: "3.72",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  stats: {
    assignments: 5,
    submitted: 4,
    pending: 1,
    averageGrade: "78%"
  },
  courses: [
    { code: "ENV-101", name: "Introduction to Environmental Studies", lecturer: "Dr. Alice Mukamana", grade: "85% (A)" },
    { code: "GEO-204", name: "Geographic Information Systems", lecturer: "Prof. David Kwizera", grade: "76% (B+)" },
    { code: "STA-102", name: "Applied Biostatistics", lecturer: "Dr. Marie Claire", grade: "82% (A-)" },
    { code: "ECO-105", name: "Principles of Ecological Economics", lecturer: "Dr. Paul Habineza", grade: "71% (B)" }
  ],
  myAssignments: [
    {
      id: "asg-01",
      title: "Climate Change and Sustainable Development",
      course: "Introduction to Environmental Studies",
      dueDate: "20 August 2026",
      status: "Submitted",
      score: "17 / 20",
      percentage: "85%",
      gradedDate: "20 August 2026",
      lecturer: "Dr. Alice Mukamana",
      hasFeedback: true
    },
    {
      id: "asg-02",
      title: "GIS Mapping of Kigali Urban Heat Islands",
      course: "Geographic Information Systems",
      dueDate: "28 August 2026",
      status: "In Progress",
      score: "—",
      percentage: "—",
      gradedDate: "—",
      lecturer: "Prof. David Kwizera",
      hasFeedback: false
    },
    {
      id: "asg-03",
      title: "Statistical Modeling of River Water Quality",
      course: "Applied Biostatistics",
      dueDate: "14 August 2026",
      status: "Graded",
      score: "18 / 20",
      percentage: "90%",
      gradedDate: "15 August 2026",
      lecturer: "Dr. Marie Claire",
      hasFeedback: true
    },
    {
      id: "asg-04",
      title: "Valuation of Nyabarongo Wetland Ecosystems",
      course: "Principles of Ecological Economics",
      dueDate: "05 August 2026",
      status: "Graded",
      score: "14 / 20",
      percentage: "70%",
      gradedDate: "07 August 2026",
      lecturer: "Dr. Paul Habineza",
      hasFeedback: true
    }
  ],
  learningResources: [
    {
      id: "res-01",
      title: "Understanding Climate Change",
      source: "UNEP & Intergovernmental Panel on Climate Change (IPCC)",
      type: "Academic Guide & Case Compendium",
      readTime: "12 min read",
      tags: ["Climate Science", "Adaptation", "Global Policy"],
      description: "A comprehensive breakdown of global warming mechanics, greenhouse gas sinks, and practical adaptation strategies tailored for developing agricultural zones.",
      keyTakeaways: [
        "Distinction between mitigation (preventative) and adaptation (resilience)",
        "Key vulnerability indicators in tropical agro-ecosystems",
        "Frameworks for localized community carbon accounting"
      ],
      linkText: "Open Resource"
    },
    {
      id: "res-02",
      title: "Academic Argumentation in Environmental Policy",
      source: "Harvard College Writing Program",
      type: "Methodology Guide",
      readTime: "8 min read",
      tags: ["Writing Skills", "Thesis Formulation", "Logic"],
      description: "Learn how to structure persuasive, evidence-grounded scientific essays with clear thesis statements, counter-arguments, and synthesis.",
      keyTakeaways: [
        "How to avoid unsupported causality claims in scientific papers",
        "Structuring policy recommendations with feasibility criteria",
        "Techniques for integrating empirical data into analytical paragraphs"
      ],
      linkText: "Open Resource"
    },
    {
      id: "res-03",
      title: "How to Use Evidence & Referencing in Academic Writing",
      source: "Oxford Academic Skills Unit",
      type: "Reference Manual",
      readTime: "10 min read",
      tags: ["APA/Harvard", "Primary Sources", "Data Citation"],
      description: "A masterclass on citing peer-reviewed studies, integrating quantitative tables, and avoiding vague generalizations in university assessments.",
      keyTakeaways: [
        "Proper integration of direct quotations vs. synthesized summaries",
        "Evaluating peer-reviewed source credibility in climate datasets",
        "Best practices for Harvard and APA-7th reference formatting"
      ],
      linkText: "Open Resource"
    }
  ]
};

export const agentToolSteps = [
  {
    step: 1,
    name: "get_assignment",
    title: "1. Retrieve Assignment Specification",
    description: "Fetches assignment requirements, instructions, course learning outcomes, and scoring constraints.",
    status: "done",
    duration: "140ms",
    output: "Retrieved: 'Climate Change and Sustainable Development' (ENV-101), Max Score: 20 marks."
  },
  {
    step: 2,
    name: "get_rubric",
    title: "2. Fetch Evaluation Rubric Matrix",
    description: "Extracts lecturer-defined 4-criterion grading matrix from PostgreSQL store.",
    status: "done",
    duration: "115ms",
    output: "Loaded 4 criteria: Understanding (5), Quality (5), Evidence (5), Structure (5)."
  },
  {
    step: 3,
    name: "analyze_submission",
    title: "3. Parse & Embed Student Submission",
    description: "Parses PDF text, partitions into semantic sections, and generates dense embeddings via Qdrant RAG.",
    status: "done",
    duration: "420ms",
    output: "Processed: 'Jean_Claude_Climate_Change_Essay.pdf' (1,248 words, 5 sections, 12 vector chunks)."
  },
  {
    step: 4,
    name: "evaluate_criteria",
    title: "4. Evaluate Against Rubric Criteria",
    description: "Calculates semantic alignment and criterion-by-criterion evidence matching.",
    status: "done",
    duration: "580ms",
    output: "Understanding: 4/5 | Argument: 4/5 | Evidence: 3/5 | Structure: 5/5."
  },
  {
    step: 5,
    name: "calculate_score",
    title: "5. Compute Aggregate Weighted Score",
    description: "Applies mathematical formula to synthesize criterion evaluations into a baseline score.",
    status: "done",
    duration: "95ms",
    output: "Computed Baseline Score: 16 / 20 (80%)."
  },
  {
    step: 6,
    name: "generate_feedback",
    title: "6. Draft Pedagogical Explanations",
    description: "Generates constructive feedback highlighting key strengths and actionable areas for improvement.",
    status: "done",
    duration: "610ms",
    output: "Drafted 4 criterion explanations, 4 key strengths, and 3 targeted improvement recommendations."
  },
  {
    step: 7,
    name: "check_confidence",
    title: "7. Verify Confidence & Calibrate Uncertainty",
    description: "Checks consistency across evaluation passes, verifies hallucination rate, and assigns confidence index.",
    status: "done",
    duration: "210ms",
    output: "Assessment Confidence: 91% (High Confidence - Lecturer Review Recommended)."
  }
];

export const rubricPresets = [
  {
    id: "rub-01",
    title: "Academic Essay Rubric (Standard 20-Point)",
    department: "Environmental & Social Sciences",
    criteriaCount: 4,
    totalMarks: 20,
    criteria: [
      { name: "Understanding of Topic", marks: 5, desc: "Grasp of core scientific and historical concepts" },
      { name: "Quality of Argument", marks: 5, desc: "Critical thinking, analysis, and logical flow" },
      { name: "Evidence and Examples", marks: 5, desc: "Use of data, case studies, and citations" },
      { name: "Structure and Clarity", marks: 5, desc: "Grammar, academic register, and formatting" }
    ]
  },
  {
    id: "rub-02",
    title: "Laboratory & Field Research Report",
    department: "Natural Sciences",
    criteriaCount: 5,
    totalMarks: 25,
    criteria: [
      { name: "Abstract & Methodology", marks: 5, desc: "Rigorous experimental protocol and safety" },
      { name: "Data Collection & Accuracy", marks: 5, desc: "Quantitative measurement and raw data hygiene" },
      { name: "Statistical Analysis", marks: 5, desc: "Application of hypothesis testing and error bars" },
      { name: "Discussion & Interpretation", marks: 5, desc: "Synthesis of findings with existing literature" },
      { name: "Conclusion & Reproducibility", marks: 5, desc: "Limitations, future scope, and documentation" }
    ]
  },
  {
    id: "rub-03",
    title: "Policy Brief & Case Analysis",
    department: "Public Policy & Economics",
    criteriaCount: 4,
    totalMarks: 20,
    criteria: [
      { name: "Executive Problem Formulation", marks: 5, desc: "Clear identification of policy friction point" },
      { name: "Stakeholder Impact Analysis", marks: 5, desc: "Socio-economic distribution of outcomes" },
      { name: "Actionable Recommendations", marks: 5, desc: "Budget feasibility and timeline realism" },
      { name: "Conciseness & Executive Tone", marks: 5, desc: "Brevity, infographics, and policy tone" }
    ]
  }
];
