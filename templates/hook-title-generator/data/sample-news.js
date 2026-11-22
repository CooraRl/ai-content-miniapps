// 本地示例数据。is_sample 为 true，不对应真实事件。
module.exports = {
  "generated_at": "2026-11-22T12:00:00+08:00",
  "timezone": "Asia/Shanghai",
  "schema_version": "1.0",
  "source": "local-sample",
  "note": "以下全部为示例数据，用于演示小程序界面和数据格式，不对应任何真实新闻或真实机构事件。",
  "items": [
    {
      "id": "sample-20261122-001",
      "title": "【示例】某办公软件宣布将在基础套餐中内置写作助手，并表示暂时不涨价",
      "link": "https://example.com/sample/20261122-001",
      "source": "示例来源 A",
      "published": "2026-11-22 09:30",
      "published_iso": "2026-11-22T09:30:00+08:00",
      "summary": "这是一条虚构示例：一款常用办公软件计划把写作助手放进基础套餐。适合练习展示「和普通人日常工作相关」的新闻卡片。",
      "category": "产品应用",
      "is_sample": true,
      "scores": {
        "hook": 8.2,
        "anxiety": 6.4,
        "relevance": 9.1
      },
      "score_reasons": {
        "hook": "和工作方式直接相关，标题里有具体变化。",
        "anxiety": "可能让人担心自己的文字工作被分担，但没有恐吓式表述。",
        "relevance": "覆盖日常办公，和大多数上班族相关。"
      },
      "hook_titles": [
        "你每天用的办公软件，开始替你写了",
        "不是裁员通知，但周报可能先被接管"
      ],
      "hooks": [
        {
          "type": "anxiety",
          "text": "你每天用的办公软件，开始替你写了"
        },
        {
          "type": "twist",
          "text": "不是裁员通知，但周报可能先被接管"
        }
      ]
    },
    {
      "id": "sample-20261122-002",
      "title": "【示例】一家培训机构把「AI 课」改成「和 AI 一起办公」体验营",
      "link": "https://example.com/sample/20261122-002",
      "source": "示例来源 B",
      "published": "2026-11-22 11:05",
      "published_iso": "2026-11-22T11:05:00+08:00",
      "summary": "这是一条虚构示例：课程名称从「学 AI」改成「带 AI 一起完成真实任务」。适合练习做教学向、反转标题钩子。",
      "category": "工具教程",
      "is_sample": true,
      "scores": {
        "hook": 7.4,
        "anxiety": 4.8,
        "relevance": 7.6
      },
      "score_reasons": {
        "hook": "课程改名带一点反差，但信息量中等。",
        "anxiety": "更偏学习方法，焦虑感不强。",
        "relevance": "对想转行或补技能的人较有用。"
      },
      "hook_titles": [
        "别再只学菜单了，这次要带着 AI 把活干完",
        "同一门课，换了个名字就没那么吓人"
      ],
      "hooks": [
        {
          "type": "anxiety",
          "text": "别再只学菜单了，这次要带着 AI 把活干完"
        },
        {
          "type": "twist",
          "text": "同一门课，换了个名字就没那么吓人"
        }
      ]
    },
    {
      "id": "sample-20261122-003",
      "title": "【示例】研究团队发布一份面向普通人的 AI 使用注意事项清单",
      "link": "https://example.com/sample/20261122-003",
      "source": "示例来源 C",
      "published": "2026-11-22 14:20",
      "published_iso": "2026-11-22T14:20:00+08:00",
      "summary": "这是一条虚构示例：一份面向非专业读者的注意事项，强调先核对再使用。适合练习「实用清单」类内容卡片。",
      "category": "行业研究",
      "is_sample": true,
      "scores": {
        "hook": 6.8,
        "anxiety": 5.2,
        "relevance": 8.0
      },
      "score_reasons": {
        "hook": "实用，但标题偏平稳。",
        "anxiety": "涉及误用风险，强度中等。",
        "relevance": "任何人开始用 AI 时都用得上。"
      },
      "hook_titles": [
        "AI 给的答案，有一条你可能忘了核对",
        "不是不能用，是不能直接复制就交"
      ],
      "hooks": [
        {
          "type": "anxiety",
          "text": "AI 给的答案，有一条你可能忘了核对"
        },
        {
          "type": "twist",
          "text": "不是不能用，是不能直接复制就交"
        }
      ]
    },
    {
      "id": "sample-20261121-001",
      "title": "【示例】某社区开始试验「先问助手、再找人工」的办事引导",
      "link": "https://example.com/sample/20261121-001",
      "source": "示例来源 A",
      "published": "2026-11-21 16:40",
      "published_iso": "2026-11-21T16:40:00+08:00",
      "summary": "这是一条虚构示例：办事大厅增加引导助手，人工窗口仍然保留。适合练习「公共服务变化」带来的轻度焦虑选题。",
      "category": "产品应用",
      "is_sample": true,
      "scores": {
        "hook": 7.9,
        "anxiety": 7.1,
        "relevance": 8.4
      },
      "score_reasons": {
        "hook": "和办实事相关，容易引起讨论。",
        "anxiety": "人们会担心自己被推去和机器对话。",
        "relevance": "公共服务和很多居民有关。"
      },
      "hook_titles": [
        "以后办事，可能要先过一遍助手这一关",
        "人工窗口还在，只是不再是你的第一站"
      ],
      "hooks": [
        {
          "type": "anxiety",
          "text": "以后办事，可能要先过一遍助手这一关"
        },
        {
          "type": "twist",
          "text": "人工窗口还在，只是不再是你的第一站"
        }
      ]
    },
    {
      "id": "sample-20261121-002",
      "title": "【示例】开源社区整理了一份提示词写作检查清单，并欢迎补充",
      "link": "https://example.com/sample/20261121-002",
      "source": "示例来源 D",
      "published": "2026-11-21 10:15",
      "published_iso": "2026-11-21T10:15:00+08:00",
      "summary": "这是一条虚构示例：一份开源的提示词检查清单，强调角色、背景、示例和输出格式。适合做教程向内容。",
      "category": "工具教程",
      "is_sample": true,
      "scores": {
        "hook": 6.2,
        "anxiety": 3.1,
        "relevance": 7.3
      },
      "score_reasons": {
        "hook": "对学习者有用，但大众传播力一般。",
        "anxiety": "几乎不制造焦虑。",
        "relevance": "正在学提示词的人会用到。"
      },
      "hook_titles": [
        "提示词写不好，往往是少了这四步",
        "别堆形容词了，先把任务说清楚"
      ],
      "hooks": [
        {
          "type": "anxiety",
          "text": "提示词写不好，往往是少了这四步"
        },
        {
          "type": "twist",
          "text": "别堆形容词了，先把任务说清楚"
        }
      ]
    },
    {
      "id": "sample-20261121-003",
      "title": "【示例】有内容平台宣布给创作者提供 AI 草稿箱，并默认关闭自动发布",
      "link": "https://example.com/sample/20261121-003",
      "source": "示例来源 B",
      "published": "2026-11-21 19:00",
      "published_iso": "2026-11-21T19:00:00+08:00",
      "summary": "这是一条虚构示例：平台提供草稿生成，但默认不自动发出。适合强调「人工确认再发布」这一产品原则。",
      "category": "产品应用",
      "is_sample": true,
      "scores": {
        "hook": 8.0,
        "anxiety": 5.6,
        "relevance": 8.7
      },
      "score_reasons": {
        "hook": "创作者会立刻关心自己的内容会不会被自动发出。",
        "anxiety": "有失控感，但默认关闭自动发布能缓解。",
        "relevance": "对做短视频和社交账号的人很相关。"
      },
      "hook_titles": [
        "AI 可以帮你写，但不该替你按发送",
        "草稿箱来了，发布键还是留在你手里"
      ],
      "hooks": [
        {
          "type": "anxiety",
          "text": "AI 可以帮你写，但不该替你按发送"
        },
        {
          "type": "twist",
          "text": "草稿箱来了，发布键还是留在你手里"
        }
      ]
    },
    {
      "id": "sample-20261120-001",
      "title": "【示例】一份公开报告讨论哪些重复性文字工作可能被辅助工具改写",
      "link": "https://example.com/sample/20261120-001",
      "source": "示例来源 C",
      "published": "2026-11-20 08:50",
      "published_iso": "2026-11-20T08:50:00+08:00",
      "summary": "这是一条虚构示例：报告把工作拆成「可辅助」和「仍需判断」两类。适合职业测试和选题榜演示，结论保持克制。",
      "category": "行业研究",
      "is_sample": true,
      "scores": {
        "hook": 8.8,
        "anxiety": 8.4,
        "relevance": 9.0
      },
      "score_reasons": {
        "hook": "直接碰到「我会不会被取代」这个高频问题。",
        "anxiety": "职业变化是常见焦虑来源，示例里仍避免夸大。",
        "relevance": "几乎每个做文字工作的人都会在意。"
      },
      "hook_titles": [
        "先被改写的，可能不是岗位，是那些重复的段落",
        "不是所有工作都会消失，但有些步骤会先变轻"
      ],
      "hooks": [
        {
          "type": "anxiety",
          "text": "先被改写的，可能不是岗位，是那些重复的段落"
        },
        {
          "type": "twist",
          "text": "不是所有工作都会消失，但有些步骤会先变轻"
        }
      ]
    },
    {
      "id": "sample-20261120-002",
      "title": "【示例】某设计工具增加「先出草图、再由人修改」的工作流模板",
      "link": "https://example.com/sample/20261120-002",
      "source": "示例来源 D",
      "published": "2026-11-20 15:25",
      "published_iso": "2026-11-20T15:25:00+08:00",
      "summary": "这是一条虚构示例：设计流程变成「机器出草图、人做判断和收尾」。适合封面预览和创作者工作流内容。",
      "category": "产品应用",
      "is_sample": true,
      "scores": {
        "hook": 7.6,
        "anxiety": 6.0,
        "relevance": 7.8
      },
      "score_reasons": {
        "hook": "对设计与内容创作者有画面感。",
        "anxiety": "会触及「初稿还要不要自己画」的担心。",
        "relevance": "对做图、做封面的人较相关。"
      },
      "hook_titles": [
        "草图可以很快，判断还得你来",
        "设计工具开始抢的是第一笔，不是最后一笔"
      ],
      "hooks": [
        {
          "type": "anxiety",
          "text": "草图可以很快，判断还得你来"
        },
        {
          "type": "twist",
          "text": "设计工具开始抢的是第一笔，不是最后一笔"
        }
      ]
    }
  ]
};
