// 本地示例数据。is_sample 为 true，不对应真实事件。
module.exports = {
  "title": "AI 会不会取代我的职业？",
  "disclaimer": "这是教学演示，不是就业预测。结果只说明「哪些工作步骤更易被辅助」，不能决定任何人的前途。",
  "jobs": [
    {
      "id": "writing",
      "name": "文字 / 运营",
      "base": 7
    },
    {
      "id": "design",
      "name": "设计 / 视觉",
      "base": 6
    },
    {
      "id": "cs",
      "name": "客服 / 支持",
      "base": 7
    },
    {
      "id": "coding",
      "name": "编程 / 开发",
      "base": 6
    },
    {
      "id": "teaching",
      "name": "教学 / 培训",
      "base": 5
    },
    {
      "id": "sales",
      "name": "销售 / 商务",
      "base": 4
    },
    {
      "id": "logistics",
      "name": "物流 / 现场",
      "base": 3
    },
    {
      "id": "care",
      "name": "医疗护理 / 照护",
      "base": 3
    },
    {
      "id": "other",
      "name": "其他",
      "base": 5
    }
  ],
  "questions": [
    {
      "id": "routine",
      "text": "我的日常工作里，重复套模板的部分占比很高。",
      "weight": 1.2
    },
    {
      "id": "judgment",
      "text": "我经常需要面对不确定情况，并承担判断责任。",
      "weight": -1.0
    },
    {
      "id": "people",
      "text": "我的价值很大程度来自面对面沟通或信任关系。",
      "weight": -0.8
    },
    {
      "id": "tools",
      "text": "我已经开始用 AI 处理初稿或检索，再自己把关。",
      "weight": -0.7
    }
  ]
};
