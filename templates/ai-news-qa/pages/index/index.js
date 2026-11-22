const { loadNews } = require("../../utils/api.js");

const EXAMPLES = ["办公软件有什么变化？", "创作者平台怎么处理自动发布？", "有哪些和职业变化有关的示例？"];

Page({
  data: { question: "", examples: EXAMPLES, answer: "", sources: [], items: [] },

  onLoad() {
    loadNews().then((feed) => this.setData({ items: feed.items || [] }));
  },

  onInput(e) {
    this.setData({ question: e.detail.value });
  },

  useExample(e) {
    this.setData({ question: e.currentTarget.dataset.text });
    this.ask();
  },

  ask() {
    const q = (this.data.question || "").trim();
    if (!q) {
      wx.showToast({ title: "请先输入问题", icon: "none" });
      return;
    }
    // 占位检索：按标题和摘要做简单包含匹配，不是真正的向量检索。
    const tokens = q.replace(/[？?，,。！!]/g, " ").split(/\s+/).filter((w) => w.length >= 2);
    const scored = this.data.items
      .map((item) => {
        const text = `${item.title} ${item.summary} ${item.category}`;
        const hits = tokens.filter((t) => text.includes(t)).length;
        return { item, hits };
      })
      .filter((row) => row.hits > 0)
      .sort((a, b) => b.hits - a.hits)
      .slice(0, 3)
      .map((row) => row.item);

    const sources = scored.length ? scored : this.data.items.slice(0, 2);
    const answer = scored.length
      ? "这是占位回答：我在本地示例新闻里找到了和问题相关的条目，并据此做一个克制的说明。等 RAG 接口接上后，这里会返回带出处的模型回答，而不是关键词匹配。"
      : "这是占位回答：本地示例里没有很直接的匹配。下面列出两条最近的示例新闻作为参考。真正的问答需要 daily-ai-news 的检索接口。";
    this.setData({ answer, sources });
  },
});
