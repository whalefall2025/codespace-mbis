# Finance Reading Assistant - PRD

## 1. Context & Purpose

### Purpose & Problem Statement
Finance Reading Assistant is an English-to-Simplified-Chinese academic reading tool for Chinese-speaking international students studying accounting and finance in English.

These students often spend significant time reading English course essays, articles, and academic materials because they must understand both the language and the subject-specific meaning. General translation tools can help with basic meaning, but they often do not support paragraph-by-paragraph comparison, accounting and finance terminology, or essay logic analysis. As a result, students may understand individual sentences but still struggle to identify the main argument, key points, and structure of the reading.

The product helps students read accounting and finance essays more efficiently by showing the original English and Chinese translation side by side, explaining important terminology in simple Chinese, and summarizing the essay's key arguments and logic.

### Target Users
The primary users are Chinese-speaking undergraduate and postgraduate international students studying accounting or finance in English.

The typical user is taking business, accounting, or finance courses at an English-speaking university. They need to read essays, academic articles, case materials, or course readings, but may struggle with technical vocabulary, long paragraph structure, and academic argument logic. They want support that helps them understand the material faster while still seeing the original English text.

### Goals & Success Metrics

| Goal | Metric | Target |
|------|--------|--------|
| Help students understand accounting and finance essays faster | Student self-reported reading efficiency after using the tool | Majority of test users report the tool helps them understand readings faster |
| Help students identify key arguments | Student ability to identify key arguments after using the Analysis tab | Majority of test users can describe the main argument and supporting points |
| Improve understanding of accounting and finance terminology | Accuracy and usefulness of terminology explanations in user testing | Common accounting and finance terms are explained clearly in simple Chinese |
| Preserve useful bilingual comparison | Paragraph structure match between English and Chinese output | Translated output keeps the original paragraph structure |

---

## 2. Features & Scope

### User Stories

1. As a Chinese-speaking accounting or finance student, I want to paste an English essay into the tool, so that I can translate course reading material without preparing a special file.
2. As a student, I want paste-text input in the first version, so that I can test the core translation workflow without file upload complexity.
3. As a student, I want the tool to translate English essays into Simplified Chinese, so that I can understand the meaning of academic reading materials more efficiently.
4. As a student, I want the essay translated paragraph by paragraph, so that I can compare each Chinese paragraph with the matching English paragraph.
5. As a student, I want the original English and Chinese translation shown side by side, so that I can check both languages at the same time.
6. As a student, I want a Simple Chinese translation option, so that difficult academic writing becomes easier to understand.
7. As a student, I want the first version to use Simple Chinese translation, so that the output prioritizes clear understanding over polished wording.
8. As a student, I want the tool to handle accounting and finance terminology carefully, so that professional words are not translated only by their general English meaning.
9. As a student, I want important accounting and finance terms explained in simple Chinese, so that I can understand technical vocabulary while reading.
10. As a student, I want terminology explanations shown in a right sidebar, so that I can use the explanations without interrupting the paragraph translation.
11. As a student, I want the terminology sidebar to be hideable, so that I can focus on the essay translation when explanations are not needed.
12. As a student, I want the first version to explain common accounting and finance terms simply, so that I can understand frequent technical vocabulary while reading.
13. As a student, I do not want terms highlighted inside the paragraph, so that the reading area stays clean and easy to follow.
14. As a student, I want a separate Translation tab, so that I can focus on reading the bilingual essay.
15. As a student, I want a separate Analysis tab, so that I can understand the essay's main points without mixing analysis into the translation view.
16. As a student, I want the Analysis tab to show bullet-point key arguments, so that I can quickly identify the most important ideas in the essay.
17. As a student, I want the Analysis tab to explain the essay logic in an accounting or finance context, so that I can understand how the argument is organized.
18. As a student, I want the tool to help me understand essay structure only, so that it supports learning without writing my assignment for me.
19. As a student, I want the output to be read-only, so that the tool stays focused on translation and reading support.
20. As a student, I want to manually copy translated or analyzed text if needed, so that I can use it in my personal study notes.
21. As a student, I want the app to avoid saving my essay history, so that my course readings and pasted content remain private.
22. As a student, I want a clear privacy statement, so that I understand my pasted content is used for translation and analysis and not stored by the app.
23. As a student, I want a clear accuracy disclaimer, so that I remember AI translation and analysis may contain errors and should be checked for important academic meanings.
24. As a student, I want the tool to support short to medium essay passages in the first version, so that the prototype can focus on translation quality and readability.
25. As a student using a laptop, I want the interface optimized for desktop reading, so that the side-by-side translation is comfortable to use.

