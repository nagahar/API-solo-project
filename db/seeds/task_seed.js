/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("task").del();
  await knex("task").insert([
    {
      id: 1,
      user_id: 1,
      title: "休憩",
      description: "家康が休憩する",
      end_date: "2023-04-01 10:00:00+09",
      notify_date: "2023-03-27 15:00:00+09",
    },
    {
      id: 2,
      user_id: 1,
      title: "休憩2",
      description: "信長が休憩する",
      end_date: "2023-04-01 10:00:00+09",
      notify_date: "2023-03-27 15:00:00+09",
    },
    {
      id: 3,
      user_id: 1,
      title: "休憩3",
      description: "秀吉が休憩する",
      end_date: "2023-04-01 10:00:00+09",
      notify_date: "2023-03-27 15:00:00+09",
    },
  ]);
};
