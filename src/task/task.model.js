const knex = require("../knex");
// const { validProps, requiredProps } = require("../util/validation");

// const validateProps = validProps([
//   "id",
//   "title",
//   "description",
//   "end_date",
//   "notify_date",
// ]);

// const validateRequired = requiredProps(["title"]);

const TASK_TABLE = "task";

module.exports = {
  TASK_TABLE: TASK_TABLE,

  /**
   * Get task people
   * @param {number} limit - The max number of task to return.
   * @return {Promise<Array>} A promise that resolves to an array task
   */
  getAll(limit = 100) {
    return knex
      .select({
        id: "id",
        peopleId: "people_id",
        title: "title",
        description: "description",
        endDate: "end_date",
        notifyDate: "notify_date",
      })
      .from(TASK_TABLE)
      .limit(limit)
      .then((val) => {
        return val;
      });
  },
};
