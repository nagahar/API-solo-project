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
    try {
      const tasks = await taskModel.get(n);
      const result = { tasks: tasks };
      res.send(result);
    } catch (e) {
      console.log(e);
      res.send({});
    }
  });

  app.post("/api/task", async (req, res) => {
    const { body } = req;
    const result = {};
    try {
      if (Object.keys(body).length !== 0) {
        await taskModel.create(body);
        result.id = body.id;
      }
    } catch (e) {
      console.log(e);
    }
    res.send(result);
  });

  app.patch("/api/task/:id", async (req, res) => {
    const id = req.params.id;
    const { body } = req;
    const result = {};
    try {
      if (Object.keys(body).length !== 0) {
        await taskModel.update(id, body);
        result.id = Number(id);
      }
    } catch (e) {
      console.log(e);
    }
    res.send(result);
  });

  app.delete("/api/task/:id", async (req, res) => {
    const id = req.params.id;
    const result = {};
    try {
      await taskModel.delete(id);
      result.id = Number(id);
    } catch (e) {
      console.log(e);
    }
    res.send(result);
  });

  return app;
};

module.exports = { setupServer };
