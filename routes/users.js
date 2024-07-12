const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Render signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    await User.create({ email, password, loggedIn: true });
    res.render('index', { userEmail: email, layout: 'landing' }); // Pass userEmail to template
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Server Error');
  }
});

// Render login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, password } });

    if (user) {
      await User.update({ loggedIn: true }, { where: { email } });
      res.render('index', { userEmail: email, layout: 'landing' }); // Pass userEmail to template
    } else {
      res.send('Invalid email or password');
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Server Error');
  }
});

// Handle logout
router.post('/logout', async (req, res) => {
  const { email } = req.body;

  try {
    await User.update({ loggedIn: false }, { where: { email } });
    res.render('index', { layout: 'landing' }); // Pass no userEmail to template
  } catch (err) {
    console.error('Error logging out:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
