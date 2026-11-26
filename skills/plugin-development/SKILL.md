---
name: plugin-development
description: 为 Firefly 1.2.0 编写、迁移或调试运行时插件时使用。涵盖新版清单、工具注册、权限、窗口、测试、.ffplugin 打包和市场投稿。修改 Firefly 本体或使用已安装插件时无需加载。
version: 2.0.0
effectKind: mutation
modes:
  - work
  - code
---

# 开发 Firefly 1.2.0 插件

先确定一个用户可验证的功能和所需权限，再选择工具、窗口或其他宿主能力。以目标宿主版本和匹配的 SDK 类型为准；本技能面向 1.2.0，旧版插件需按新接口重写。保留用户原有安装和数据，1.2.0 宿主不会迁移旧版插件数据。

| 任务 | 参考文件 |
| --- | --- |
| 从清单到本地安装 | getting-started.md |
| 工具、权限、生命周期、界面契约 | api-spec.md |
| 最小示例和验收 | example-walkthrough.md |

用宿主的 read_skill_reference 时，按返回的清单传文件名。需要确认接口时，查目标分支的 plugin-sdk/README.md、plugin-sdk/src/types.ts 和 src/main/features/plugins/host/。

1. 编写 firefly.plugin.json，使用 schemaVersion: 1、反向域名 id、SDK 兼容范围和显式权限。工具、上下文和窗口需要按对应契约声明，实际注册与清单一致。
2. 入口实现 activate(ctx) 和必要的 deactivate(reason)。插件在独立子进程执行，启用意味着信任其代码。工具通过 ctx.tools.register 注册，执行结果按 SDK 的结构化状态返回。
3. 用 createTestHost 检查注册与调用，再用 firefly-plugin validate 和 pack 校验并生成 .ffplugin。模拟宿主不证明真实窗口、审批或进程生命周期正常。
4. 在隔离的 1.2.0 测试环境导入、启用并操作实际功能。核对权限提示、任务结果及停用后的资源回收。
5. 需要市场收录时按 Firefly-0423/firefly-plugins 的贡献指南提交源码。在线目录使用 apiVersion: 2，包来自该仓库的 Release，宿主校验 SHA-256。日常开发可用本地包验证。

记录插件版本、实际宿主版本、测试结果和包路径。只有亲自在应用内操作过的流程才能报告为宿主验收通过。
