const Router = require("@koa/router");
const knex = require("knex");
const router = new Router();

const lrProperty = require("./models/lrProperty.js");

router
  .param("searchParam", async (searchParam, ctx, next) => {
    ctx.lrProperties = await new lrProperty()
      .query((qb) => {
        qb.where("id", "=", searchParam)
          .orWhere(knex.raw("outcode || incode"), "=", searchParam.replace(/\s/g, ""))
          .orWhere("street", "=", searchParam);
      })
      .fetchAll({ withRelated: ["lrTransactions"] });

    if (!ctx.lrProperties) {
      ctx.status = 404;
      return (ctx.body = { error: true, msg: "No LRProperty not found" });
    }

    return next();
  })
  .get("/lrProperties/:searchParam", async (ctx) => {
    return (ctx.body = { success: true, lrProperties: ctx.lrProperties.toJSON() });
  });

router
  .param("lrPropertyId", async (id, ctx, next) => {
    ctx.lrProperty = await new lrProperty({ id: id }).fetch({ withRelated: ["lrTransactions"], require: false });

    if (!ctx.lrProperty) {
      ctx.status = 404;
      return (ctx.body = { error: true, msg: "LRProperty not found" });
    }

    return next();
  })
  .get("/", async (ctx, next) => {
    return (ctx.body = "I'm alive!");
  })
  .get("/lrProperty/:lrPropertyId", async (ctx, next) => {
    return (ctx.body = { success: true, lrProperty: ctx.lrProperty.toJSON() });
  });

module.exports = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
};
