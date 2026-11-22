const quiz = require("../../data/quiz.js");
const { loadNews } = require("../../utils/api.js");

Page({
  data: { quiz, answers: {}, done: false, score: 0, level: "", advice: "", color: "#ffb020", related: "" },

  choose(e) {
    const { qid, value } = e.currentTarget.dataset;
    this.setData({ [`answers.${qid}`]: value });
  },

  submit() {
    const questions = quiz.questions;
    if (questions.some((q) => !this.data.answers[q.id])) {
      wx.showToast({ title: "请答完所有题目", icon: "none" });
      return;
    }
    // 6 题，每题 1-5 分，映射到 0-100。
    const raw = questions.reduce((sum, q) => sum + this.data.answers[q.id], 0);
    const score = Math.round(((raw - questions.length) / (questions.length * 4)) * 100);
    let level = "关注";
    let advice = "你已经在注意变化。把注意力放到今天能练的一小步上，通常比反复刷标题更有用。";
    let color = "#ffb020";
    if (score < 30) {
      level = "平静";
      advice = "你不太容易被标题带着走。可以继续保持，顺便把有用的信息做成自己的笔记或作品。";
      color = "#3ddc97";
    } else if (score >= 70) {
      level = "偏高";
      advice = "这类新闻容易让人停在担忧里。建议先限制刷资讯的时间，并完成一个很小的动手任务。这不是诊断。";
      color = "#ff6b4a";
    }
    this.setData({ done: true, score, level, advice, color });
    loadNews().then((feed) => {
      const top = (feed.items || [])
        .filter((item) => (item.scores || {}).anxiety >= 6)
        .slice(0, 2)
        .map((item) => item.hook_titles[0])
        .join("；");
      if (top) this.setData({ related: top });
    });
  },

  reset() {
    this.setData({ answers: {}, done: false, related: "" });
  },
});
