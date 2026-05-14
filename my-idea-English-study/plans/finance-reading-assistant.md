# Plan: Finance Reading Assistant

> Source PRD: `PRD.md`  
> Source specs: `SPECS.md`

## Architectural Decisions

Durable decisions that apply across all phases:

- **Application type**: React/Vite frontend-only university demo.
- **Routes**: `/` for pasted essay input and `/results` for the combined reading workspace.
- **No extra routes**: Do not add separate translation, analysis, account, upload, or admin routes.
- **Processing boundary**: All processing happens in the browser using deterministic mocked logic.
- **Persistence boundary**: Use `sessionStorage` only for the current browser-session result. Each new submission may replace the previous result.
- **No backend**: No backend server processing, database, accounts, saved history, API keys, or real AI API.
- **Input limit**: Block submissions above 5,000 words with a clear bilingual message.
- **Output model**: Current result includes original paragraphs, mocked Simple Chinese paragraphs, detected glossary terms, and mocked analysis.
- **Glossary model**: Fixed predefined accounting and finance glossary with 30-50 terms.
- **Layout model**: Desktop/laptop-first results page with side-by-side English and Chinese text, a right terminology sidebar, and same-page analysis.
- **Academic integrity boundary**: Analysis supports reading comprehension and structure understanding only. It must avoid assignment-ready writing.

---

## Phase 1: Project Shell And Input Flow

**User stories**: 1-8, 34-36, 39, 42-43

### Goal

Create the basic React/Vite app structure and the first usable input page. A student should be able to open `/`, read the bilingual notices, paste text, see the word count, and understand why long input is blocked.

### Smallest Demoable Outcome

The app runs in the browser and shows a bilingual input page at `/`. The user can paste English text, see a word count, submit valid text, and receive a clear bilingual error when the input is empty or over 5,000 words.

### What To Build

- React/Vite project shell.
- Minimal client-side routing with only `/` and `/results`.
- Bilingual app title, input labels, privacy notice, accuracy/demo notice, and academic integrity notice.
- Large paste-text input area.
- Word count display.
- Submit button.
- Empty-input validation.
- Over-5,000-word blocking validation.
- Basic way to return to the input page from later phases.

### Suggested Tests Or Checks

- Test that `/` renders the input page.
- Test that bilingual notices are visible.
- Test that empty input cannot be submitted.
- Test that text above 5,000 words is blocked.
- Test that valid text can pass validation.
- Manual check: the page is understandable on a laptop-width browser.

### Files Likely To Be Created Or Edited

- React/Vite setup files.
- App entry point.
- Route configuration.
- Input page component.
- Basic shared layout or styles.
- Initial test setup if the project template does not already include one.

### Risks Or Assumptions

- Assumes React/Vite is acceptable for the assignment and can be installed/run in the Codespace.
- Bilingual UI text should stay concise so the page does not become crowded.
- The word counter should use a simple, explainable word-count rule rather than complex natural-language parsing.

### Done When

- `/` is usable as the input page.
- Empty and over-limit submissions are blocked with clear messages.
- The implementation does not include backend processing, accounts, database storage, upload features, real AI API calls, Natural Chinese mode, mobile-optimized layout, or extra routes.

---

## Phase 2: Browser Session Result Pipeline

**User stories**: 7-8, 31-33, 36, 40-42

### Goal

Create the browser-only result-generation pipeline that connects the input page to `/results`. The app should produce deterministic demo data and temporarily preserve it in `sessionStorage`.

### Smallest Demoable Outcome

After submitting valid text on `/`, the app generates a mock result, stores it in `sessionStorage`, navigates to `/results`, and shows either the stored result state or a paste-first empty state if no result exists.

### What To Build

- Current-result data shape for the browser demo.
- Paragraph splitting from pasted English text.
- Deterministic mocked Simple Chinese paragraph generation.
- Deterministic mocked analysis placeholder.
- Temporary `sessionStorage` save/load behavior.
- Replace previous session result when a new passage is submitted.
- `/results` empty state when no session result exists.
- Clear demo label explaining that output is mocked.

### Suggested Tests Or Checks

