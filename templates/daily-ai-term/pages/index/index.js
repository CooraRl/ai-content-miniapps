const glossary = require("../../data/glossary.js");

function indexForToday(length) {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / 86400000);
  return day % length;
}

Page({
  data: { terms: [], term: {}, index: 0, total: 0 },

  onLoad() {
    const terms = glossary.terms || [];
    const index = terms.length ? indexForToday(terms.length) : 0;
    this.setData({ terms, total: terms.length, index, term: terms[index] || {} });
  },

  prev() {
    const total = this.data.total;
    if (!total) return;
    const index = (this.data.index - 1 + total) % total;
    this.setData({ index, term: this.data.terms[index] });
  },

  next() {
    const total = this.data.total;
    if (!total) return;
    const index = (this.data.index + 1) % total;
    this.setData({ index, term: this.data.terms[index] });
  },
});
