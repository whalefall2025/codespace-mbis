## Problem Statement

Chinese-speaking international students studying accounting and finance in English need help reading English course essays and academic materials. They often need to understand the English text, the Simplified Chinese meaning, the finance/accounting terminology, and the logic of the argument at the same time. General translation tools may translate sentences, but they do not provide a study-focused reading layout, paragraph-by-paragraph comparison, fixed academic integrity boundaries, or simple terminology explanations.

For the university prototype, the product should demonstrate the core learning workflow without depending on a live AI service. The demo should help students paste an English passage, compare the original text with a Simple Chinese translation, review accounting and finance vocabulary, and understand the reading's structure in one combined results screen.

## Solution

Build a React/Vite single-page web prototype with two routes:

- `/` for pasted text input, privacy/accuracy notices, and submission.
- `/results` for the combined reading screen.

The `/results` page will show the original English text and Simple Chinese translation side by side, a terminology sidebar on the right, and an analysis section on the same page. The analysis should help students understand key arguments and essay logic, but it must avoid assignment-ready writing.

For the university demo, translation, terminology, and analysis will use deterministic mocked logic in the browser rather than a real AI API. The app will store the latest pasted text and generated demo result in `sessionStorage` so route navigation and refresh can preserve the current result during the browser session. The app will not create accounts, save history, or send pasted content to a backend.

## User Stories

1. As a Chinese-speaking accounting or finance student, I want to paste an English reading passage into the app, so that I can study course material without uploading a file.
2. As a student, I want the first version to use paste-text input only, so that the prototype stays simple and focused.
3. As a student, I want the app to block passages longer than 5,000 words, so that I understand the first version's reading limit before processing.
4. As a student, I want a clear message when my passage is too long, so that I know how to shorten it.
5. As a student, I want the interface to be bilingual in English and Simplified Chinese, so that I can understand the controls and notices comfortably.
6. As a student, I want to submit my English passage from the input page, so that I can move into the reading workflow.
7. As a student, I want the app to show brief processing feedback only if submission is not immediate, so that the prototype does not add unnecessary waiting behavior.
8. As a student, I want the app to take me to a results page after processing, so that I can focus on reading and analysis.
9. As a student, I want the results page to keep all major study outputs visible in one screen, so that I do not need to jump between separate pages.
10. As a student, I want to see the original English text on the results page, so that I can keep checking the source material.
11. As a student, I want to see a Simple Chinese translation, so that difficult academic English is easier to understand.
12. As a student, I want the English and Chinese paragraphs displayed side by side, so that I can compare matching ideas paragraph by paragraph.
13. As a student, I want paragraph structure preserved in the result, so that I can follow the original essay organization.
14. As a student, I want the translation style to prioritize simple meaning over polished academic Chinese, so that comprehension is easier.
15. As a student, I want accounting and finance terms to be handled consistently, so that professional words are not treated only as general English.
16. As a student, I want important accounting and finance terms explained in simple Chinese, so that I can understand technical vocabulary while reading.
17. As a student, I want terminology explanations in a right sidebar, so that vocabulary help is available without interrupting the main comparison.
18. As a student, I want the terminology sidebar to be hideable, so that I can make more room for the bilingual reading area.
19. As a student, I do not want inline term highlighting inside paragraphs, so that the reading area remains clean.
20. As a student, I want the prototype to use a fixed predefined glossary of 30-50 accounting and finance terms, so that terminology behavior is predictable in the demo.
21. As a student, I want the sidebar to show only relevant glossary terms found in my pasted text when possible, so that the explanations feel connected to my reading.
22. As a student, I want the app to show a useful empty state if no glossary terms are detected, so that I understand why the sidebar has no terms.
23. As a student, I want key arguments shown as bullet points on the results page, so that I can quickly identify the most important ideas.
24. As a student, I want the analysis to explain the essay's logic in an accounting or finance context, so that I can understand how the argument is organized.
25. As a student, I want the analysis section visible below the bilingual translation or in a clear same-page panel, so that I can compare language, terminology, and logic together.
26. As a student, I do not want the analysis hidden in a separate route, so that I can keep the full reading support workflow in one place.
27. As a student, I want the analysis to support structure understanding only, so that it does not become assignment writing.
28. As a student, I want the app to avoid assignment-ready writing, so that the tool stays appropriate for academic integrity.
29. As a student, I want output to be read-only, so that the tool stays focused on reading support instead of editing or composing.
30. As a student, I want to manually copy visible output, so that I can use it in personal study notes.
31. As a student, I want my latest result to survive navigation between `/` and `/results`, so that I do not lose work during normal route changes.
32. As a student, I want my current result to survive a browser refresh during the same session, so that I can keep studying after accidental refresh.
33. As a student, I want the app to avoid permanent history storage, so that my pasted course reading is not saved as a library.
34. As a student, I want a clear privacy notice, so that I understand the browser-only prototype does not send or store my content on a server.
35. As a student, I want a clear accuracy disclaimer, so that I remember demo translation and analysis may be incomplete or incorrect.
36. As a student, I want the app to explain that demo output is mocked, so that I do not mistake it for production AI translation.
37. As a student using a laptop, I want the layout optimized for desktop reading, so that side-by-side comparison is comfortable.
38. As a student on a smaller laptop or desktop browser window, I want the layout to remain readable, so that content does not overlap during the demo.
39. As a student, I want an obvious way to return to the input page, so that I can test another passage.
40. As a student, I want a clear state when I visit `/results` without current session data, so that I know to paste text first.
41. As a course demonstrator, I want deterministic output, so that the prototype behaves consistently during classroom presentation.
42. As a course demonstrator, I want no API key requirement, so that the prototype can run reliably in the Codespace/demo environment.
43. As a course demonstrator, I want the implementation to be simple enough for business students to explain, so that the project supports learning rather than hiding complexity.

