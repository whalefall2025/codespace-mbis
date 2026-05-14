import { findGlossaryTerms, type GlossaryTerm } from "./glossary";

export const CURRENT_RESULT_KEY = "finance-reading-current-result";

export type DemoResult = {
  sourceParagraphs: string[];
  translatedParagraphs: string[];
  analysis: {
    keyArguments: string[];
    logicSummary: string;
  };
  glossaryTerms: GlossaryTerm[];
};

export function splitParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function createDemoResult(text: string): DemoResult {
  const sourceParagraphs = splitParagraphs(text);

  return {
    sourceParagraphs,
    translatedParagraphs: sourceParagraphs.map(
      (paragraph, index) => `演示中文段落 ${index + 1}：${paragraph}`
    ),
    analysis: {
      keyArguments: ["Demo analysis placeholder for reading structure."],
      logicSummary: "Demo logic placeholder for classroom review."
    },
    glossaryTerms: findGlossaryTerms(text)
  };
}

export function saveCurrentResult(result: DemoResult) {
  sessionStorage.setItem(CURRENT_RESULT_KEY, JSON.stringify(result));
}

export function loadCurrentResult(): DemoResult | null {
  const storedResult = sessionStorage.getItem(CURRENT_RESULT_KEY);
  if (!storedResult) {
    return null;
  }

  try {
    return JSON.parse(storedResult) as DemoResult;
  } catch {
    return null;
  }
}
