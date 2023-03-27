const taskModel = require("./task.model");

module.exports = {
  async index(req, res) {
    const task = await taskModel.getAll();
    res.render("pages/task/index", {
      task,
    });
  },
};
