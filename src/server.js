const path = require("path");
const peopleController = require("./people/people.controller");
const taskController = require("./task/task.controller");

const setupExpressServer = () => {
  /* return configured express app */
  const express = require("express");
  const app = express();

  /*
  This adds JSON parsing middleware for incoming request
  body with a Content-Type header of 'application/json'.
  You don't need to worry about JSON.parse or JSON.stringify
  when this middleware is used.
*/
  app.use(express.json());

  // For parsing form data (application/x-www-form-urlencoded)
  app.use(express.urlencoded({ extended: true }));

  // This configures templates for the frontend of the app.
  app.set("views", `${__dirname}/templates`);
  app.set("view engine", "ejs");

  /*
  This allows us to serve static files (html, css, etc.) from
  the public directory.
*/
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/people", peopleController.index);

  app.get("/task", taskController.index);

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
