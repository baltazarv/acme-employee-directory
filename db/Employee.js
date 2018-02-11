const conn = require('./conn');
const { Sequelize } = conn;

const Employee = conn.define('employee', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
  },
  nicknames: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    set: function(val) {
      if (typeof val === 'string') {
        const nicknames = val.split(', ').filter(nickname => {
          this.
        });
      }
    }
  }
}, {
  getterMethods: {
    fullName: function() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
}); // Sequelize.ARRAY(Sequelize.TEXT)

Employee.populateDB = function(data) {
  const { firstName, lastName, nicknames } = data;
  return Employee.create({ firstName, lastName, nicknames })
    .then(employees => employees);
};

Employee.findAllNicknames = function() {
  return Employee.findAll()
  .then(employees => {
    let nickCount = employees.reduce((allEmployeeNicks, employeeNicks) => {
      allEmployeeNicks = allEmployeeNicks.concat(employeeNicks.nicknames);
      return allEmployeeNicks;
    }, []);
    return nickCount.length;
  });
};

Employee.generateFromForm = function(data) {
  const { firstName, lastName, nicknames } = data;
  console.log(firstName, lastName, nicknames);
  // Employee.findAll()
  // .then(() => res.redirect('/employees'));
};

module.exports = Employee;

