const { loadNews } = require("../../utils/api.js");

function buildScript(item) {
  const hook = (item.hook_titles && item.hook_titles[0]) || item.title;
  const twist = (item.hook_titles && item.hook_titles[1]) || "";
  return {
    duration: 35,
    beats: [
      { label: "开头钩子 0-5 秒", text: hook },
      { label: "事件本身 5-15 秒", text: item.summary },
      { label: "和你的关系 15-28 秒", text: twist || "这件事真正值得注意的，是它可能改变哪一个日常步骤，而不是一个吓人的结论。" },
      { label: "结尾引导 28-35 秒", text: "这是示例草稿，不自动发布。如果你也在学着用 AI，把今天的一步做完比刷十条标题更重要。" },
    ],
  };
}

Page({
  data: { items: [], currentId: "", script: null },

  onLoad() {
    loadNews().then((feed) => this.setData({ items: feed.items || [] }));
  },

  pick(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.items.find((row) => row.id === id);
    this.setData({ currentId: id, script: buildScript(item) });
  },

  copy() {
    const script = this.data.script;
    if (!script) return;
    const nl = String.fromCharCode(10);
    const text = script.beats.map((b) => "【" + b.label + "】" + nl + b.text).join(nl + nl);
    wx.setClipboardData({ data: text });
  },
});
