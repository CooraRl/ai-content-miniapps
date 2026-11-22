const { loadNews } = require("../../utils/api.js");

Page({
  data: { items: [], currentId: "", current: null, ratio: "9:16", headline: "" },

  onLoad() {
    loadNews().then((feed) => {
      const items = feed.items || [];
      this.setData({ items });
      if (items[0]) this.pick({ currentTarget: { dataset: { id: items[0].id } } });
    });
  },

  setRatio(e) {
    this.setData({ ratio: e.currentTarget.dataset.ratio });
  },

  pick(e) {
    const id = e.currentTarget.dataset.id;
    const current = (this.data.items || []).find((item) => item.id === id);
    if (!current) return;
    const headline = (current.hook_titles && current.hook_titles[0]) || current.title;
    this.setData({ currentId: id, current, headline });
  },
});
