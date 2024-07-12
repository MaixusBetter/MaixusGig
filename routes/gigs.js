const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');
const Comment = require('../models/Comment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get all gigs (excluding hidden gigs) and all comments
router.get('/', async (req, res) => {
  try {
    const gigs = await Gig.findAll({ where: { hidden: false } });
    const comments = await Comment.findAll();
    res.render('gigs', { gigs, comments });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  if (!title) {
    errors.push({ text: 'Please add a title' });
  }

  if (!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }

  if (!description) {
    errors.push({ text: 'Please add a description' });
  }

  if (!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      description,
      budget,
      contact_email
    });
  } else {
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    technologies = technologies.toLowerCase().replace(/, /g, ',');

    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => console.log(err));
  }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => console.log(err));
});

// Hide a gig
router.post('/hide/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const gig = await Gig.findByPk(id);
    if (gig) {
      gig.hidden = true;
      await gig.save();
      res.sendStatus(200); // Successfully marked as hidden
    } else {
      res.sendStatus(404); // Gig not found
    }
  } catch (err) {
    console.error('Error hiding gig:', err);
    res.status(500).send('Server Error');
  }
});

// Get a single gig
router.get('/:id', (req, res) => {
  const id = req.params.id;

  Gig.findOne({
    where: { id }
  })
    .then(gig => {
      if (gig) {
        res.render('gig', { gig });
      } else {
        res.status(404).send('Gig not found');
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;

