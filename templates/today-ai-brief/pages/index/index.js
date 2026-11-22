const { loadNews } = require("../../utils/api.js");

Page({
  data: {
    items: [],
    itemCount: 0,
    generatedAt: "",
    timezone: "",
  },

  onLoad() {
    loadNews()
      .then((feed) => {
        const items = (feed.items || []).map((item) => ({ ...item, open: false }));
        this.setData({
          items,
          itemCount: items.length,
          generatedAt: (feed.generated_at || "").replace("T", " ").slice(0, 16),
          timezone: feed.timezone || "Asia/Shanghai",
        });
      })
      .catch((err) => {
        wx.showToast({ title: "数据加载失败", icon: "none" });
        console.error(err);
      });
  },

  toggle(e) {
    const id = e.currentTarget.dataset.id;
    const items = this.data.items.map((item) =>
      item.id === id ? { ...item, open: !item.open } : item
    );
    this.setData({ items });
  },
});
