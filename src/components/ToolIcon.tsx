import {
  siDocker,
  siFastapi,
  siGithubactions,
  siHuggingface,
  siJupyter,
  siLangchain,
  siLanggraph,
  siMlflow,
  siNextdotjs,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siPytorch,
  siScikitlearn,
  siSupabase,
  siTensorflow,
} from 'simple-icons';
import type { ToolKey } from '../data';

// simple-icons (CC0) paths, all on a 24×24 grid.
const GLYPHS: Partial<Record<ToolKey, string>> = {
  python: siPython.path,
  pytorch: siPytorch.path,
  tensorflow: siTensorflow.path,
  scikitlearn: siScikitlearn.path,
  numpy: siNumpy.path,
  pandas: siPandas.path,
  jupyter: siJupyter.path,
  huggingface: siHuggingface.path,
  langchain: siLangchain.path,
  langgraph: siLanggraph.path,
  mlflow: siMlflow.path,
  docker: siDocker.path,
  githubactions: siGithubactions.path,
  fastapi: siFastapi.path,
  postgresql: siPostgresql.path,
  supabase: siSupabase.path,
  nextjs: siNextdotjs.path,
};

// Brands simple-icons can't ship get a plain wordmark instead.
const WORDMARKS: Partial<Record<ToolKey, string>> = {
  aws: 'AWS',
  azure: 'Azure',
  openai: 'OpenAI',
};

/** Monochrome tool glyphs, drawn at 26px in #DEDEDE like the reference. */
export default function ToolIcon({ tool }: { tool: ToolKey }) {
  const path = GLYPHS[tool];
  if (path) {
    return (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    );
  }
  const word = WORDMARKS[tool] ?? '';
  return (
    <span
      aria-hidden="true"
      className={`font-display font-bold leading-none tracking-[-0.03em] ${word.length > 4 ? 'text-[12px]' : 'text-[15px]'}`}
    >
      {word}
    </span>
  );
}
