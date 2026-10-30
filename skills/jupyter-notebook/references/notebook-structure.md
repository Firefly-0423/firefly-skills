# Notebook 结构与安全编辑

由 OpenAI notebook-structure.md 改编；Firefly 版移除脚本和模板路径依赖，增加格式与历史输出保护。

Notebook 顶层是 JSON 对象，包含 nbformat、nbformat_minor、metadata 和有序 cells。已有文件保留其实际格式版本，不能仅为套用示例而无声升级或降级。

新建时使用当前可用编辑工具或 nbformat。没有相关库也可以通过 JSON 序列化生成有效文档，不手工拼接转义字符串。Notebook 4.5 的单元格需要符合规范的唯一 id；4.x 的 Markdown 与代码单元均有 cell_type、metadata、source，代码单元另有 execution_count 与 outputs。新建的未执行代码单元用 null 和空数组。source 可按所用库的合法形式序列化，不将数组和字符串盲目互换。

以下仅为未执行的最小 Python Notebook 示例；不是技能随包模板，也不是执行结果：

```json
{"nbformat":4,"nbformat_minor":5,"metadata":{"language_info":{"name":"python"}},"cells":[{"id":"intro","cell_type":"markdown","metadata":{},"source":["# 求和示例\n","运行下一单元可计算三个数的和。"]},{"id":"sum-demo","cell_type":"code","metadata":{},"source":["values = [1, 2, 3]\n","sum(values)"],"execution_count":null,"outputs":[]}]}
```

语言／内核元数据反映用户环境的实际选择，未知语言版本不编造为 3.12；没有确认可用内核时，不声称 kernelspec 一定能启动。选用 nbformat.validate 等正式校验器时，区分结构错误、建议和执行缺口。

修改已有文件前读取实际内容，识别 Markdown、代码、raw 单元、附件、输出与扩展元数据。保留未涉及的单元顺序、id、图片 attachments、用户元数据、语言和内核设置；可以改进叙述，但不无关重写整个文件。只读或建议任务不写盘。

代码或数据改变后，下游旧输出可能失效；不能只清修改单元的计数，却把依赖它的旧数字当作新结果。需要保留历史时采用用户认可的副本或明确状态标注；只改善排版时保持历史输出并标明没有重跑。

新目标存在时默认不覆盖，选择用户认可的新路径或有界修改。包含敏感输出、附件或凭据时按实际请求处理，不擅自删除用户数据，也不发送给额外服务。记录写入失败与冲突，不冒称文件已保存。
