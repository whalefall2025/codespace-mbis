---
name: write-a-prd
description: Create a Product Requirements Document (PRD) through a structured user interview, then write it to disk as PRD.md. Use this skill whenever the user wants to write a PRD, create a product requirements document, plan a new feature, define product requirements, document a product idea, or capture what a product should do and why. Trigger even when the user says "let's write up the requirements", "help me document this feature", "I want to plan out what we're building", or "can we define what this should do" — without explicitly mentioning "PRD".
---

A PRD is a living document that communicates the purpose, features, and functionality of a product. Its audience is stakeholders, designers, and product owners — not developers. **The PRD focuses on the Problem and the Solution, not the Code.**

Work through the five parts of the PRD in sequence, interviewing the user as you go (use the Ask User Questions tool). Ask follow-up questions until each section is genuinely clear. You can skip a section only if it truly doesn't apply (e.g., no regulatory constraints for a simple prototype).  Use the discover-requirements skill if needed.

## Part 1: The Why (Context & Purpose)

The goal of this section is to justify why the product exists. Ask:

- **Problem statement**: What specific issue are users facing? Push for a concrete, observable pain point — "users are dropping off at checkout" is useful; "checkout is bad" is not.
- **Target users**: Who are we building this for? Build a brief persona — their role, context, and what they need.
- **Success metrics**: How will you know the product succeeded? Push for measurable outcomes. "Increase checkout completion by 15%" is useful; "improve the experience" is not.

## Part 2: The What (Features & Scope)

The goal of this section is to define what the product will do — no more, no less. Ask:

- **Capabilities**: What should the product be able to do? Frame each capability as a user story: "As a [user], I want [feature], so that [benefit]." It should be a LONG, numbered list of user stories. This list of user stories should be extensive and cover all aspects of the capability.
- **Scope boundaries**: What is explicitly included? What is explicitly excluded? The "not this" list is as important as the "yes this" list.

Every feature should trace back to a problem named in Part 1. If a feature can't be justified that way, flag it — it may be out of scope.

## Part 3: The How it Feels (User Experience)

The goal of this section is to map the user's path through the product. Ask:

- **User journey**: Walk through the experience step by step, from first touch to goal achieved. Example: "Search → Select → Pay → Confirm." Identify important interactions and pain points to avoid. Capture expectations for ease, clarity, and convenience.
- **Acceptance criteria**: For each key feature, what is the "definition of done"? These must be specific and testable. Example: "The user receives an email confirmation within 30 seconds of purchase."

## Part 4: The Constraints

The goal of this section is to surface the rules and limits the product must stay within. Ask:

- **Regulatory / Legal**: Any compliance requirements? (GDPR, HIPAA, accessibility standards, local laws).  Skip for a prototype, but be sure to ask for a real product.
- **Platform & Standards**: What environments must it support? (mobile/desktop, browsers, operating systems)
- **Performance requirements**: Non-negotiable performance targets? (load time, uptime, concurrent users)
- **Assumptions & Risks**: What does the team believe to be true that hasn't been confirmed? What could cause problems if those beliefs are wrong? What is fixed and cannot be changed?

## Part 5: The Priorities (Delivery Plan)

The goal of this section is to give a simple picture of what gets built first. Ask:

- What must be in the first release (MVP)?
- What is valuable but can wait for a later release?
- What is the preferred order of work?

---

## Writing the PRD

Once the interview is complete, write the PRD using the template below. Use business language throughout — write for stakeholders, designers, and product owners. Avoid file paths, class names, API endpoints, database schemas, test frameworks, or any implementation detail. Those belong in a separate technical specification.

Save to disk as `PRD.md`.

<prd-template>

# [Product / Feature Name] — PRD

## 1. Context & Purpose

### Purpose & Problem Statement
A concise statement of what is being built and why. Name the specific problem and the observable pain point it causes.

### Target Users
Who are we building this for? Describe the user persona — their role, context, and needs.

### Goals & Success Metrics

| Goal | Metric | Target |
|------|--------|--------|
| [Goal] | [How measured] | [Specific target] |

---

## 2. Features & Scope

### User Stories

1. As a [actor], I want [feature], so that [benefit].

*(Include every significant capability. This list should be LONG and EXTENSIVE.)*

### Scope Boundaries

**In scope:**
- [Capability explicitly included]

**Out of scope:**
- [Capability explicitly excluded]

---

## 3. User Experience

### User Journey
A narrative of the experience from start to finish. Walk through the key steps, important interactions, and pain points to avoid. Include non-functional expectations (ease, clarity, speed).

### Acceptance Criteria
The "definition of done" for each key feature:

- **[Feature name]**: [Specific, testable condition]

---

## 4. Constraints

### Regulatory / Legal
[Any compliance requirements, or "None identified."]

### Platform & Standards
[Platforms and environments the product must support]

### Performance Requirements
[Non-negotiable performance targets, or "None identified."]

### Assumptions & Risks

| Assumption | Risk if wrong |
|-----------|--------------|
| [What the team believes to be true] | [What could go wrong] |

---

## 5. Priorities (Delivery Plan)

### Must-have (MVP)
The minimum set needed for the first release.

### Can wait
Capabilities that are valuable but can come later.

### Order of work
A simple sequence of what gets built first, second, etc.

---

## Further Notes
Any additional context not captured above.

</prd-template>
