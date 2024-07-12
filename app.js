const express = require('express');
const { create } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const db = require('./config/database');
const moment = require('moment');

// Authenticate database
db.authenticate()
  .then(() => console.log('Database Connected...'))
  .catch(err => console.log('Error: ' + err));

const app = express();

// Create an instance of Handlebars with runtime options
const hbs = create({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  helpers: {
    formatDate: (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a')
  }
});

// Set Handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));
app.use('/gigs', require('./routes/gigs'));
app.use('/comments', require('./routes/comments')); // Include comments route
app.use('/users', require('./routes/users')); // Include user routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
