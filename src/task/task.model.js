const knex = require("../knex");
const TASK_TABLE = "task";

module.exports = {
  TASK_TABLE: TASK_TABLE,

  /**
   * Get task
   * @param {number} limit - The max number of task to return.
   * @return {Promise<Array>} A promise that resolves to an array task
   */
  get(limit = 100) {
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
      .limit(limit);
  },

  /**
   * Create task
   * @param {Object} task - A new task data to add
   * @return {Promise<Array>} A promise that resolves to an array task
   */
  create(task) {
    return knex(TASK_TABLE)
      .insert(task)
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   * Update task
   * @param {number} id - The id to update
   * @param {Object} task - The task to update
   * @return {Promise<Array>} A promise that resolves to an array task
   */
  update(id, task) {
    return knex(TASK_TABLE)
      .where({ id: id })
      .update(task, ["id"])
      .catch(console.log);
  },

  /**
   * Delete task
   * @param {number} id - The id to delete
   * @return {Promise<Array>} A promise that resolves to an array task
   */
  delete(id) {
    return knex(TASK_TABLE)
      .where({ id: id })
      .del()
      .catch((error) => {
        console.log(error);
      });
  },
};
