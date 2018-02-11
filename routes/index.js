const app = require('express').Router();
const db = require('../db');
const { Employee } = db.models;

module.exports = app;

app.get('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
  .then( employee => res.render('employee', { title: 'Employee', employee }))
  .catch(next);
});

app.get('/employees', (req, res, next) => {
  Employee.findAll()
  .then( employees => res.render('employees', { title: 'Employees', employees }))
  .catch(next);
});

app.put('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
  // .then(employee => res.redirect('/employees'));
  .then(employee => {
    Object.assign(employee, req.body);
    return employee.save();
  })
  .then(employee => {
    res.redirect('/employees');
  });
});

app.post('/employees', (req, res, next) => {
  Employee.create(req.body)
  .then(employee => {
    next();
  });
});

app.delete('/employees/:id', (req, res, next) => {
  Employee.findById(req.params.id)
  // .then(employee => res.redirect('/employees'));
  .then(employee => {
    Object.assign(employee, req.body);
    return employee.destroy();
  })
  .then(employee => {
    res.redirect('/employees');
  });
});

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});
