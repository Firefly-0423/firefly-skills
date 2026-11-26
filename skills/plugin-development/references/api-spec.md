# Firefly 1.2.0 插件契约速查

以目标 Firefly 分支的 plugin-sdk/src/types.ts、plugin-sdk/README.md、docs/plugins/plugin-authoring.md 为准。

- 清单名是 firefly.plugin.json。使用 schemaVersion、id、name、version、sdk、description、author、license、main、native、permissions、tools。id 采用反向域名，至少三段，长度 6–64；author 是含 name 的对象。SDK 范围应包含目标版本，例如 ^1.2.0。
- 工具声明使用短 name、title、risk 数组和 modes 数组。模式为 work 或 code；Chat 不挂载插件工具。risk 按实际行为填写，不能用旧版 safe。权限、工具风险和执行行为分别核对。
- activate(ctx) 中用 ctx.tools.register 登记清单工具。注册时填写描述、参数约束、审批摘要和执行函数。响应采用 SDK 的 ToolResult。succeeded 有 output，failed 有 error，unknown 有 reason 并可写可能的副作用，not_executed 有 reason 且适用于未执行的情况。发生超时或中断且效果不明时，不擅自重试。
- 调用中使用 call.signal 处理取消；停用时释放自己创建的资源。启用插件会运行其进程代码，子进程边界不等于操作系统沙箱。
- 窗口、上下文、通知、渠道或定时任务等按目标 SDK 和实际宿主支持选用。查对应的清单声明及 SDK 类型；不要套用旧版 ctx.registerTool、deps 或插件主进程窗口代码。对缺失的宿主能力，如未提供的文件选择接口，给出实际限制。
- 开发与验证使用 @firefly_wu/plugin-sdk 及其 testing 入口。测试环境允许的操作不代表应用权限已授权。
