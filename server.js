const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const db = require('./db');
const routes = require('./routes');

const port = process.env.PORT || 3000;
const app = express();
const { Employee } = db.models;

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });
app.use(express.static(__dirname + '/public'));

db.sync()
  .then(() => db.seed());

app.use((req, res, next) => {
  // res.locals.path = req.url;
  Employee.count()
  .then(count => {
    res.locals.employeeCount = count;
  })
  .then(() => {
    return Employee.findAllNicknames();
  })
  .then(nickCounts => {
    res.locals.employeeNicknames = nickCounts;
    next();
  })
  .catch(next);
});

app.use((req, res, next) => {
  res.locals.path = req.url;
  next();
});

app.use('/', routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).render('error', { error: err });
});

app.listen(port, () => {
  console.log(`Go to http://localhost:${port}`);
});
