---
name: ai-miniapp
description: 用本仓库的原生微信小程序模板规范，根据一句话需求生成一个可在微信开发者工具中打开的新 AI 内容小程序（今日快讯、焦虑测评、职业测试、标题钩子、封面预览、工具导航、名词科普、新闻问答、选题榜、脚本草稿等）。先复用已有模板，再按统一的文件结构、深色卡片风格和 daily-ai-news JSON 数据约定产出新目录。适用于 Claude Code、Cursor、Codex、Grok Build 等支持 Agent Skills 的工具。在用户提到微信小程序、小程序模板、AI 焦虑内容、新闻助手前端，或说「做一个某某小程序」时使用。
license: MIT
compatibility: 兼容 Claude Code、Cursor、Codex、Grok Build 及其他读取 SKILL.md 的 Agent。预览需要微信开发者工具；不需要密钥。
---

# AI 内容小程序生成技能

本技能把「一句话需求」变成一个**最小、可打开的原生微信小程序目录**。现成作品在 `templates/` 里，数据格式在 `data/schema.md`。生成新项目时，把代码当粘土来用：先找最接近的模板，复制结构，再改页面，而不是从空目录自由发挥。

配套后端是 [CooraRl/daily-ai-news](https://github.com/CooraRl/daily-ai-news)。小程序先读本地示例 JSON，以后再接 FastAPI。

## 开始之前

1. 在本仓库里工作。如果当前目录没有 `templates/` 和 `data/schema.md`，先克隆：
   `git clone https://github.com/CooraRl/ai-content-miniapps`
2. 先浏览已有模板，能改的就改，不要重复造一个几乎一样的项目。
3. **不要写入 API 密钥、AppSecret、密码或真实用户数据。** AppID 使用 `touristappid`。
4. 新闻类数据必须符合 `data/schema.md`。示例必须标注 `is_sample: true`，不捏造真实新闻细节。

## 1. 先找已有模板

根据用户一句话，对号入座：

| 用户大概想要 | 先打开 |
| --- | --- |
| 今日新闻列表、简报、信息流 | `templates/today-ai-brief` |
| 测焦虑、心理感受、刷 AI 新闻会不会慌 | `templates/anxiety-index-quiz` |
| 我会不会被取代、岗位风险 | `templates/job-replace-quiz` |
| 标题、钩子、文案开头 | `templates/hook-title-generator` |
| 封面、海报、竖版横版配图 | `templates/cover-card-preview` |
| 工具清单、导航、官网集合 | `templates/ai-tools-nav` |
| 名词解释、每天学一个概念 | `templates/daily-ai-term` |
| 问新闻、RAG、智能问答 | `templates/ai-news-qa` |
| 选题榜、什么值得做内容 | `templates/hot-topic-board` |
| 抖音口播、分镜脚本 | `templates/douyin-script-preview` |
| 按日期看新闻 | `templates/news-calendar` |
| 发布前检查、防止自动发出 | `templates/publish-checklist` |

如果 80% 能复用某个模板，就复制该目录再改名，不要从零生成所有样板文件。

## 2. 文件结构规范

每个新小程序必须是一个**可独立导入**的目录，建议放在 `templates/<英文短横线 id>/`：

```
templates/<id>/
  app.js
  app.json
  app.wxss
  project.config.json    # appid 使用 touristappid
  sitemap.json
  pages/index/index.wxml
  pages/index/index.wxss
  pages/index/index.js
  pages/index/index.json
  data/sample-news.js    # 若页面用到新闻；用 module.exports
  data/*.js              # 测验、词条等额外本地数据
  utils/api.js           # 本地 / 远程切换，默认 USE_REMOTE = false
```

约定：

- 只用原生小程序，不引入 npm 组件库，不写云函数，不写服务端密钥。
- `app.json` 的 `pages` 必须注册全部页面；`window` 使用深色导航栏（`#0B0F14`，白字）。
- `project.config.json` 的 `projectname` 等于目录名，`compileType` 为 `miniprogram`，`urlCheck` 可为 `false` 方便本地预览。
- 页面尽量保持一页能用；结果页、详情页可以后加，但必须同步注册。
- 图片用 CSS 渐变或色块占位，不要引用仓库里不存在的 png。
- 数据文件用 `.js` + `module.exports`，以便微信开发者工具 `require`；如果同时提供 JSON，必须和 JS 内容一致且合法。

## 3. 组件与视觉约定

复用 `app.wxss` 里的变量，不要另起一套高饱和花哨风格：

- 背景 `--bg: #0B0F14`，卡片 `--card: #161C24`，描边 `--line: #2A3544`
- 正文 `--text: #E8EEF5`，次要文字 `--muted: #8A97A8`
- 主强调 `--accent: #5B8CFF`，吸睛 `--hook: #FFB020`，焦虑 `--anxiety: #FF6B4A`，正向 `--good: #3DDC97`
- 卡片圆角约 `20rpx`，页面左右留白 `32rpx`，底部加上安全区
- 三类分数用对应颜色的小标签：吸睛 / 焦虑 / 相关
- 文案用中文，语气克制，不恐吓、不制造虚假紧迫感
- 凡是示例数据，页面顶部用 banner 写明「示例，非真实新闻」

常用 class：`page`、`eyebrow`、`h1`、`lead`、`card`、`title`、`meta`、`chips`、`chip`、`btn`、`banner`。

## 4. 数据接口约定

新闻对象至少包含：`id`、`title`、`link`、`source`、`published`、`summary`、`scores.hook`、`scores.anxiety`、`scores.relevance`、`hook_titles`。完整字段见 `data/schema.md`。

加载逻辑写在 `utils/api.js`：

1. 默认 `USE_REMOTE = false`，`require` 本地 `data/sample-news.js`
2. 远程开启后请求 `GET {API_BASE}/news/today`，响应必须是 schema 根对象
3. 远程失败时回退本地示例，并用 `wx.showToast` 提示，不能让页面空白
4. 选题排序：`hook * 0.4 + anxiety * 0.3 + relevance * 0.3`
5. 问答类页面预留 `POST /ask`，在接上之前只能做本地占位检索，并写清楚这是占位

时区按 `Asia/Shanghai` 显示。不要把真实密钥写进 `API_BASE` 以外的任何地方；`API_BASE` 也只放网址，不放 token。

## 5. 根据一句话生成新目录

1. **把需求写成一行规格**：做什么、谁用、有哪 1–3 个关键界面、数据从哪里来。
2. **复制最近的模板目录**，改 `project.config.json` 的 `projectname`、`app.json` 的标题，以及页面文案。
3. **只改需要变化的部分。** 公共样式、`utils/api.js`、示例新闻结构保持不动。
4. **本地数据保持克制。** 新闻必须是示例；工具导航可以写公开产品名和官网；测验必须带「不是诊断 / 不是预测」的说明。
5. **生成后按下面的清单自检。** 有 JSON 就用 `python3 -m json.tool` 或等价方式校验。
6. **告诉用户怎么打开：** 用微信开发者工具导入新目录，AppID 选测试号或游客模式。

如果用户只是想改数据源，不要新建模板，只帮他改 `USE_REMOTE` 和 `API_BASE`，并提醒配置合法域名。

## 6. 自检清单

- [ ] 目录包含 `app.js` / `app.json` / `app.wxss` / `project.config.json`，可被微信开发者工具导入
- [ ] `app.json` 已注册全部页面，没有悬空的 `navigateTo`
- [ ] AppID 为 `touristappid`，仓库中无密钥、无真实 `.env`、无用户隐私
- [ ] 新闻数据符合 `data/schema.md`，示例带 `is_sample: true` 或同等说明
- [ ] 所有 `.json` 能被解析（无注释、无尾逗号）
- [ ] 中文注释和中文界面齐全，示例 banner 已标明数据性质
- [ ] 使用统一色板和卡片风格，无缺失图片引用
- [ ] `USE_REMOTE` 默认为 `false`；远程失败有回退
- [ ] 文案不恐吓、不编造真实事件，发布类能力不会自动发到外部平台
- [ ] README 或提交说明里提到了新模板的目录名和一句话用途

## 7. 参考示例

### 示例 A：一句话做出新模板

用户说：「做一个检查早报有没有写完的小程序。」

做法：复制 `templates/publish-checklist` 为 `templates/morning-brief-check/`。把步骤改成「已抓取今日新闻 / 已挑 3 条选题 / 已写 1 条 X 草稿 / 已写 1 条抖音脚本 / 已人工确认」。选题列表仍从 `loadNews()` 读取。页面顶部保留示例数据说明。不要新增网络请求。

### 示例 B：把问答占位接到以后的接口

用户说：「问答页以后要打 daily-ai-news 的 /ask。」

做法：打开 `templates/ai-news-qa/pages/index/index.js`，把 `ask()` 里「本地关键词匹配」抽成 `askLocal()`，再增加 `askRemote()`：`wx.request({ url: API_BASE + "/ask", method: "POST", data: { question } })`。只有 `USE_REMOTE === true` 且配置了 `API_BASE` 时才走远程；失败则回退 `askLocal()`，并提示「正在使用本地示例」。不要在代码里写密钥，也不要假装已经返回了真实模型答案。
