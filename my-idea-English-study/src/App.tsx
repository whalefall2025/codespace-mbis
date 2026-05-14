import { FormEvent, useMemo, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { createDemoResult, loadCurrentResult, saveCurrentResult } from "./demoResult";
import "./styles.css";

const WORD_LIMIT = 5000;

function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) {
    return 0;
  }

  return trimmed.split(/\s+/).length;
}

function InputPage() {
  const [essayText, setEssayText] = useState("");
  const [error, setError] = useState("");
  const wordCount = useMemo(() => countWords(essayText), [essayText]);
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (wordCount === 0) {
      setError("Paste some English text before continuing. 请输入英文文本后再继续。");
      return;
    }

    if (wordCount > WORD_LIMIT) {
      setError(
        "This prototype supports up to 5,000 words. 请将文本缩短到 5,000 个英文单词以内。"
      );
      return;
    }

    setError("");
    saveCurrentResult(createDemoResult(essayText));
    navigate("/results");
  }

  return (
    <main className="app-shell">
      <section className="input-panel" aria-labelledby="page-title">
        <p className="kicker">University demo / 大学课堂演示</p>
        <h1 id="page-title">Finance Reading Assistant</h1>
        <p className="subtitle">金融阅读助手</p>

        <div className="notice-grid" aria-label="Project notices">
          <article>
            <h2>Privacy / 隐私</h2>
            <p>
              This browser demo does not send pasted text to a server. 本浏览器演示不会把粘贴内容发送到服务器。
            </p>
          </article>
          <article>
            <h2>Accuracy / 准确性</h2>
            <p>
              Demo output may be incomplete or incorrect. 演示结果可能不完整或不准确，请核对重要含义。
            </p>
          </article>
          <article>
            <h2>Academic Integrity / 学术诚信</h2>
            <p>
              Use this as reading support, not assignment-ready writing. 本工具只用于阅读理解，不生成可提交作业内容。
            </p>
          </article>
        </div>

        <form className="essay-form" onSubmit={handleSubmit}>
          <label htmlFor="essay-input">Paste your English reading / 粘贴英文阅读材料</label>
          <textarea
            id="essay-input"
            value={essayText}
            onChange={(event) => {
              setEssayText(event.target.value);
              if (error) {
                setError("");
              }
            }}
            placeholder="Paste an accounting or finance essay passage here..."
            rows={12}
          />

          <div className="form-footer">
            <span className={wordCount > WORD_LIMIT ? "word-count over-limit" : "word-count"}>
              {wordCount.toLocaleString()} / 5,000 words
            </span>
            <button type="submit">Translate / 翻译</button>
          </div>

          {error ? <p className="error-message">{error}</p> : null}
        </form>
      </section>
    </main>
  );
}

function ResultsPage() {
  const result = loadCurrentResult();
  const [showTerminology, setShowTerminology] = useState(true);

  return (
    <main className="app-shell">
      <section className="input-panel" aria-labelledby="results-title">
        <p className="kicker">Combined reading screen / 综合阅读页面</p>
        <h1 id="results-title">Results Workspace</h1>
        <p className="subtitle">结果阅读区</p>
        {result ? (
          <div className="results-grid">
            <div className="result-summary" aria-label="Demo result summary">
              <p className="status-line">Demo result loaded / 演示结果已加载</p>
              <p>{result.sourceParagraphs.length} paragraphs prepared / 段落已准备</p>
              <h2>Side-by-side reading / 对照阅读</h2>
              <div className="reading-header" aria-hidden="true">
                <span>Original English / 英文原文</span>
                <span>Simple Chinese / 简明中文</span>
              </div>
              <div className="paragraph-pairs">
                {result.sourceParagraphs.map((paragraph, index) => (
                  <article className="paragraph-pair" key={`${paragraph}-${index}`}>
                    <p className="paragraph-label">Paragraph {index + 1} / 段落 {index + 1}</p>
                    <section aria-labelledby={`english-${index}`}>
                      <h3 id={`english-${index}`}>Original English / 英文原文</h3>
                      <p>{paragraph}</p>
                    </section>
                    <section aria-labelledby={`chinese-${index}`}>
                      <h3 id={`chinese-${index}`}>Simple Chinese / 简明中文</h3>
                      <p>{result.translatedParagraphs[index]}</p>
                    </section>
                  </article>
                ))}
              </div>
              <section className="analysis-panel" aria-labelledby="analysis-title">
                <p className="kicker">Demo analysis / 演示分析</p>
                <h2 id="analysis-title">Reading logic analysis / 阅读逻辑分析</h2>
                <p>
                  This section supports structure understanding and is not assignment-ready writing.
                  本部分用于理解文章结构，不是可提交作业内容。
                </p>
                <h3>Key arguments / 关键观点</h3>
                <ul aria-label="Key arguments / 关键观点">
                  {result.analysis.keyArguments.map((argument) => (
                    <li key={argument}>{argument}</li>
                  ))}
                </ul>
                <h3>Logic summary / 逻辑总结</h3>
                <p>{result.analysis.logicSummary}</p>
              </section>
            </div>
            <div className="sidebar-shell">
              <button
                className="secondary-button"
                type="button"
                onClick={() => setShowTerminology((current) => !current)}
              >
                {showTerminology ? "Hide terminology / 隐藏术语" : "Show terminology / 显示术语"}
              </button>
              {showTerminology ? (
                <aside
                  className="terminology-sidebar"
                  aria-label="Terminology sidebar / 术语侧栏"
                >
                  <h2>Terminology / 术语</h2>
                  {result.glossaryTerms.length > 0 ? (
                    <dl>
                      {result.glossaryTerms.map((entry) => (
                        <div className="term-card" key={entry.term}>
                          <dt>
                            {entry.term} / {entry.chinese}
                          </dt>
                          <dd>{entry.explanation}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p>No glossary terms detected. 未检测到预设术语。</p>
                  )}
                </aside>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="empty-state">
            Paste an English reading first to generate demo results. 请先粘贴英文阅读材料以生成演示结果。
          </p>
        )}
        <Link className="text-link" to="/">
          Back to input / 返回输入页
        </Link>
      </section>
    </main>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
