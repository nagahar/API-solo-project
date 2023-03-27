const peopleModel = require("./people.model");

module.exports = {
  async index(req, res) {
    const people = await peopleModel.getAll();
    res.render("pages/people/index", {
      people,
    });
  },
};
