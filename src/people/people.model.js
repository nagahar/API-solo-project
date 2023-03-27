const knex = require("../knex");
const { validProps, requiredProps } = require("../util/validation");

const validateProps = validProps(["id", "first_name", "last_name", "email"]);

const validateRequired = requiredProps(["last_name", "first_name"]);

const PEOPLE_TABLE = "people";

module.exports = {
  PEOPLE_TABLE,

  /**
   * Get all people
   * @param {number} limit - The max number of people to return.
   * @return {Promise<Array>} A promise that resolves to an array people
   */
  getAll(limit = 100) {
    return knex
      .select({
        id: "id",
        lastName: "last_name",
        firstName: "first_name",
        email: "email",
      })
      .from(PEOPLE_TABLE)
      .limit(limit)
      .then((val) => {
        return val;
      });
  },
};
