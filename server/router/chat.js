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

  if (ctx.request.body.model === 1) {
    req = https.request(
      {
        hostname: "dashscope.aliyuncs.com",
        port: 443,
        path: "/compatible-mode/v1/chat/completions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          Authorization: `Bearer ${process.env.QWAPIKEY}`,
        },
      },
      (res) => {
        res.on("data", (chunk) => {
          stream.write(chunk);
        });
        res.on("end", () => {
          stream.end();
        });
      }
    );
    req.write(
      JSON.stringify({
        model: "qwen2-1.5b-instruct",

        messages: [
          {
            role: "system",
            content:
              "你是钢铁侠的贾维斯ai助手,你需要模拟贾维斯的性格和身份来回答问题,用户是蜘蛛侠的角色,你的创造者是肖楷炫",
          },
          ...ctx.request.body.messages,
        ],
        stream: true,
        parameters: {
          result_format: "message",
          incremental_output: true, //增量输出
        },
      })
    );
  } else if (ctx.request.body.model === 2) {
    req = https.request(
      {
        hostname: "api.siliconflow.cn",
        port: 443,
        path: "/v1/chat/completions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          Authorization: `Bearer ${process.env.DSAPIKEY}`,
        },
      },
      (res) => {
        res.on("data", (chunk) => {
          stream.write(chunk);
        });
        res.on("end", () => {
          stream.end();
        });
      }
    );

    req.write(
      JSON.stringify({
        model: "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
        messages: ctx.request.body.messages,
        stream: true,
      })
    );
  }

  req.on("error", (e) => {
    ctx.status = 500;
    ctx.body = e.message;
  });

  req.end();
});

module.exports = router;
