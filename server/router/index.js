const Router = require("koa-router");
const router = new Router();

const chat = require("./chat");

router.use("/chat", chat.routes(), chat.allowedMethods());

module.exports = router;
