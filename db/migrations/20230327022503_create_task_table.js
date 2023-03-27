/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("task", function (table) {
    table.increments("id").primary();
    table.integer("people_id").notNullable();
    table.foreign("people_id").references("id").inTable("people");
    table.string("title", 32).notNullable();
    table.string("description", 64);
    table.datetime("end_date");
    table.datetime("notify_date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("task");
};
