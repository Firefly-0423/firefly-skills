# 投稿与审核 / Contributing

## 投稿流程

1. Fork 本仓库，运行 `npm ci`，再用 `npm run new-skill <id>` 生成 `skills/<id>/`。`<id>` 只用小写字母、数字和连字符，且不能与现有 Skill 重名。
2. 在 `SKILL.md` 里写清什么时候用、什么时候不用，以及具体步骤和完成后的核对方法；较长的资料放进 `references/`。
3. 在 `NOTICE.md` 写明维护者和来源，放上 `LICENSE`。
4. 运行 `npm test` 和 `npm run catalog`，把更新后的 `.claude-plugin/marketplace.json` 一起提交。
5. 发起 PR，按模板勾选自查项。CI 会在 Windows 和 Linux 上校验。

## 审核标准

- **只写说明，不带程序**：Skill 是给流萤的指引，不接受可执行文件、脚本或下载并执行的内容。
- **不放宽权限**：Skill 不能要求跳过审批、绕过权限档位或冒充用户授权；需要写文件或联网的步骤要写明，由宿主审批。
- **描述准确**：`description` 决定流萤何时加载它，要写清适用和不适用的场景。
- **许可清楚**：必须带 `LICENSE`；改编自他人的内容要保留原作者的版权声明，并在 `NOTICE.md` 中注明来源。
- **版本递增**：修改已有 Skill 时提升 `version`（SemVer）。

## Contributing (English)

1. Fork, `npm ci`, then `npm run new-skill <id>` (lowercase letters, digits and hyphens; must be unique).
2. In `SKILL.md`, say when to use it and when not to, the steps, and how to check the result; put longer material in `references/`.
3. Name the maintainer and sources in `NOTICE.md` and include a `LICENSE`.
4. Run `npm test` and `npm run catalog`, and commit the regenerated `.claude-plugin/marketplace.json`.
5. Open a PR and complete the checklist. CI validates on Windows and Linux.

Review rules: instructions only (no executables or scripts), never ask to skip approvals or widen permissions, an accurate description, a clear license with upstream notices kept, and a version bump for every change.
