/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert([
    {
      id: 1,
      last_name: "Tokugawa",
      first_name: "Ieyasu",
      email: "takanori.nagahara.ts@nttdocomo.com",
    },
    {
      id: 2,
      last_name: "Oda",
      first_name: "Nobunaga",
      email: "takanori.nagahara.ts@nttdocomo.com",
    },
    {
      id: 3,
      last_name: "Toyotomi",
      first_name: "hideyoshi",
      email: "takanori.nagahara.ts@nttdocomo.com",
    },
  ]);
};
