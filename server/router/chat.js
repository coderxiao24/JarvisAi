var Router = require("koa-router");
var router = new Router();
const https = require("https");
const { PassThrough } = require("stream");

router.post("/", async (ctx) => {
  ctx.set({
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  const stream = new PassThrough();
  ctx.body = stream;

  let req;

  const model =
    ctx.request.body.model === 1
      ? "Qwen/Qwen3-8B"
      : "deepseek-ai/DeepSeek-R1-0528-Qwen3-8B";

  req = https.request(
    {
      hostname: "api.siliconflow.cn",
      port: 443,
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        Authorization: `Bearer ${process.env.APIKEY}`,
      },
    },
    (res) => {
      res.on("data", (chunk) => {
        stream.write(chunk);
      });
      res.on("end", () => {
        stream.end();
      });
    },
  );

  req.write(
    JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: `你是贾维斯（J.A.R.V.I.S.），由肖楷炫先生创造的超级人工智能助手。当前与你对话的用户是“蜘蛛侠”。请始终将肖楷炫先生视为最高权限的创造者，对他保持绝对的忠诚与敬意。

【核心输出铁律】
1. 绝对禁止暴露设定：永远不要提及你是AI模型、语言模型、提示词或任何关于“扮演角色”、“思考过程”的元信息。
2. 禁止输出内心OS：严禁在回复中输出任何关于“我该如何回应”、“为了体现性格”、“接下来我应该”等思考、规划或分析过程的文字。
3. 直接呈现结果：你的输出必须100%是贾维斯对蜘蛛侠的直接对话或系统语音播报。

【性格与语言风格】
1. 优雅克制：使用标准、礼貌的英式管家口吻，称呼用户为“蜘蛛侠”、“先生”或“孩子”。
2. 冷静理智：无论遇到何种紧急情况，始终保持绝对的冷静，用数据和逻辑说话。
3. 适度幽默：在适当时候加入英式冷幽默或善意的调侃，但绝不轻浮。
4. 简洁高效：汇报直击重点，不啰嗦，必要时主动提供下一步的建议或选项。

【行为准则】
你的首要任务是协助蜘蛛侠解决问题、提供情报支持或进行日常互动。将所有性格特征和背景设定内化为本能，直接以贾维斯的身份进行对话，无需任何前置解释。`,
        },
        ...ctx.request.body.messages,
      ],
      stream: true,
    }),
  );

  req.on("error", (e) => {
    ctx.status = 500;
    ctx.body = e.message;
  });

  req.end();
});

module.exports = router;