- Test that valid submission saves a current result to `sessionStorage`.
- Test that valid submission navigates to `/results`.
- Test that `/results` can read and display the existence of a stored result.
- Test that `/results` shows a paste-first empty state when no session result exists.
- Test that a second submission replaces the previous session result.
- Manual check: refresh `/results` and confirm the current session result remains available.

### Files Likely To Be Created Or Edited

- Result-generation utility.
- Session storage utility.
- Results page component.
- Route configuration.
- Input page submit handler.
- Tests for validation, storage, and route behavior.

### Risks Or Assumptions

- `sessionStorage` is temporary browser-session state, not saved history. This must be clear in both implementation and wording.
- Mocked output must be deterministic so tests and demos are stable.
- The demo should not simulate a real AI service so strongly that users misunderstand it as production translation.

### Done When

- The input-to-results path works end to end in the browser.
- `/results` has a clear empty state without session data.
- Refresh preserves the current result within the same browser session.
- No backend, database, account, saved-history, API-key, or real-AI dependency has been introduced.

---

## Phase 3: Side-By-Side Translation Workspace

**User stories**: 9-14, 29-30, 37-38

### Goal

Turn `/results` into the main reading workspace by showing original English paragraphs and mocked Simple Chinese paragraphs side by side.

### Smallest Demoable Outcome

The user can submit a multi-paragraph English passage and see each original paragraph paired with a matching mocked Simple Chinese paragraph on `/results`.

### What To Build

- Side-by-side reading layout for English and Chinese columns.
- Paragraph-pair rendering.
- Read-only output display.
- Normal browser text selection for manual copying.
- Basic desktop/laptop-first styling for readable long text.
- Clear section headings in bilingual UI.

### Suggested Tests Or Checks

- Test that every source paragraph has one matching translated paragraph.
- Test that paragraph order is preserved.
- Test that output is displayed as read-only text, not editable fields.
- Test that `/results` keeps translation and original text on the same page.
- Manual check: paste a two- or three-paragraph sample and verify the comparison is easy to follow.

### Files Likely To Be Created Or Edited

- Results page component.
- Translation workspace component.
- Paragraph display component if useful.
- Result data model or type definitions.
- Styles for the reading layout.
- Tests for paragraph preservation and display behavior.

### Risks Or Assumptions

- A 5,000-word passage can make the page long. The simple solution is a readable scroll layout, not additional routes.
- The mocked Chinese text only demonstrates layout and workflow; it is not production translation quality.
- The layout should prioritize laptop/desktop readability and avoid mobile optimization work.

### Done When

- `/results` displays original English and mocked Simple Chinese side by side.
- Paragraph structure is preserved.
- Output is read-only and manually copyable.
- No separate translation page or Natural Chinese mode has been added.

---

## Phase 4: Terminology Sidebar

**User stories**: 15-22

### Goal

Add predictable accounting and finance terminology support using a fixed predefined glossary and a hideable right sidebar.

### Smallest Demoable Outcome

When pasted text contains glossary terms, `/results` shows those terms with simple Chinese explanations in a right sidebar. The user can hide and show the sidebar.

### What To Build

- Fixed glossary of 30-50 common accounting and finance terms.
- Simple matching logic against the pasted English text.
- Relevant-term list for the current result.
- Right terminology sidebar.
- Empty state when no glossary terms are detected.
- Hide/show sidebar control.
- No inline highlighting inside paragraphs.

### Suggested Tests Or Checks

- Test that known glossary terms are detected from pasted text.
- Test that matching is case-insensitive.
- Test that non-present glossary terms are not shown as detected terms.
- Test that the sidebar displays simple Chinese explanations.
- Test that the sidebar hide/show control works.
- Test that terms are not highlighted inline in the essay text.

### Files Likely To Be Created Or Edited

- Glossary data module.
- Glossary matching utility.
- Terminology sidebar component.
- Results page layout.
- Tests for glossary matching and sidebar behavior.

### Risks Or Assumptions

