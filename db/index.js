const conn = require('./conn');
const Employee = require('./Employee');

const sync = () => {
  return conn.sync({ force: true });
};

const seed = () => {
  [
    { firstName: 'David', lastName: 'Sakadelis', nicknames: ['dave', 'jefe'] },
    { firstName: 'Chris', lastName: 'Cocking',  nicknames: ['superman'] },
    { firstName: 'Ben', lastName: 'Barrero', nicknames: ['Better Carlin'] },
    { firstName: 'Amir', lastName: 'Diwane', nicknames: [] }
  ].reduce((all, one) => {
    return all.then(() => Employee.populateDB(one));
  }, Promise.resolve());
};

module.exports = {
  sync,
  seed,
  models: {
    Employee
  }
};
