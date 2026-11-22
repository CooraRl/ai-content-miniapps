const quiz = require("../../data/quiz.js");
const { loadNews } = require("../../utils/api.js");

Page({
  data: { quiz, jobId: "", answers: {}, done: false, score: 0, level: "", advice: "", jobName: "", hook: "" },

  pickJob(e) {
    this.setData({ jobId: e.currentTarget.dataset.id });
  },

  choose(e) {
    const { qid, value } = e.currentTarget.dataset;
    this.setData({ [`answers.${qid}`]: value });
  },

  submit() {
    const job = quiz.jobs.find((item) => item.id === this.data.jobId);
    if (!job) {
      wx.showToast({ title: "请先选择方向", icon: "none" });
      return;
    }
    if (quiz.questions.some((q) => !this.data.answers[q.id])) {
      wx.showToast({ title: "请答完所有题目", icon: "none" });
      return;
    }
    // 基础分来自岗位类型，再按「重复性 / 判断 / 人际 / 是否已会用工具」微调，限制在 1-10。
    let score = job.base;
    quiz.questions.forEach((q) => {
      const v = this.data.answers[q.id];
      score += ((v - 2) / 2) * q.weight * 2;
    });
    score = Math.max(1, Math.min(10, Math.round(score * 10) / 10));
    let level = "中等辅助风险";
    let advice = "有一部分步骤容易被工具加速。更稳妥的做法是：把重复劳动交给 AI，自己留下判断和责任。";
    if (score < 4.5) {
      level = "较低辅助风险";
      advice = "这个方向更依赖现场、信任或复杂判断。AI 更可能当助手，而不是直接接手你的岗位。";
    } else if (score >= 7) {
      level = "较高辅助风险";
      advice = "重复性文字或流程更容易被辅助。这不等于「职业消失」，但说明你值得尽早练习用 AI 做初稿，并强化核对与沟通。";
    }
    this.setData({ done: true, score, level, advice, jobName: job.name });
    loadNews().then((feed) => {
      const hit = (feed.items || []).find((item) => (item.scores || {}).anxiety >= 7);
      if (hit) this.setData({ hook: hit.hook_titles[0] });
    });
  },

  reset() {
    this.setData({ done: false, answers: {}, hook: "" });
  },
});