### Scope Boundaries

**In scope:**
- English-to-Simplified-Chinese essay translation.
- Pasted text input as the primary input method.
- Paragraph-by-paragraph translation.
- Side-by-side English and Chinese display.
- Simple Chinese translation style.
- Basic accounting and finance terminology support for common terms.
- Hideable right sidebar with simple terminology explanations.
- Translation tab.
- Analysis tab with bullet-point key arguments.
- Analysis of essay logic suitable for accounting and finance readings.
- Read-only output with manual copying allowed.
- No saved history or account storage.
- Privacy notice and AI accuracy disclaimer.
- Laptop/desktop-first experience.
- Short to medium essay passage support for the first prototype.

**Out of scope:**
- Chinese-to-English translation.
- Translation into Traditional Chinese.
- Natural Chinese translation style.
- PDF upload in the first release.
- Scanned or image-based PDF translation.
- Word document upload.
- PowerPoint upload.
- Website or article link import.
- User accounts.
- Saved essay history.
- Editable translated output.
- Automatic citation or source tracking.
- Generating essay paragraphs for student assignments.
- Flashcards, quizzes, or memorization tools.
- Inline highlighting of accounting or finance terms.
- Ambiguous term meaning comparison in the first release.
- Full expert coverage of every accounting and finance subfield.

---

## 3. User Experience

### User Journey
The student opens Finance Reading Assistant on a laptop. The first screen presents a clear essay input area and a Translate button. The student pastes English essay text into the input area.

The first version uses Simple Chinese translation because the main goal is easier comprehension. The student then selects Translate.

After processing, the student sees two main tabs: Translation and Analysis. The Translation tab opens first. It shows the English essay on the left and the Simplified Chinese translation on the right, matched paragraph by paragraph. A terminology sidebar appears on the right side with simple explanations of important accounting and finance terms. The student can hide the sidebar if they want more space for reading.

When the student opens the Analysis tab, they see bullet-point key arguments and a short explanation of the essay's logic in an accounting or finance context. The analysis helps the student understand how the reading is organized, but it does not generate assignment paragraphs or write an essay for the student.

The student may manually copy content for personal study, but the app does not save essay history or require an account. The interface should feel simple, clear, and study-focused. It should avoid distracting visual design, unnecessary steps, or crowded text.

### Acceptance Criteria

- **Pasted essay input**: The user can paste English essay text into the input area and submit it for translation.
- **Simple Chinese translation**: The translated output uses Simplified Chinese with a simple, easy-to-understand style.
- **Paragraph structure**: The translated output preserves the original paragraph structure.
- **Side-by-side translation**: Each English paragraph is displayed beside its matching Simplified Chinese paragraph.
- **Translation tab**: The Translation tab is the first result view shown after translation.
- **Terminology sidebar**: The sidebar shows simple Chinese explanations of relevant accounting and finance terms.
- **Hideable sidebar**: The user can hide and show the terminology sidebar.
- **No inline highlighting**: Accounting and finance terms are not highlighted inside the essay paragraphs.
- **Analysis tab**: The user can open a separate Analysis tab after translation.
- **Key arguments**: The Analysis tab presents the essay's key arguments as bullet points.
- **Essay logic**: The Analysis tab explains the essay's structure and reasoning in a way relevant to accounting or finance readings.
- **Academic integrity boundary**: The Analysis tab helps the user understand structure but does not generate full assignment paragraphs.
- **Read-only output**: Translation and analysis results are not directly editable inside the app.
- **Manual copying**: The user can manually copy visible translation or analysis content.
- **No storage**: The app does not provide account creation, saved history, or stored essay libraries.
- **Privacy notice**: The app clearly states that pasted content is used for translation and analysis and is not stored by the app.
- **Accuracy disclaimer**: The app clearly states that AI translation and analysis may contain errors and important academic meanings should be verified.
- **Article length**: The app supports short to medium pasted essay passages in the first prototype.
- **Laptop-first layout**: The side-by-side reading experience is optimized for laptop and desktop screens.
- **Performance**: A short to medium pasted essay passage completes translation and analysis within a reasonable wait time for a classroom prototype.

