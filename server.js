const express = require('express');
const hbs = require('hbs');

var app = express();

var PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url} `);
  //res.send(`{now}: {$req.method} {$req.url}`);
  next();
});


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get('/', (req, res) => {
  res.render('Home.hbs', {
    title: 'About Page',
    welcomeMsg: 'Welcome to Node Application'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
