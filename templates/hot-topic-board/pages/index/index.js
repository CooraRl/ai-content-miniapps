const { loadNews, overallScore } = require("../../utils/api.js");

Page({
  data: { items: [] },

  onLoad() {
    loadNews().then((feed) => {
      const items = (feed.items || [])
        .map((item) => ({ ...item, overall: overallScore(item).toFixed(1) }))
        .sort((a, b) => Number(b.overall) - Number(a.overall))
        .map((item, index) => ({ ...item, rank: index + 1 }));
      this.setData({ items });
    });
  },
});
