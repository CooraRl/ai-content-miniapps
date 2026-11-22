const tools = require("../../data/tools.js");

Page({
  data: { tools },

  copy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success() {
        wx.showToast({ title: "链接已复制", icon: "none" });
      },
    });
  },
});
