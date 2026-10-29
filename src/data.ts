/*
 * Site content, sourced from the resume. Edit copy here; sections only handle layout.
 */

const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

export const PROFILE = {
  name: 'Sai Gireesh',
  fullName: 'G. Sai Gireesh Reddy',
  wordmark: 'SAI GIREESH',
  signature: 'Sai',
  role: 'AI/ML Engineer | Generative AI',
  location: 'Rajkot, India',
  email: 'saigireesh22@gmail.com',
  github: 'https://github.com/saixg',
  linkedin: 'https://www.linkedin.com/in/sai-gireeshh',
  resume: asset('resume.pdf'),
  avatar: asset('avatar.webp'),
  intro: 'I build AI systems that stay grounded: retrieval, agents and evaluation that hold up in the real world.',
  credential: "B.Tech AI & ML '28",
};

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
];

export type Project = {
  title: string;
  tagline: string;
  meta: string;
  summary: string;
  href: string;
  tint: [string, string];
  /** Optional cover image path; procedural artwork is used when omitted. */
  image?: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'CodeAxis',
    tagline: 'Codebase Intelligence & Agent Context',
    meta: 'Tree-sitter · NetworkX · FastAPI · Next.js',
    summary:
      'Turns an unfamiliar repository into a dependency graph that developers and coding agents can reason about, grounded in real source spans.',
    href: PROFILE.github,
    tint: ['#2563EB', '#0B1B3F'],
  },
  {
    title: 'SecureRAG',
    tagline: 'Permission-Aware Multimodal Retrieval',
    meta: 'LangGraph · BGE-M3 · pgvector · PaddleOCR',
    summary:
      'Retrieval QA over PDFs, scans and SQL rows that enforces row-level access at retrieval and refuses any claim it cannot cite.',
    href: PROFILE.github,
    tint: ['#EA0044', '#3A0012'],
  },
  {
    title: 'MedConnect',
    tagline: 'Automated Clinical Intake & Triage Routing',
    meta: 'Gemma 4 · Next.js · Maps API · PostgreSQL',
    summary:
      'Free-text symptoms become validated clinical records routed to the right hospital, with emergencies escalated and recall guarded in CI.',
    href: PROFILE.github,
    tint: ['#059669', '#04241B'],
  },
  {
    title: 'Lucent',
    tagline: 'Claim-Verification Engine',
    meta: 'NextGen 2.0 Hackathon · ACM Fremont',
    summary: 'Returns cited, graded verdicts on claims circulating across social media.',
    href: PROFILE.github,
    tint: ['#D97706', '#2B1702'],
  },
];

export const BIG_QUOTE = {
  quote: '“Refusal should be the default failure mode, not an unsupported answer.”',
  author: PROFILE.fullName,
  title: 'On building SecureRAG',
};

export type ToolKey =
  | 'python'
  | 'pytorch'
  | 'tensorflow'
  | 'scikitlearn'
  | 'numpy'
  | 'pandas'
  | 'jupyter'
  | 'huggingface'
  | 'langchain'
  | 'langgraph'
  | 'openai'
  | 'mlflow'
  | 'docker'
  | 'aws'
  | 'azure'
  | 'githubactions'
  | 'fastapi'
  | 'postgresql'
  | 'supabase'
  | 'nextjs';

export const TOOLS: { key: ToolKey; label: string }[] = [
  // core ML
  { key: 'python', label: 'Python' },
  { key: 'pytorch', label: 'PyTorch' },
  { key: 'tensorflow', label: 'TensorFlow' },
  { key: 'scikitlearn', label: 'scikit-learn' },
  { key: 'numpy', label: 'NumPy' },
  { key: 'pandas', label: 'Pandas' },
  { key: 'jupyter', label: 'Jupyter' },
  // generative AI
  { key: 'huggingface', label: 'Hugging Face' },
  { key: 'langchain', label: 'LangChain' },
  { key: 'langgraph', label: 'LangGraph' },
  { key: 'openai', label: 'OpenAI API' },
  // MLOps & cloud
  { key: 'mlflow', label: 'MLflow' },
  { key: 'docker', label: 'Docker' },
  { key: 'aws', label: 'AWS' },
  { key: 'azure', label: 'Azure' },
  { key: 'githubactions', label: 'GitHub Actions' },
  // data & app
  { key: 'fastapi', label: 'FastAPI' },
  { key: 'postgresql', label: 'PostgreSQL · pgvector' },
  { key: 'supabase', label: 'Supabase' },
  { key: 'nextjs', label: 'Next.js' },
];

/** Hero ticker: the stack by name. */
export const STACK = TOOLS.map((t) => t.label);

