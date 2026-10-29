# Firefly general learning

Firefly-0423 maintains this MIT-licensed instruction-only workflow, version 0.1.0. It was independently written for general learning, practice, feedback and document-based question banks. No upstream Skill text, templates, scripts, model files, dependencies or credentials are bundled.

The teaching design was informed by the previously read Anthropic Learning mode and OpenAI learning and exam-study workflows. Their product capabilities are not implied to exist in Firefly:

- [Anthropic learning approach](https://www.anthropic.com/news/introducing-claude-for-education)
- [OpenAI learning workflow](https://learn.chatgpt.com/use-cases/learn-a-new-concept)
- [OpenAI exam study workflow](https://learn.chatgpt.com/use-cases/build-exam-study-system)

Host protocol and workspace compatibility were checked against Firefly-Agent commit `979b305f7eb764ef4b663c27f7f44338218fdef6`:

- [Quiz types](https://github.com/Firefly-0423/Firefly-Agent/blob/979b305f7eb764ef4b663c27f7f44338218fdef6/src/shared/pop-quiz.ts)
- [Quiz parsing and grading](https://github.com/Firefly-0423/Firefly-Agent/blob/979b305f7eb764ef4b663c27f7f44338218fdef6/src/main/orchestrator/pop-quiz.ts)
- [Knowledge workflow](https://github.com/Firefly-0423/Firefly-Agent/blob/979b305f7eb764ef4b663c27f7f44338218fdef6/prompts/knowledge_workflow.md)
- [Knowledge workspace Skill](https://github.com/Firefly-0423/Firefly-Agent/blob/979b305f7eb764ef4b663c27f7f44338218fdef6/skills/knowledge-workspace/SKILL.md)

These are static compatibility references, not an application UI or learning-effect validation. This Skill does not add an exam database, native fill-in controls, per-blank automatic grading, autosave or resume APIs. It does not require the separate AI research Skill, and repository inclusion does not install or enable it in an application.
