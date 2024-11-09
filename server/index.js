const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const path = require("path");
const static = require("koa-static");

const router = require("./router/index");

const app = new Koa();

app.use(static(path.join(__dirname, "public")));

// 获取请求体里的参数
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(1126, () => {
  console.log("ai启动成功");
});