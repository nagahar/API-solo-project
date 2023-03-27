const PEOPLE_ID = 91344;

module.exports = {
  getPeople() {
    return {
      id: PEOPLE_ID,
      first_name: "Jean-Luc",
      last_name: "Picard",
      email: "takanori.nagahara.ts@nttdocomo.com",
    };
  },
  getTask() {
    return {
      id: 11344,
      people_id: PEOPLE_ID,
      title: "dinner",
      description: "my birthday",
      end_date: "2023-03-27 15:00:00+09",
      notify_date: "2023-03-27 18:00:00+09",
    };
  },
};