## Implementation Decisions

- Build the prototype as a React/Vite browser application.
- Use client-side routing with two routes: `/` for input and `/results` for the combined output screen.
- Keep routing minimal; do not add backend route handling or additional navigation structure beyond the two required views.
- Do not create separate `/translation` or `/analysis` routes.
- The `/results` page will combine the original English text, Simple Chinese translation, terminology explanations, and analysis in one reading workspace.
- Display original English and Simple Chinese translation side by side as the primary results area.
- Add a terminology sidebar on the right side of the results layout.
- Add the analysis section below the side-by-side translation or as a clearly visible same-page panel.
- Use bilingual English and Simplified Chinese UI labels, notices, and important messages.
- Keep processing fully in the browser for the university demo.
- Use deterministic mocked translation and analysis logic instead of a live AI API.
- Clearly label demo-generated output so users understand it is not production AI translation.
- Preserve paragraph boundaries by splitting pasted text into paragraphs and generating one translated demo paragraph per original paragraph.
- Use a fixed predefined glossary of 30-50 accounting and finance terms.
- Define the initial glossary during implementation using common accounting and finance terms suitable for undergraduate or postgraduate business readings.
- Match glossary terms against the pasted English text to decide which explanations appear in the sidebar.
- Do not highlight terms inline inside the English or Chinese paragraphs.
- Store the current input and generated result in `sessionStorage`.
- Treat `sessionStorage` as temporary browser-session state only; each new submission may replace the previous result.
- Do not use backend storage, user accounts, saved histories, or persistent essay libraries.
- Set the MVP input limit at 5,000 words.
- Block submission when the pasted text exceeds 5,000 words and show a clear bilingual error message.
- Show a clear empty state on `/results` when no session result exists.
- Make output read-only while allowing normal browser text selection and manual copying.
- Include a privacy notice explaining that the browser-only prototype does not send pasted text to a backend.
- Include an accuracy and demo disclaimer explaining that mocked output is for demonstration and should not be treated as verified translation.
- Include an academic integrity notice explaining that the tool supports reading comprehension and does not create assignment-ready writing.

## Testing Decisions

- Good tests should verify external behavior that a user can observe, not internal implementation details.
- Test the input form behavior, including empty input, valid input, word count display, and over-5,000-word blocking.
- Test that submitting valid input saves the current result in session storage and navigates to `/results`.
- Test that `/results` displays the original English text and matching translated paragraphs.
- Test that paragraph structure is preserved between source and demo translation output.
- Test that glossary terms from the predefined list appear in the terminology sidebar when present in the pasted text.
- Test that non-matching glossary terms are not shown as relevant detected terms.
- Test that the terminology sidebar can be hidden and shown.
- Test that the analysis section appears on the same `/results` page and is not accessed through a separate route.
- Test that analysis output uses bullet points and structure-focused language.
- Test that the route `/results` shows a paste-first empty state when session storage has no current result.
- Test that privacy, accuracy, demo, and academic integrity notices are visible.
- Test layout enough to ensure the interface remains readable on laptop and desktop browser widths.
- For the three-week prototype, prioritize a small number of workflow tests over broad unit test coverage.

## Out of Scope

- Real AI translation or analysis API integration.
- Backend server processing.
- API key management.
- User accounts.
- Saved essay history.
- Persistent database storage.
- PDF upload.
- Word document upload.
- PowerPoint upload.
- Website or article URL import.
- OCR or scanned document processing.
- Chinese-to-English translation.
- Traditional Chinese.
- Natural/polished Chinese translation mode.
- Editable translated output.
- Assignment paragraph generation.
- Citation generation.
- Flashcards, quizzes, or memorization tools.
- Course-specific custom vocabulary banks.
- Ambiguous term comparison.
- Full coverage of every accounting and finance subfield.
- Mobile-optimized layout.

## Further Notes

The prototype should be presented honestly as a university demo of the reading workflow, not as a finished translation product. The mocked output keeps the project reliable, explainable, and low risk for a classroom setting. Later versions could replace the deterministic mock processor with a real AI-backed translation and analysis service, but that would require new decisions about privacy, cost, prompt design, rate limits, and academic integrity controls.

The first implementation should favor clear structure and explainable modules: input validation, paragraph parsing, demo result generation, glossary matching, session storage, and results rendering. These are deep enough to test independently while still being understandable for business students.
