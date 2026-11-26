# 从清单到本地安装

1. 用与目标宿主匹配的 @firefly_wu/plugin-sdk 1.2.0 开发。若本地需要验证尚未发布的 SDK，在 Firefly 源码根目录按 SDK README 先构建，再打包。使用打包命令实际返回的包路径。

   - 构建：pnpm run build:plugin-sdk
   - 打包：npm pack ./plugin-sdk
2. 在插件目录创建 firefly.plugin.json 和入口文件。清单字段和值以 SDK 及宿主校验为准。插件入口可以使用普通 JavaScript 对象，确保部署包的运行时依赖随包提供。SDK CLI 不会把 node_modules 加进归档。
3. 在已安装对应 SDK 的开发环境运行以下命令。把路径和版本替换为实际值，包放在插件源码目录之外。

```sh
npx firefly-plugin validate ./my-plugin --host-version 1.2.0
npx firefly-plugin pack ./my-plugin -o ./dist/my-plugin-1.0.0.ffplugin --host-version 1.2.0
```

4. 在 Firefly 1.2.0 的插件页导入 .ffplugin，查看清单和权限，明确启用后测试。测试升级时，先用专门的测试数据确认新版本策略，避免操作用户正式数据。
5. 投稿前检查 firefly-plugins 仓库的 CONTRIBUTING.md 和 schema/host-contract.json。市场要求 native: false、可读代码、许可证和能力说明。按插件仓库流程生成目录和包，新发布版本须增加版本号。

导入失败时，先查真实错误、SDK 范围、清单字段及包内入口。启用失败时检查入口导出、运行时依赖和声明是否一致；工具不出现时检查声明的模式、插件状态和实际权限。
