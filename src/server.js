const setupExpressServer = () => {
  /* return configured express app */
  const express = require("express");
  const app = express();
  const qs = require("qs");

  app.get("/hello", (req, res) => {
    res.send("world");
  });

  app.get("/hellojson", (req, res) => {
    res.send({ hello: "world" });
  });

  app.get("/greet", (req, res) => {
    res.send(`Hello ${req.query.name}!`);
  });

  //app.get("/:a/plus/:b", (req, res) => {
  //  res.json({ result: a + b });
  //});
  return app;
};

module.exports = { setupExpressServer };
