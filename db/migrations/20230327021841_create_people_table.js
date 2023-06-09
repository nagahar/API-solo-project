/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("people", function (table) {
    table.increments("id").primary();
    table.string("last_name", 32).notNullable();
    table.string("first_name", 32).notNullable();
    table.string("email", 64);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("people");
};
