const { loadNews } = require("../../utils/api.js");

const STEPS = [
  { id: "pick", label: "已确认选题来自真实/示例新闻，没有新编情节" },
  { id: "hook", label: "已选好标题钩子，并检查不过度恐吓" },
  { id: "script", label: "已改完 X 帖或抖音脚本草稿" },
  { id: "cover", label: "已确认封面文字清楚，且和事实一致" },
  { id: "human", label: "已人工通读，可以准备发布（仍由你手动发出）" },
];

Page({
  data: { items: [], titles: [], current: null, steps: STEPS, checked: {}, doneCount: 0 },

  onLoad() {
    loadNews().then((feed) => {
      const items = feed.items || [];
      this.setData({ items, titles: items.map((item) => item.title) });
    });
    const checked = wx.getStorageSync("publishChecklist") || {};
    this.setData({ checked });
    this.updateCount(checked);
  },

  onPick(e) {
    const current = this.data.items[Number(e.detail.value)];
    this.setData({ current });
  },

  toggle(e) {
    const id = e.currentTarget.dataset.id;
    const checked = { ...this.data.checked, [id]: !this.data.checked[id] };
    this.setData({ checked });
    wx.setStorageSync("publishChecklist", checked);
    this.updateCount(checked);
  },

  updateCount(checked) {
    const doneCount = STEPS.filter((step) => checked[step.id]).length;
    this.setData({ doneCount });
  },
});
