const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const fixtures = require("./fixtures");
const peopleModel = require("../src/people/people.model");
const PEOPLE_TABLE = peopleModel.PEOPLE_TABLE;

/* eslint-disable no-unused-vars */
describe("people", () => {
  let peopleFixture;

  before(async () => {
    peopleFixture = fixtures.getPeople();
    await knex(PEOPLE_TABLE)
      .insert(peopleFixture)
      .returning("id")
      .then((result) => {
        console.log("inserted test people");
      })
      .catch(console.error);
  });

  after(async () => {
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
        assert.fail("unable to connect to database");
      });
    });

    it("has run the initial migration", () => {
      knex(PEOPLE_TABLE)
        .select()
        .catch(() => assert.fail("people table is not found."));
    });
  });

  describe("getAll", () => {
    it("should return an array of peoples", async () => {
      const peoples = await peopleModel.getAll();
      expect(peoples).to.be.an.instanceof(Array);
    });

    it("should accept a limit argument", async () => {
      const peoples = await peopleModel.getAll(3);
      expect(peoples.length).to.be.at.most(3);
    });
  });
});
/* eslint-enable no-unused-vars */
