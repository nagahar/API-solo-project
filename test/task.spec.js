const chai = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const fixtures = require("./fixtures");
const taskModel = require("../src/task/task.model");
const peopleModel = require("../src/people/people.model");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();

const TASK_TABLE = taskModel.TASK_TABLE;
const PEOPLE_TABLE = peopleModel.PEOPLE_TABLE;

/* eslint-disable no-unused-vars */
const server = setupServer();
describe("task", () => {
  let request;
  let taskFixture;
  let peopleFixture;

  beforeEach(() => {
    request = chai.request(server);
  });

  before(async () => {
    peopleFixture = fixtures.getPeople();
    await knex(PEOPLE_TABLE)
      .insert(peopleFixture)
      .returning("id")
      .then((result) => {
        console.log("inserted test people");
      })
      .catch(console.error);

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

    await knex(PEOPLE_TABLE)
      .where("id", peopleFixture.id)
      .returning("id")
      .del()
      .then((result) => {
        console.log("removed test people" + result);
      })
      .catch(console.error);
  });

  describe("setup", () => {
    it("should connect to database", () => {
      knex.raw("select 1 as result").catch(() => {
        chai.fail("unable to connect to database");
      });
    });

    it("has run the initial migration", () => {
      knex(TASK_TABLE)
        .select()
        .catch(() => chai.fail("task table is not found."));
    });
  });

  describe("GET /api/task - returning n", () => {
    it("should return the JSON ", async () => {
      const res = await request.get("/api/task").query({ limit: 2 });
      res.should.be.json;
      JSON.parse(res.text).should.have.property("tasks").with.lengthOf(2);
    });
  });
});

/* eslint-enable no-unused-vars */
