import { Claude, OpenAI } from "@lobehub/icons";

// Local demo data; replace this collection with an API response when needed.
export const models = [
  {
    id: "gpt-demo",
    name: "GPT · 通用助手",
    provider: "OpenAI",
    Icon: OpenAI,
    description: "从日常问答到创意写作，让想法更快变成清晰的表达。",
    tags: ["对话", "写作", "代码"],
    overview: "这是一个通用对话模型的展示案例。你可以在这里了解模型定位、浏览应用场景，再前往提供商官网探索更多。",
    scenarios: ["整理笔记，提炼长文中的关键观点", "起草文案，为创意提供不同的表达方式", "解释代码，辅助完成日常开发任务"],
    website: "https://openai.com/",
  },
  {
    id: "claude-demo",
    name: "Claude · 思考伙伴",
    provider: "Anthropic",
    Icon: Claude,
    description: "围绕文档、分析与代码展开深入对话，梳理复杂的问题。",
    tags: ["分析", "文档", "代码"],
    overview: "这是一个分析与协作模型的展示案例。通过统一的详情结构展示不同模型，便于后续接入你自己的模型目录。",
    scenarios: ["阅读文档，梳理结构与论证思路", "拆解问题，比较不同解决方案", "讨论代码设计，完善实现思路"],
    website: "https://www.anthropic.com/",
  },
];
