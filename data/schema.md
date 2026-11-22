# 新闻数据格式约定

这份文档定义小程序和 [CooraRl/daily-ai-news](https://github.com/CooraRl/daily-ai-news) 之间的 JSON 格式。小程序先读本地示例，以后再改为请求 FastAPI。

时区与 daily-ai-news 保持一致：默认 `Asia/Shanghai`（北京时间）。`published` 是给人看的字符串，`published_iso` 便于程序排序。

## 总原则

- 所有选题、摘要、评分和标题钩子都必须基于已抓取的新闻，**不捏造事实**。
- 本地演示数据必须带 `source: "local-sample"`，并且每条新闻 `is_sample` 为 `true`，标题建议加上「【示例】」。
- 分数使用 1–10，可保留一位小数。
- 不把 API 密钥写入任何 JSON 或代码。

## 根对象

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `generated_at` | string | 是 | 生成时间，ISO 8601，建议带 `+08:00` |
| `timezone` | string | 是 | 默认 `Asia/Shanghai` |
| `schema_version` | string | 建议 | 当前为 `"1.0"` |
| `source` | string | 是 | `local-sample` 或 `daily-ai-news` |
| `note` | string | 示例必填 | 示例数据需要说明「非真实新闻」 |
| `items` | array | 是 | 新闻数组，可以为空 |

完整示例见同目录的 `sample-news.json`。

## `items[]` 一条新闻

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | string | 是 | 稳定唯一 ID，建议 `sample-YYYYMMDD-序号` 或接口返回的主键 |
| `title` | string | 是 | 标题 |
| `link` | string | 是 | 原文链接 |
| `source` | string | 是 | 来源名称，与 daily-ai-news 的 `source` 对齐 |
| `published` | string | 是 | 可读时间，例如 `2026-11-22 09:30` |
| `published_iso` | string | 建议 | ISO 8601 |
| `summary` | string | 建议 | 中文摘要；尚未生成时可为空字符串 |
| `category` | string | 建议 | 建议取值：模型发布、产品应用、行业研究、政策监管、工具教程、其他 |
| `is_sample` | boolean | 示例必填 | 示例数据必须为 `true` |
| `scores` | object | 建议 | 三项评分，见下表；尚未评分时可省略 |
| `score_reasons` | object | 可选 | 三项分数的一句理由 |
| `hook_titles` | string[] | 建议 | 标题钩子，至少包含焦虑型、反转型各一条 |
| `hooks` | object[] | 可选 | 带类型的钩子，便于界面展示 |

## `scores`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `hook` | number | 吸睛度 1–10 |
| `anxiety` | number | 焦虑感 1–10，强调「会不会让普通人担心」，但文案本身不应恐吓 |
| `relevance` | number | 与普通人的相关度 1–10 |

选题排序建议与 daily-ai-news 路线图一致：

```
overall = hook * 0.4 + anxiety * 0.3 + relevance * 0.3
```

## `hooks[]`（可选，推荐）

```json
{ "type": "anxiety", "text": "你每天用的办公软件，开始替你写了" }
```

`type` 仅允许 `anxiety`（焦虑型）或 `twist`（反转型）。如果只有 `hook_titles`，约定第 1 条为焦虑型，第 2 条为反转型。

## 以后对接 FastAPI

daily-ai-news 在 V0.4 及以后预计提供：

- `GET /health` 健康检查
- `GET /news/today` 当天新闻，响应为本文件的根对象
- `GET /news?date=2026-11-22&source=...` 按日期或来源筛选
- `POST /ask`（V0.6）问答，请求 `{ "question": "..." }`，响应应包含 `answer` 和带 `title` / `link` 的出处

微信小程序一旦改为请求远程接口，需要在公众平台配置 request 合法域名，并把各模板 `utils/api.js` 里的 `USE_REMOTE` 设为 `true`。未配置密钥或接口不可用时，必须回退到本地示例数据，不能让页面空白。
