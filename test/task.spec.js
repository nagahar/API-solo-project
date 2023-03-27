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

  describe("POST /api/task - add task", () => {
    const newId = 9999;

    after(async () => {
      await knex.from(TASK_TABLE).where("id", newId).del().catch(console.error);
      console.log("removed sample task");
    });

    it("should add task", async () => {
      const sampleTask = {
        id: newId,
        people_id: peopleFixture.id,
        title: "test",
        description: "test description",
        end_date: new Date(),
        notify_date: new Date(),
      };
      const res = await request.post("/api/task").send(sampleTask);
      res.should.be.json;
      JSON.parse(res.text).id.should.to.eq(newId);

      const task = await knex(TASK_TABLE).select().where("id", newId).first();
      task.should.to.exist;
      task.id.should.to.eq(newId);
    });
  });

  describe("PATCH /api/task/:id", () => {
    it("should modify task", async () => {
      const res = await request
        .patch("/api/task/" + taskFixture.id)
        .send({ title: "test2" });
      res.should.be.json;
      JSON.parse(res.text).id.should.eq(taskFixture.id);
    });
  });

  describe("DELETE /api/task/:id", () => {
    it("should delete task", async () => {
      const res = await request.delete("/api/task/" + taskFixture.id);
      res.should.be.json;
      JSON.parse(res.text).id.should.eq(taskFixture.id);
    });
  });
});

/* eslint-enable no-unused-vars */
