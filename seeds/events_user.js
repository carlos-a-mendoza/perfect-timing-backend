// import seed data files, arrays of objects
const eventsData = require('../seed-data/eventlist');

exports.seed = function (knex) {
  return knex('events')
    .del()
    .then(() => {
      return knex('events').insert(eventsData);
    });
};