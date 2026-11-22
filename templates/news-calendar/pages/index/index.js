const { loadNews } = require("../../utils/api.js");

function dateOf(item) {
  return (item.published || item.published_iso || "").slice(0, 10);
}

Page({
  data: { dates: [], currentDate: "", dayItems: [], all: [] },

  onLoad() {
    loadNews().then((feed) => {
      const all = feed.items || [];
      const dates = Array.from(new Set(all.map(dateOf).filter(Boolean))).sort().reverse();
      this.setData({ all, dates, currentDate: dates[0] || "" });
      this.refresh();
    });
  },

  pickDate(e) {
    this.setData({ currentDate: e.currentTarget.dataset.date });
    this.refresh();
  },

  refresh() {
    const dayItems = this.data.all.filter((item) => dateOf(item) === this.data.currentDate);
    this.setData({ dayItems });
  },
});
