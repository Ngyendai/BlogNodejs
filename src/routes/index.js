const newRouter = require("./news");
const courseRouter = require("./courses");
const siteRouter = require("./site");
const meRouter = require("./me");
function route(app) {
  app.use("/me", meRouter);
  app.use("/news", newRouter);
  app.use("/khoa-hoc", courseRouter);
  app.use("/", siteRouter);
}
module.exports = route;
