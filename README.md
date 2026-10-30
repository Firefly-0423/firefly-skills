<p align="center"><b>简体中文</b> · <a href="#english">English</a></p>

# Firefly Skills

这是 [Firefly](https://github.com/Firefly-0423/Firefly-Agent) 的 Skills 仓库：教流萤做某类事情的说明与参考资料，以及校验它们的工具。Skill 只是文字和参考文件，不含可执行程序；它能用哪些工具、能不能写文件，始终由 Firefly 的权限与审批决定。

## 目录格式

| 内容 | 位置 |
| --- | --- |
| 目录 | `.claude-plugin/marketplace.json`（与 anthropics/skills 相同的格式） |
| Skill | `skills/<id>/`：`SKILL.md`、`LICENSE`、`NOTICE.md`，可选 `references/` |

`SKILL.md` 开头的 frontmatter：

```yaml
---
name: trip-planner          # 与文件夹同名，小写字母、数字和连字符
description: 什么时候用、什么时候不用（不超过 1024 字）
version: 0.1.0              # SemVer
modes: [work]               # 可选：chat / work / code，省略表示全部
effectKind: read            # 可选：read / mutation / verification / external_side_effect
---
```

## 现有 Skills

| Skill | 用途 | 模式 |
| --- | --- | --- |
| `ai-cs-research` | AI／计算机科研：论文与引用核验、文献比较、实验设计与复现，以及证据驱动写作 | Work、Code |
| `diagram` | 何时手写 SVG 学习卡片而非 Mermaid，配色、排版与渲染端校验 | Work、Code |
| `document-reader-validation` | 文档面向明确读者时，核对读者能否据此理解事实或完成操作 | Work |
| `general-learning` | 通用学习、例题与错因反馈、文档题库和组卷，以及现有作答面板的适配 | Work |
| `jupyter-notebook` | 创建和编辑实验／教程 Notebook，检查结构、保留附件并说明实际执行状态 | Work、Code |
| `knowledge-workspace` | 读写已绑定的 Obsidian 知识库时的分区、按标题取段与写入校验 | Work |
| `plugin-development` | 为流萤编写或调试运行时插件：manifest、工具注册、面板、打包与验收 | Work、Code |

`general-learning` 可整理题库、试卷与带版本的作答记录。面板练习沿用当前宿主每批 1–3 题的单选、多选、判断和简答能力；填空可明确作为简答练习，不增加原生分空控件、按空自动判分或全卷续答接口。收录到本仓库不代表应用中已安装或启用。

## 写一个 Skill

需要 Node.js 24。

```bash
npm ci
npm run new-skill trip-planner   # 生成 skills/trip-planner/
npm test                         # 校验全部 Skills
npm run catalog                  # 更新 .claude-plugin/marketplace.json
```

投稿流程和审核标准见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 校验规则

- `name` 与文件夹同名，描述非空且不超过 1024 字，版本号符合 SemVer，`modes` 与 `effectKind` 只能取 Firefly 认识的值。
- 必须带 `LICENSE`；不允许符号链接、可执行文件或脚本（`.exe`、`.ps1`、`.bat` 等），单个文件不超过 512 KB，整个 Skill 不超过 4 MB。
- CI 在 Windows 和 Linux 上运行校验，并核对目录文件与 `skills/` 一致。

## 许可

仓库工具采用 [MIT License](./LICENSE)，每个 Skill 以自己目录里的 `LICENSE` 为准，来源说明见 [NOTICE](./NOTICE)。流萤及《崩坏：星穹铁道》相关角色与知识产权归 HoYoverse / 米哈游所有，本项目为非官方、非商业的同人项目。

---

<a id="english"></a>

# Firefly Skills

The Skills repository for [Firefly](https://github.com/Firefly-0423/Firefly-Agent): instructions and references that teach Firefly a kind of task, plus the tooling that validates them. A Skill is text and reference files only, never executables; which tools it may use and whether it may write files is always decided by Firefly's permissions and approvals.

**Layout.** The catalog is `.claude-plugin/marketplace.json` (the anthropics/skills format). Each Skill lives in `skills/<id>/` with `SKILL.md`, `LICENSE`, `NOTICE.md` and optional `references/`. Frontmatter: `name` (same as the folder), `description` (at most 1024 characters), `version` (SemVer), optional `modes` (`chat`, `work`, `code`) and `effectKind` (`read`, `mutation`, `verification`, `external_side_effect`).

**Skills.** `ai-cs-research`, `diagram`, `document-reader-validation`, `general-learning`, `jupyter-notebook`, `knowledge-workspace` and `plugin-development`.

`jupyter-notebook` adapts OpenAI's Apache-2.0 guidance for experiments and tutorials to Firefly's instruction-only format. It covers creating/editing .ipynb files, preserving existing cells and attachments, structure validation and honest execution reporting. It bundles no scripts, templates or kernels and does not install or enable an application editor.

`ai-cs-research` supports AI and computer science paper reading, literature and citation checks, experiment design and reproduction, and evidence-backed writing. Its references cover papers and evidence, experiments and evaluation (including LLM, RAG and Agent tasks), and writing and review. It uses the host's existing tools and permissions; adding it to this catalog does not install or enable it in the Firefly app.

`general-learning` supports understanding, worked examples, practice feedback, document-based question banks, papers and versioned attempts. It adapts to the current host's 1–3-question batches and existing choice, multiple-choice, true/false and short-answer cards. Fill-in practice can use short-answer input; the Skill does not add native per-blank controls, automatic per-blank grading or whole-exam resume APIs. Repository inclusion does not install or enable it in the app.

**Develop.** With Node.js 24: `npm ci`, `npm run new-skill <id>`, `npm test`, `npm run catalog`. See [CONTRIBUTING.md](./CONTRIBUTING.md).

**Rules.** A license is required; no symlinks, executables or scripts; files up to 512 KB and Skills up to 4 MB. CI validates on Windows and Linux and checks the catalog against `skills/`.

**License.** Tooling is [MIT](./LICENSE); each Skill follows the `LICENSE` in its folder; see [NOTICE](./NOTICE). Firefly and Honkai: Star Rail IP belong to HoYoverse / miHoYo; this is an unofficial, non-commercial fan project.
