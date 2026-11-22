const { loadNews } = require("../../utils/api.js");

Page({
  data: { items: [], currentId: "", current: null },

  onLoad() {
    loadNews().then((feed) => {
      this.setData({ items: feed.items || [] });
    });
  },

  pick(e) {
    const id = e.currentTarget.dataset.id;
    const current = this.data.items.find((item) => item.id === id);
    this.setData({ currentId: id, current });
  },

  copy(e) {
    const text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success() {
        wx.showToast({ title: "已复制钩子", icon: "none" });
      },
    });
  },
});
