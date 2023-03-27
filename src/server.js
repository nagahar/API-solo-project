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

  app.get("/api/task", async (req, res) => {
    const n = req.query.limit;
    const array = [];
    try {
      const tasks = await taskModel.get();
      for (let i = 0; i < n; i++) {
        array.push(tasks[i]);
      }
      const result = { tasks: array };
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send({});
    }
  });

  app.post("/api/task", async (req, res) => {
    const { body } = req;
    try {
      await taskModel.create(body);
      const result = { id: body.id };
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send({});
    }
  });

  app.patch("/api/task/:id", async (req, res) => {
    const id = req.params.id;
    const { body } = req;
    try {
      await taskModel.update(id, body);
      const result = { id: Number(id) };
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send({});
    }
  });

  app.delete("/api/task/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await taskModel.delete(id);
      const result = { id: Number(id) };
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send({});
    }
  });

  return app;
};

module.exports = { setupServer };
