const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_employee_dir_db', {
  logging: false
});

module.exports = conn;