---

## 4. Constraints

### Regulatory / Legal
No formal regulatory requirements are identified for the university prototype. The product should still communicate clear privacy and academic integrity boundaries.

The product should not encourage students to submit AI-generated assignment writing as their own work. Its role is reading comprehension, translation, terminology support, and structure understanding.

### Platform & Standards
The prototype is designed primarily for laptop and desktop web use. Mobile optimization is not required for the first release because the core side-by-side reading experience works best on larger screens.

The product should use Simplified Chinese only in the first release.

### Performance Requirements
The prototype should complete translation and analysis for short to medium pasted essay passages within a reasonable wait time for a classroom demonstration.

The interface should remain clear and responsive while the user waits. If processing takes time, the user should receive clear feedback that the translation is in progress.

### Assumptions & Risks

| Assumption | Risk if wrong |
|-----------|--------------|
| Chinese-speaking accounting and finance students want side-by-side translation more than Chinese-only translation | The layout may not match real student reading habits |
| Students will use the tool mainly for reading comprehension, not assignment generation | Academic integrity concerns may increase if users expect writing generation |
| Paste-text input is enough to demonstrate the core value | Students may expect direct file upload for real course readings |
| Short to medium essay passages are enough for a three-week prototype | The prototype may not handle full-length academic articles yet |
| Simple Chinese is the best first-release translation style | Some students may prefer smoother or more formal academic Chinese |
| A basic accounting and finance terminology glossary is enough for MVP | Students may encounter important terms outside the initial glossary |
| No storage is acceptable for users | Some students may later expect saved reading history or study notes |

---

## 5. Priorities (Delivery Plan)

### Must-have (MVP)
The first release must include:

- Pasted English essay input.
- English-to-Simplified-Chinese translation.
- Paragraph-by-paragraph output.
- Side-by-side English and Chinese display.
- Translation tab as the first completed workflow.
- Simple Chinese translation style.
- Basic accounting and finance terminology explanations in a hideable sidebar.
- Analysis tab with bullet-point key arguments and accounting/finance essay logic.
- Privacy notice.
- Accuracy disclaimer.
- No saved history or user accounts.

### Future Enhancements / Stretch Goals
The following capabilities are valuable but can wait for later versions or stretch goals:

- Word document upload.
- PowerPoint upload.
- Text-based PDF upload.
- Scanned PDF support with OCR.
- Natural Chinese translation style.
- Ambiguous term meaning comparison.
- Larger accounting and finance terminology coverage.
- Mobile-optimized layout.
- Saved reading history.
- User accounts.
- Flashcards or vocabulary memorization.
- Course-specific word banks.
- Editable study notes.
- Source or citation management.
- Traditional Chinese support.
- Website or article link import.

### Order of work
1. Build the core Translation tab for pasted text.
2. Add paragraph-by-paragraph side-by-side display.
3. Use Simple Chinese as the first-release translation style.
4. Add the Analysis tab with key arguments and essay logic.
5. Add the hideable terminology sidebar with a basic glossary of common terms.
6. Add privacy notice and accuracy disclaimer.
7. Test the full workflow with accounting and finance sample essays.
8. Validate the prototype with student users and refine wording, layout, and analysis quality.

---

## Further Notes
Finance Reading Assistant should be positioned as an academic reading support tool, not a general translator and not an assignment-writing tool. Its main value is helping students understand English accounting and finance readings while still keeping the original English visible.

The product should prioritize clarity, student trust, and learning support. The first version should avoid unnecessary account systems, storage features, or writing-generation features so the prototype remains focused and appropriate for a university setting.
