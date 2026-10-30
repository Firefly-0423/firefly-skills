# Firefly Jupyter Notebook adaptation

Firefly-0423 maintains version 0.1.0 of this adaptation of OpenAI's Jupyter Notebook Skill and four reference documents. The adapted files are distributed under the accompanying Apache License 2.0, preserving the upstream license text.

Source: openai/skills, commit `49f948faa9258a0c61caceaf225e179651397431`, directory `skills/.curated/jupyter-notebook/`.

- [Original Skill and resources](https://github.com/openai/skills/tree/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/jupyter-notebook)
- [Upstream license](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/jupyter-notebook/LICENSE.txt)

Changes made on 2026-10-31: rewrote the entry and references in Chinese for Firefly; added version, Work/Code modes and effect metadata; removed dependency on CODEX_HOME, bundled Python helpers and notebook templates; documented generation through existing authorized tools, non-overwrite editing, attachment/metadata preservation, unavailable kernels, stale outputs, and bounded validation claims.

The upstream Python helper and .ipynb templates were inspected but are not redistributed. This package contains instructions and references only. Notebook files and task-specific code are produced in a user-authorized workspace when requested, not bundled as executable resources in this Skill. No new tool, kernel, account connection, dependency or application editor is installed or enabled by repository inclusion.
