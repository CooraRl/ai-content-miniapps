/**
 * 数据加载约定（与 data/schema.md 对齐）：
 * 1. 默认读取本模板内的本地示例数据，不需要密钥，也不发起网络请求。
 * 2. 待 CooraRl/daily-ai-news 的 FastAPI 就绪后，把 USE_REMOTE 改为 true，
 *    并在微信公众平台配置 request 合法域名。
 * 3. 推荐接口：GET /news/today ，响应需符合仓库根目录 data/schema.md。
 */
const USE_REMOTE = false;
const API_BASE = ""; // 例如 https://your-api.example.com

function loadNews() {
  if (USE_REMOTE && API_BASE) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${API_BASE}/news/today`,
        method: "GET",
        success(res) {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(new Error("接口返回 " + res.statusCode));
          }
        },
        fail: reject,
      });
    });
  }
  const data = require("../data/sample-news.js");
  return Promise.resolve(data);
}

function overallScore(item) {
  const s = (item && item.scores) || {};
  const hook = Number(s.hook) || 0;
  const anxiety = Number(s.anxiety) || 0;
  const relevance = Number(s.relevance) || 0;
  // 与路线图一致：吸睛 + 焦虑 + 相关，加权后用于排序。
  return hook * 0.4 + anxiety * 0.3 + relevance * 0.3;
}

module.exports = {
  loadNews,
  overallScore,
  USE_REMOTE,
};
