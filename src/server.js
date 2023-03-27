const path = require("path");
const taskModel = require("./task/task.model");

const setupServer = () => {
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

  app.get("/api/task", async (req, res) => {
    const n = req.query.limit;
    const array = [];
    const tasks = await taskModel.getAll();
    for (let i = 0; i < n; i++) {
      array.push(tasks[i]);
    }
    const result = { tasks: array };
    res.send(result);
  });

  return app;
};

module.exports = { setupServer };
