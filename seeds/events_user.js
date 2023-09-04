// import seed data files, arrays of objects
const eventsData = require('../seed-data/eventlist');
const usersData = require('../seed-data/users');
const groupData = require('../seed-data/groups')


exports.seed = function (knex) {
  return knex('events')
    .del()
    .then(() => {
      return knex('events').insert(eventsData);
    })
    .then(()=>{
      return knex('users').insert(usersData);
    })
    .then(()=>{
      return knex('userGroups').insert(groupData);
    })

};