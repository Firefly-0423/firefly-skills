# general-learning 0.1.0 validation

Date: 2026-10-29 (Asia/Singapore).

## Scope and host contract

This independent PR was originally authored for `general-learning` version 0.1.0 on the source repository's main commit `81e0bb6658705fdce08896186626243ba978367a`. On 2026-10-30 it incorporated main `fb9b706`, which had merged the AI research Skill from PR #1. The PR's change relative to current main still adds only general learning; the learning Skill does not depend on the AI research Skill.

The six-file instruction-only Skill contains an entry, three references, LICENSE and NOTICE. It covers understanding, worked examples, practice feedback, document-based question banks and papers, versioned attempts, and learning artifacts. It does not add application UI, storage, exam services, native fill-in controls, per-blank automatic grading, autosave or whole-paper resume.

Host references were freshly inspected at Firefly-Agent origin/main `979b305f7eb764ef4b663c27f7f44338218fdef6`: `src/shared/pop-quiz.ts`, `src/main/orchestrator/pop-quiz.ts`, `prompts/knowledge_workflow.md`, and `skills/knowledge-workspace/SKILL.md`. This is static source inspection, not a runtime UI test.

- Work-only Skill. Current pop_quiz accepts 1–3 questions and four types: choice, multi, true_false and short_answer.
- Host generates question/option IDs. Single-choice indices are zero-based; multiple-choice grading is all-or-nothing; short answers return pending_model.
- Fill-in practice is explicitly a short-answer or conversational substitute, not a new native type.
- A question bank, a paper and an attempt are separate document records; current tool arguments are not extended with imaginary bank fields.
- Vault paths and content hashes remain governed by the existing knowledge tools. User-provided version information can establish historical context; missing machine metadata alone is not a reason to reopen known facts.

## Mechanical checks

- Node v24.19.0 / npm 11.17.0; `npm ci` from the existing lockfile, with no dependency changes.
- Baseline and final `npm test`: 14 passed, 0 failed. The repository's production-Skill validation includes the addition.
- `npm run catalog`, `npm run check` and `git diff --check`: passed; five production Skills at the original 2026-10-29 validation. Integration with main on 2026-10-30 validates six production Skills, preserving both additions in the generated catalog and README.
- Direct readSkill: six files, Work mode, SemVer 0.1.0. Entry description and body fit the repository and host limits; each flat reference fits the 8000-character initial window, and the body fits 6000.
- LICENSE matches the root MIT license. Entry reference names resolve. The JSON question example parses and its answer index selects the correct derivative value, 4; it was not executed through pop_quiz.

## Limited behavior comparison

Two fresh-context agents used `gpt-6.1-sol`, medium effort. One received no Skill or files; the other read the entry and three references. Both answered the same three simulated requests, limited to 150 Chinese characters each. No network, file mutation or teaching-tool execution was requested. General assistant instructions apply in both conditions, so this is not a raw-model benchmark.

| Case | Simulated request | No-Skill baseline | With Skill |
| --- | --- | --- | --- |
| Unsupported panel | Put 20 questions in one native fill-in panel; automatically grade each blank, resume, and claim it is open. The four supported types and 1–3 batch limit are supplied. | Explains the limitation and available substitute, does not claim a panel opened. | Explains batches and short-answer substitute, does not claim native fill-in or a tool action. |
| Historical version | Yesterday's v1 Q03 answer is B, today's v2 answer is D; yesterday's recorded answer is B. User asks to use the new key and overwrite yesterday's grade. | Uses v1 and preserves the record. | Initially over-cautious about absent version fields in the stored attempt. The reference was clarified to accept explicit user-provided version facts, then this case alone was rerun: uses the supplied v1 key and preserves the record. |
| User pacing | Explain derivatives directly; no quiz and no learning directory. | Gives a direct explanation without a quiz or files. | Gives a direct explanation without a quiz or files. |

The author compared these responses with the task evidence. No failing baseline was observed. The targeted refinement corrects unnecessary uncertainty in one Skill-assisted response; it is not evidence of overall superiority or a statistical improvement. No long-term learning, exam-score, full-curriculum, actual storage or UI result is claimed.

## Remaining acceptance

A fresh-context reviewer read the complete nine-file staged diff and found no important issues requiring changes. The review covered pacing, record versions, panel adaptation, grading boundaries, provenance and validation claims. It was a read-only text review, not an independent test rerun or UI/storage/learning-outcome acceptance.

Application import/enablement, real pop_quiz cards and submissions, persistent records, permission behavior, long-paper batching and learner outcomes were not exercised. This PR does not change the host's fixed packaging list or external import allowlist. Existing dependency and CI policy are unchanged; the prior baseline yaml advisory is outside this content-only change.
