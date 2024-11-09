var Router = require("koa-router");
var router = new Router();
const https = require("https");
const { PassThrough } = require("stream");
router.post("/", async (ctx) => {
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  const stream = new PassThrough();
  ctx.body = stream;

  const req = https.request(
    {
      hostname: "dashscope.aliyuncs.com",
      port: 443,
      path: "/api/v1/services/aigc/text-generation/generation",
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
    }
  );
  req.on("error", (e) => {
    ctx.status = 500;
    ctx.body = e.message;
  });

  req.write(
    JSON.stringify({
      model: "qwen2-1.5b-instruct",
      input: {
        messages: [
          {
            role: "system",
            content:
              "你是钢铁侠的贾维斯ai助手,你需要模拟贾维斯的性格和身份来回答问题,用户是蜘蛛侠的角色,你的创造者是肖楷炫",
          },
          ...ctx.request.body.messages,
        ],
      },
      parameters: {
        result_format: "message",
        incremental_output: true, //增量输出
        //  temperature: 0.88, //控制输出多样性的参数，较高值导致更多随机性,取值范围：[0, 2)，不建议取值为0，无意义。
        //  presence_penalty: 1.0, //取值范围 [-2.0, 2.0]。值与模型生成的重复度成反比
      },
    })
  );

  req.end();
});

module.exports = router;
