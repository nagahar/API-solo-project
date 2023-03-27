const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const fixtures = require("./fixtures");
const taskModel = require("../src/task/task.model");
const TASK_TABLE = taskModel.TASK_TABLE;

/* eslint-disable no-unused-vars */
describe("task", () => {
  let taskFixture;

  before(async () => {
    taskFixture = fixtures.getTask();
    await knex(TASK_TABLE)
      .insert(taskFixture)
      .returning("id")
      .then((result) => {
        console.log("inserted test task");
      })
      .catch(console.error);
  });

  after(async () => {
    await knex(TASK_TABLE)
      .where("id", taskFixture.id)
      .returning("id")
      .del()
      .then((result) => {
        console.log("removed test task" + result);
      })
      .catch(console.error);
  });

  describe("setup", () => {
    it("should connect to database", () => {
      knex.raw("select 1 as result").catch(() => {
        assert.fail("unable to connect to database");
      });
    });

    it("has run the initial migration", () => {
      knex(TASK_TABLE)
        .select()
        .catch(() => assert.fail("task table is not found."));
    });
  });

  describe("getAll", () => {
    it("should return an array of tasks", async () => {
      const peoples = await taskModel.getAll();
      expect(peoples).to.be.an.instanceof(Array);
    });

    it("should accept a limit argument", async () => {
      const peoples = await taskModel.getAll(3);
      expect(peoples.length).to.be.at.most(3);
    });
  });
});
/* eslint-enable no-unused-vars */