export const SERVICES = [
  {
    title: 'RAG & Retrieval',
    body: 'Retrieval pipelines that find the right evidence, respect who is allowed to see it, and cite every claim.',
    tags: ['Embeddings', 'Hybrid Search', 'Reranking', 'pgvector', 'Citation Checks'],
  },
  {
    title: 'Agentic Orchestration',
    body: 'Multi-step agents that route between tools, retrieval and SQL, with every step observable and bounded.',
    tags: ['LangGraph', 'Intent Routing', 'Text-to-SQL', 'Tool Use', 'Agent Context'],
  },
  {
    title: 'LLM Evaluation',
    body: 'Prompt and schema changes treated like deployments: scored against frozen sets and blocked when they regress.',
    tags: ['Eval Harnesses', 'Schema Validation', 'Structured Output', 'CI Gates', 'MLflow'],
  },
  {
    title: 'ML & Deep Learning',
    body: 'Models built and measured properly, from classic baselines to sequence models and transformers.',
    tags: ['PyTorch', 'scikit-learn', 'RNNs / LSTMs', 'Transformers', 'Model Evaluation'],
  },
  {
    title: 'Backend & Data',
    body: 'The production layer around the model: typed APIs, secure Postgres, and containers that ship.',
    tags: ['FastAPI', 'PostgreSQL', 'Row-Level Security', 'Supabase', 'Docker'],
  },
];

export const BIO = [
  'I’m an AI/ML engineer studying Computer Science (Artificial Intelligence & Machine Learning) at Marwadi University, focused on generative AI systems that have to be right, not just fluent.',
  'Most of my work sits where models meet real data: retrieval pipelines, agent orchestration with LangGraph, and backends on FastAPI and Postgres with pgvector.',
  'I lean on deterministic foundations wherever I can. That means static analysis instead of guesswork, schema validation on every model response, and citation checks before an answer ships.',
  'I’ve led teams at OOSC 4.0, GDG Rajkot’s Build with Gemma 4 and national AI hackathons. I’m open to internships, roles and ambitious AI collaborations.',
];

export const EXPERIENCE = [
  { org: 'OOSC 4.0 · IIIT Allahabad', role: 'AI Engineer & Team Lead, Team NxtGen.7', period: 'Agentic AI Workbench' },
  { org: 'AI Innovation Hackathon', role: 'Team Lead, Team Los Blancos · Bharat Academix', period: '2026 · GramMitra' },
  { org: 'Build with Gemma 4', role: 'Team Lead · GDG Rajkot', period: 'MedConnect' },
  { org: 'NextGen 2.0 Hackathon', role: 'ACM Fremont / Soft Computing Research Society', period: '2026 · Lucent' },
  { org: 'Marwadi University', role: 'B.Tech CSE (AI & ML) · CGPA 8.0/10', period: '2024 - 2028' },
];

export const PRINCIPLES = [
  {
    title: 'Grounded, not guessed.',
    body: 'Every explanation traces back to real source spans and dependency paths, not to what the model thinks it remembers.',
    project: 'CodeAxis',
  },
  {
    title: 'Refuse before you hallucinate.',
    body: 'Each generated claim is checked against its cited evidence. When it can’t be verified, the system declines to answer.',
    project: 'SecureRAG',
  },
  {
    title: 'Permissions at retrieval.',
    body: 'Content outside a user’s scope is never retrieved, never passed to the model and never cited.',
    project: 'SecureRAG',
  },
  {
    title: 'Degrade safely.',
    body: 'A deterministic fallback sits behind every model decision that matters, so a bad generation can’t drop an urgent case.',
    project: 'MedConnect',
  },
  {
    title: 'Prompts are deployments.',
    body: 'CI scores every prompt and schema change against a frozen labelled set and blocks merges that regress.',
    project: 'MedConnect',
  },
  {
    title: 'Hard safety constraints.',
    body: 'The system structures and routes information for clinicians. It never diagnoses.',
    project: 'MedConnect',
  },
];

export const FAQS = [
  {
    q: 'Are you open to internships or full-time roles?',
    a: 'Yes. I’m pursuing my B.Tech in AI & ML (2024 - 2028) and open to AI/ML engineering internships and roles. My resume is linked on this page.',
  },
  {
    q: 'What kind of AI work do you take on?',
    a: 'Generative AI systems end to end: retrieval-augmented QA, agent orchestration, structured-output pipelines and the evaluation that keeps them honest.',
  },
  {
    q: 'How do you keep LLM systems reliable?',
    a: 'Schema validation on every response, deterministic fallbacks behind critical decisions, citation checks before answers ship, and CI that blocks prompt changes that regress.',
  },
  {
    q: 'Can you work across the full stack?',
    a: 'Yes. Beyond the models I build the FastAPI services, PostgreSQL schemas with row-level security, and Next.js front ends around them.',
  },
  {
    q: 'What’s your go-to stack?',
    a: 'Python, PyTorch, LangGraph, FastAPI and PostgreSQL with pgvector on Supabase, shipped with Docker, Git and CI/CD.',
  },
  {
    q: 'Do you work remotely?',
    a: 'I’m based in Rajkot, India, and happy to collaborate remotely across time zones.',
  },
  {
    q: 'What are you building right now?',
    a: 'CodeAxis, a platform that turns any repository into context developers and coding agents can reason about, and SecureRAG, a permission-aware retrieval system.',
  },
];

export const BOOK_CALL = {
  title: 'Hiring, or building something with AI?',
  body: 'I’m open to internships, roles and collaborations on AI systems that need to be right.',
  closer: ['Send a message or grab my resume,', 'let’s talk.'],
};

export const CYCLE_WORDS = ['build', 'ship', 'train'];
