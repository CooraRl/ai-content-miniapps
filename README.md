# AI Content Miniapps

**12 个可直接打开的 AI 内容类微信小程序模板，外加一个 Skill：你说一句话，AI 就能按同样的规范再生成一个。**

这些模板面向做 AI 新闻、AI 焦虑内容的创作者，也给零基础的开发学习者当作品集。数据先走本地示例 JSON，以后和 [CooraRl/daily-ai-news](https://github.com/CooraRl/daily-ai-news) 的 FastAPI、评分、钩子、封面草稿对接。

本仓库的组织方式参考了 [patch-gg/pixelfx](https://github.com/patch-gg/pixelfx)：先提供一批能用的现成作品，再用一个 Agent Skill 让别人（和未来的你）按同一套规范继续往上加。

## 作品画廊

| 模板 | 目录 | 这一页做什么 |
| --- | --- | --- |
| **今日 AI 快讯** | `today-ai-brief` | 用列表展示今日 AI 新闻，带摘要和吸睛 / 焦虑 / 相关三项评分。 |
| **AI 焦虑指数测试** | `anxiety-index-quiz` | 一套自我观察量表，给出 0–100 的焦虑指数和克制建议，不是心理诊断。 |
| **AI 会不会取代我的职业测试** | `job-replace-quiz` | 按方向和日常工作方式，给出「被辅助」风险等级，并强调这不是就业预测。 |
| **AI 新闻标题钩子生成器** | `hook-title-generator` | 为一条新闻展示焦虑型和反转型钩子，点按即可复制。 |
| **封面卡片预览** | `cover-card-preview` | 用叠字卡片预览抖音竖版 9:16 和 X 横版 16:9 封面，占位等待真实配图。 |
| **AI 工具导航** | `ai-tools-nav` | 按对话、图像视频、编程与智能体分类，展示常用 AI 工具并复制官网链接。 |
| **每日一个 AI 名词** | `daily-ai-term` | 每天轮换一个基础概念卡片，如 Token、RAG、Agent，适合做科普短内容。 |
| **AI 新闻问答（占位）** | `ai-news-qa` | 先用本地示例新闻做检索演示，预留对接 daily-ai-news 的 RAG 问答接口。 |
| **吸睛选题榜** | `hot-topic-board` | 按吸睛、焦虑、相关的加权分数排序，自动标出今日建议选题。 |
| **抖音脚本预览** | `douyin-script-preview` | 把钩子、摘要拼成口播分镜草稿，默认只生成文案，不自动发布。 |
| **AI 新闻日历** | `news-calendar` | 按日期浏览示例新闻，演示以后按天拉取历史数据的方式。 |
| **内容发布清单** | `publish-checklist` | 把选题、钩子、脚本、封面和人工确认串成发布前检查清单。 |

每个目录都是一个完整的原生小程序，包含 `app.js` / `app.json` / `app.wxss` 和对应页面文件，可单独导入。

## 快速开始

1. 安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
2. 选择「导入项目」，目录选本仓库里的一个模板，例如 `templates/today-ai-brief`。
3. AppID 使用测试号，或保持模板里的 `touristappid`（游客模式）。
4. 点击编译。你应该能看到深色卡片界面和本地示例数据。
5. 想换数据时，编辑该模板下的 `data/sample-news.js`，或把 `utils/api.js` 里的 `USE_REMOTE` 改为 `true`（需要已就绪的接口和合法域名）。

不需要安装 Node 依赖，也不需要任何 API 密钥。

## 用 Skill 生成自己的小程序

`skills/ai-miniapp/SKILL.md` 使用通用 Agent Skills 格式，兼容 Claude Code、Cursor、Codex、Grok Build 等会读取 `SKILL.md` 的工具。

复制技能目录：

```bash
# Claude Code
cp -R skills/ai-miniapp ~/.claude/skills/

# 其他工具：把该目录放到对应的 skills 文件夹，或直接在本仓库里对 Agent 说「请遵循 skills/ai-miniapp/SKILL.md」
```

然后用一句话提出需求，例如：

- 「做一个检查早报有没有写完的小程序。」
- 「复制封面预览模板，改成只做竖版抖音封面。」
- 「给问答页预留 daily-ai-news 的 /ask 接口，失败时退回本地示例。」

Skill 会要求 Agent 先复用现成模板，再按统一的文件结构、视觉约定和数据格式生成新目录，并做自检。规范细节见该文件。

## 与 daily-ai-news 的联动

[daily-ai-news](https://github.com/CooraRl/daily-ai-news) 负责抓取 AI 新闻，并在路线图中规划了 FastAPI 查询、大模型摘要、吸睛度 / 焦虑感 / 相关度评分、标题钩子、自动选题和封面图。本仓库负责把这些结果做成可触摸的小程序。

当前约定：

1. **现在**只读本地数据。根目录 `data/sample-news.json` 是规范示例，各模板内的 `data/sample-news.js` 与它保持同一结构。所有条目都是虚构示例，标题带「【示例】」，`is_sample` 为 `true`。
2. **以后** daily-ai-news 提供 `GET /news/today`（以及按日期筛选、`POST /ask`）时，把模板里 `utils/api.js` 的 `USE_REMOTE` 打开，并在微信公众平台配置 request 合法域名。
3. 字段对齐：`title`、`link`、`source`、`published`、`summary`、`scores.hook` / `scores.anxiety` / `scores.relevance`、`hook_titles`。完整说明在 [`data/schema.md`](data/schema.md)。
4. 选题排序建议：`hook * 0.4 + anxiety * 0.3 + relevance * 0.3`。
5. 封面和脚本在小程序里先用占位卡片和本地模板演示；真正的配图与口播草稿仍由 daily-ai-news 生成，并始终经过人工确认，**不会自动发布**。

## 内容与安全约定

- 不在仓库中存放密钥、密码、Token 或真实 `.env`。
- 不编造真实机构或真实事件的细节。示例数据只用于演示结构。
- 焦虑向文案点出普通人可能担心的变化，但不恐吓、不夸大。
- 测验结果不是心理诊断，也不是职业预测。

## 推荐的 GitHub Topics

`agent-skills` `wechat-miniprogram` `ai` `claude-code-skill` `grok` `miniprogram` `content-creation`

## 许可

[MIT](LICENSE)。欢迎直接使用、改作和开源你自己的模板。

作者：[Coora](https://github.com/CooraRl)（X [@XxCoora](https://x.com/XxCoora)）。