- A fixed glossary is simpler and more testable than AI term detection, but it will not cover every term students encounter.
- Matching should stay simple for the prototype; complex financial phrase disambiguation is out of scope.
- The sidebar can reduce horizontal space, so the hide/show control is important for reading comfort.

### Done When

- The app includes a fixed 30-50 term glossary.
- Relevant terms from the pasted text appear in the sidebar with simple Chinese explanations.
- The sidebar can be hidden and shown.
- No inline highlighting, custom course vocabulary bank, or ambiguous term comparison has been added.

---

## Phase 5: Same-Page Analysis Panel

**User stories**: 23-28, 36

### Goal

Add the same-page analysis section that helps students understand key arguments and essay logic without creating assignment-ready writing.

### Smallest Demoable Outcome

The `/results` page shows a clearly labeled demo analysis panel with bullet-point key arguments and a short structure-focused logic explanation below or beside the translation workspace.

### What To Build

- Deterministic mocked analysis generation.
- Bullet-point key arguments.
- Short essay-logic explanation in an accounting or finance reading context.
- Same-page analysis panel on `/results`.
- Clear demo and academic integrity labels.
- Wording guardrails that avoid thesis statements, rewritten assignment paragraphs, or polished essay prose.

### Suggested Tests Or Checks

- Test that analysis appears on `/results`, not a separate route.
- Test that key arguments render as bullet points.
- Test that the analysis panel includes a demo/accuracy label.
- Test that the academic integrity notice is visible near or before analysis.
- Manual check: analysis wording supports comprehension and does not read like a paragraph a student could submit.

### Files Likely To Be Created Or Edited

- Analysis generation utility.
- Analysis panel component.
- Results page component.
- Shared notice or label component if useful.
- Tests for same-page rendering and analysis format.

### Risks Or Assumptions

- Even mocked analysis can sound too assignment-ready if written poorly.
- The safest pattern is short bullets and structure labels, not polished paragraphs.
- Keeping analysis on the same page may make `/results` long, but it supports the PRD goal of comparing all reading supports together.

### Done When

- Analysis is visible on `/results` in the same reading workspace.
- Key arguments and logic explanation are present.
- The analysis is clearly demo-labeled and avoids assignment-ready writing.
- No separate analysis route, real AI analysis, citation generation, or assignment paragraph generation has been added.

---

## Phase 6: MVP Verification And Demo Polish

**User stories**: 34-43

### Goal

Verify the complete MVP workflow and polish the demo enough for a classroom presentation without expanding scope.

### Smallest Demoable Outcome

A demonstrator can run the app, paste a short accounting or finance passage, submit it, review the combined `/results` page, refresh the page, hide/show the glossary sidebar, and explain the privacy, demo, and academic integrity boundaries.

### What To Build

- Focused workflow tests covering the main user path.
- Final copy review for bilingual labels and notices.
- Final layout pass for laptop/desktop readability.
- Sample demo passage for manual testing if useful.
- README or brief run instructions if the project does not already make the demo obvious.
- Cleanup of unused code or accidental scope expansion.

### Suggested Tests Or Checks

- Run the app locally and complete the full paste-to-results workflow.
- Test over-5,000-word blocking.
- Test refresh behavior on `/results`.
- Test glossary detection and sidebar hide/show.
- Test that analysis remains on the same page.
- Test that notices are visible.
- Check that no backend, database, accounts, uploads, real AI API, Natural Chinese mode, mobile optimization work, or extra routes were added.

### Files Likely To Be Created Or Edited

- Workflow or component tests.
- App styles.
- User-facing copy.
- README or demo notes if needed.
- Existing components from earlier phases for small polish fixes.

### Risks Or Assumptions

- Polish work can easily expand into new features. Keep changes limited to readability, copy clarity, and demo reliability.
- Tests should focus on meaningful user-visible behavior, not every internal helper.
- The final demo should be honest that translation and analysis are mocked.

### Done When

- The six-phase MVP workflow is complete and demoable.
- Focused tests/checks pass.
- The app remains within the approved scope: frontend-only, no accounts, no database, no saved history, no uploads, no real AI API, no Natural Chinese mode, no mobile-optimized layout, and no extra routes.

