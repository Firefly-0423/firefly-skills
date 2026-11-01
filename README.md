<p align="center"><b>简体中文</b> · <a href="#english">English</a></p>

# Firefly Skills

[Firefly](https://github.com/Firefly-0423/Firefly-Agent) 的 Skills 市场：教流萤做某类事情的说明与参考资料，以及校验它们的工具。

Skill 只有文字和参考文件，不含可执行程序。它能用哪些工具、能不能写文件，始终由 Firefly 的权限与审批决定。

## 在 Firefly 里安装

打开侧栏的 **技能** 面板，切到 **外部市场**，在 firefly-skills 来源里选择 Skill 安装。

- 只有经过静态审查、锁定到某次提交、内容摘要一致的版本才能安装。
- 装好后默认停用，由你决定在哪些模式里启用。
- 收录到本仓库不代表应用里已经安装或启用。

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

## 写一个 Skill

需要 Node.js 24。

```bash
npm ci
npm run new-skill trip-planner   # 生成 skills/trip-planner/
npm test                         # 校验全部 Skills
npm run catalog                  # 更新 .claude-plugin/marketplace.json
```

每个 Skill 放在 `skills/<id>/`：`SKILL.md`、`LICENSE`、`NOTICE.md`，可选 `references/`。目录文件 `.claude-plugin/marketplace.json` 与 anthropics/skills 的格式相同。`SKILL.md` 开头的 frontmatter：

```yaml
---
name: trip-planner          # 与文件夹同名，小写字母、数字和连字符
description: 什么时候用、什么时候不用（不超过 1024 字）
version: 0.1.0              # SemVer
modes: [work]               # 可选：chat / work / code，省略表示全部
effectKind: read            # 可选：read / mutation / verification / external_side_effect
---
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

The Skills market for [Firefly](https://github.com/Firefly-0423/Firefly-Agent): instructions and references that teach Firefly a kind of task, plus the tooling that validates them.

A Skill is text and reference files only, never executables. Which tools it may use and whether it may write files is always decided by Firefly's permissions and approvals.

## Install in Firefly

Open the **Skills** panel from the sidebar, switch to **External marketplace**, and install a Skill from the firefly-skills source.

- Only a statically reviewed version, pinned to a commit and matching its content digest, can be installed.
- It starts disabled; you choose the modes it is enabled in.
- Being in this repository does not install or enable a Skill in the app.

## Skills

| Skill | Use | Modes |
| --- | --- | --- |
| `ai-cs-research` | AI and computer science research: checking papers and citations, comparing literature, designing and reproducing experiments, and evidence-backed writing | Work, Code |
| `diagram` | When to hand-write an SVG study card instead of Mermaid, with colours, layout and render-side checks | Work, Code |
| `document-reader-validation` | For a document with a clear reader: checks the reader can understand the facts or complete the steps from it | Work |
| `general-learning` | General learning, worked examples and feedback on mistakes, question banks and papers from documents, adapted to the existing answer cards | Work |
| `jupyter-notebook` | Creating and editing experiment or tutorial notebooks: checks structure, keeps attachments and reports what actually ran | Work, Code |
| `knowledge-workspace` | Reading and writing a bound Obsidian vault: areas, section reads by heading and write checks | Work |
| `plugin-development` | Writing or debugging Firefly runtime plugins: manifest, tool registration, panels, packaging and acceptance | Work, Code |

## Write a Skill

With Node.js 24:

```bash
npm ci
npm run new-skill trip-planner   # creates skills/trip-planner/
npm test                         # validates every Skill
npm run catalog                  # updates .claude-plugin/marketplace.json
```

Each Skill lives in `skills/<id>/` with `SKILL.md`, `LICENSE`, `NOTICE.md` and optional `references/`. The catalog `.claude-plugin/marketplace.json` uses the anthropics/skills format. The frontmatter of `SKILL.md`:

```yaml
---
name: trip-planner          # same as the folder: lowercase letters, digits and hyphens
description: when to use it and when not to (at most 1024 characters)
version: 0.1.0              # SemVer
modes: [work]               # optional: chat / work / code; all when omitted
effectKind: read            # optional: read / mutation / verification / external_side_effect
---
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to submit and how Skills are reviewed.

## Validation

- `name` matches the folder, the description is non-empty and at most 1024 characters, the version is SemVer, and `modes` and `effectKind` use only values Firefly knows.
- A `LICENSE` is required; no symlinks, executables or scripts (`.exe`, `.ps1`, `.bat` and so on); files up to 512 KB and a Skill up to 4 MB.
- CI validates on Windows and Linux and checks the catalog against `skills/`.

## License

The tooling is [MIT](./LICENSE); each Skill follows the `LICENSE` in its folder; see [NOTICE](./NOTICE) for sources. Firefly and the Honkai: Star Rail characters and IP belong to HoYoverse / miHoYo; this is an unofficial, non-commercial fan project.
